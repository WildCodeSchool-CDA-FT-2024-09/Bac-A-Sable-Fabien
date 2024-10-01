import { IsNumber, IsString } from "class-validator";
import { PrimaryColumn, Entity, BaseEntity } from "typeorm";

@Entity()
export class Langbyrepo extends BaseEntity {
    @PrimaryColumn({ type: "varchar", width: 100 })
    @IsString()
    repo_id: string;

    @PrimaryColumn({ type: "int" })
    @IsNumber()
    lang_id: number;
}
