import * as fs from "fs";
import { AppDataSource } from "../database/data-source";
import { validate } from "class-validator";
import { Repo } from "../repos/repo.entity";
import { Lang } from "../langs/lang.entity";
import { Status } from "../status/status.entity";


(async () => {
    // initializing data source
    await AppDataSource.initialize();

    //status
    const statusRead = await JSON.parse(
        fs.readFileSync("./data/status.json", { encoding: "utf-8" })
    );

    statusRead.map(async (status: any) => {
        try {
            const searchResult = await Status.find({
                where: {
                    label: status.label
                }
            });

            if (searchResult.length === 0) {
                const stat = new Status();
                stat.label = status.label;

                const error = await validate(stat);
                if (error.length > 0) {
                    console.error(error);
                } else {
                    await stat.save();
                    console.log(`Status ${status.label} created`);
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    // langs
    const langsRead = await JSON.parse(
        fs.readFileSync("./data/langs.json", { encoding: "utf-8" })
    );

    langsRead.map(async (lang: any) => {
        try {
            const searchResult = await Lang.find({
                where: {
                    label: lang.label
                }
            });

            if (searchResult.length === 0) {
                const lng = new Lang();
                lng.label = lang.label;

                const error = await validate(lng);
                if (error.length > 0) {
                    console.error(error);
                } else {
                    lng.save();
                    console.log(`Language ${lang.label} created`);
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    // repos
    const reposRead = await JSON.parse(
        fs.readFileSync("./data/repo.json", { encoding: "utf-8" })
    );

    reposRead.map(async (repo: any) => {
        try {
            const searchResult = await Repo.find({
                where: {
                    id: repo.id
                }
            });

            if (searchResult.length === 0) {
                const rep = new Repo();
                rep.id = repo.id;
                rep.name = repo.name;
                rep.url = repo.url;

                // status
                const status = await Status.findOneOrFail({
                    where: {
                        id: repo.isPrivate
                    }
                });
                rep.status = status;

                // add langs
                const langIds: number[] = repo.langs;
                const langs = await Lang.findByIds(langIds);
                rep.langs = langs;

                await rep.save();
                console.log(`Repo ${repo.id} created`);
            }
        } catch (error) {
            console.error(error);
        }
    });

})();