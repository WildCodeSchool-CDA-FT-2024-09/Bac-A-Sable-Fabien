import { PrimaryGeneratedColumn, Entity, Column, BaseEntity/* , OneToMany */ } from "typeorm";
import { IsNumber, IsString } from "class-validator";
// import { Repo } from "../repos/repo.entity";

@Entity()
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: "varchar", width: 20 })
    @IsString()
    label: string;

    // @OneToMany(() => Repo, (repo) => repo.isPrivate)
    // repos: Repo;
}
