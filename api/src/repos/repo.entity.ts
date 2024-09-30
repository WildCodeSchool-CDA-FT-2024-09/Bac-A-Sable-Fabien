import { PrimaryColumn, Entity, Column, BaseEntity } from "typeorm";

@Entity()
export class Repo extends BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column({ type: "varchar", width: 100 })
    name!: string;

    @Column({ type: "varchar", width: 100 })
    url!: string;

    @Column({ type: "int", width: 3 })
    isPrivate!: number;
}
