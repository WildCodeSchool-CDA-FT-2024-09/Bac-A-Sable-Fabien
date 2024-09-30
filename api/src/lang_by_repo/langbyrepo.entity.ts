import { PrimaryColumn, Entity, BaseEntity } from "typeorm";
import "reflect-metadata";

@Entity()
export class Langbyrepo extends BaseEntity {
    @PrimaryColumn({ type: "varchar", width: 100 })
    repo_id: string;

    @PrimaryColumn({ type: "int" })
    lang_id: number;
}
