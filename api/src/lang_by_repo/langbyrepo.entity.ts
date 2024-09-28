import { PrimaryColumn, Entity } from "typeorm";

@Entity()
export class Langbyrepo {
    @PrimaryColumn({ type: "varchar", width: 100 })
    repo_id!: string;

    @PrimaryColumn({ type: "int" })
    lang_id!: number;
}
