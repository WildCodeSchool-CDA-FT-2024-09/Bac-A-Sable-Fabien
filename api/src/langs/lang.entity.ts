import { PrimaryGeneratedColumn, Entity, Column, BaseEntity, ManyToMany } from "typeorm";
import { IsString, Length } from "class-validator";
import { Repo } from "../repos/repo.entity";

@Entity()
export class Lang extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", width: 30 })
    @IsString()
    @Length(1, 30)
    label: string;

    @ManyToMany(() => Repo, repo => repo.langs)
    repos?: Repo[];
}
