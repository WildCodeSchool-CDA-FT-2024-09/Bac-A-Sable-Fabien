import { PrimaryGeneratedColumn, Entity, Column, BaseEntity, OneToMany } from "typeorm";
import { Repo } from "../repos/repo.entity";

@Entity()
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", width: 20 })
    label: string;

    @OneToMany(() => Repo, (repo) => repo.status)
    repos?: Repo[];
}
