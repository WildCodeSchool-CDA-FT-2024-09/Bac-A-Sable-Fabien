import { AppDataSource } from "../database/data-source";
import { Repo } from "../repo/repo.entity";
import repos from "../../data/repo.json";
import lang_by_repos from "../../data/lang_by_repo.json";
import { Lang } from "../lang/lang.entity";
import langs from "../../data/langs.json";
import { Status } from "../status/status.entity";
import status from "../../data/status.json";

(async () => {
  // initializing data source
  await AppDataSource.initialize();

  console.log("Starting Seeding...");

  const queryRunner = AppDataSource.createQueryRunner();

  // big cleanup
  try {
    await queryRunner.startTransaction();

    await queryRunner.query("DELETE FROM repo_langs_lang CASCADE");
    await queryRunner.query("DELETE FROM lang CASCADE");
    await queryRunner.query("DELETE FROM repo CASCADE");
    await queryRunner.query("DELETE FROM status CASCADE");
    console.log("Delete tables DONE");

    await queryRunner.query(`ALTER SEQUENCE lang_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE status_id_seq RESTART WITH 1;`);
    await queryRunner.query(`ALTER SEQUENCE comment_id_seq RESTART WITH 1;`);
    console.log("Alter sequence DONE");

    await queryRunner.commitTransaction();

    await queryRunner.startTransaction();

    // langs
    const seedLangs = await Promise.all(
      langs.map(async (el) => {
        const lng = new Lang();
        lng.label = el.label;
        return await lng.save();
      }),
    );
    console.log("Langs seeded");

    // status
    const seedStatus = await Promise.all(
      status.map(async (el) => {
        const stat = new Status();
        stat.label = el.label;
        return await stat.save();
      }),
    );
    console.log("Statuses seeded");

    // repos
    await Promise.all(
      repos.map(async (el) => {
        const repo = new Repo();
        repo.id = el.id;
        repo.name = el.name;
        repo.url = el.url;

        // status
        const status = seedStatus.find(
          (st) => st.id === el.isPrivate,
        ) as Status;
        repo.status = status;

        // add langs
        const repoLangs = seedLangs.filter((lg) => {
          const repLangs = lang_by_repos.filter(
            (lgbyrepo) => lgbyrepo.repo_id === el.id,
          );
          const langLabel = langs.filter((ll) =>
            repLangs.some((rl) => rl.lang_id === ll.id),
          );
          return langLabel.some((lgLabel) => lgLabel.label === lg.label);
        });
        repo.langs = repoLangs;

        return await repo.save();
      }),
    );
    console.log("Repos seeded");

    await queryRunner.commitTransaction();
  } catch (error) {
    console.error(error);
    await queryRunner.rollbackTransaction();
  } finally {
    console.log("Seeding Done.");
    await AppDataSource.destroy();
    return;
  }
})();
