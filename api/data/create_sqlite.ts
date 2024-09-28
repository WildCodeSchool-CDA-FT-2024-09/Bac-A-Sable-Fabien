import * as fs from "fs";
import { AppDataSource } from "../src/data-source";
import { Repo } from "../src/repos/repo.entity";
import { Lang } from "../src/langs/lang.entity";
import { Status } from "../src/status/status.entity";
import { Langbyrepo } from "../src/lang_by_repo/langbyrepo.entity";

type LangRaw = { node: { name: string; }; };

(async () => {
    const raw = await JSON.parse(
        fs.readFileSync("./data/raw.json", { encoding: "utf-8" })
    );

    const repo: Repo[] = raw.map(async (rep: any) => (
        await AppDataSource
            .createQueryBuilder()
            .insert()
            .into("Repo")
            .values([
                {
                    id: rep.id,
                    name: rep.name,
                    url: rep.url,
                    isPrivate: rep.isPrivate ? 1 : 2
                }
            ])
            .execute()
    ));

    const langs: Lang[] = [];

    raw.forEach((rep: any) => {
        rep.languages.forEach(async (lang: LangRaw) => {
            if (!langs.some((lg: Lang) => lg.label === lang.node.name)) {
                await AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into("Lang")
                    .values([
                        {
                            label: rep.label,
                        }
                    ])
                    .execute();
            }
            // const myLang = langs.find((lg: Lang) => lg.label === lang.node.name) as Lang;
            // lang_by_repo.push({ repo_id: rep.id, lang_id: myLang.id });
        });
    });
})();