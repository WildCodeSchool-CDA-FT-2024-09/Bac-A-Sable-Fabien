import { PrimaryColumn, Entity, Column } from "typeorm";

@Entity()
export class Repo {
    @PrimaryColumn()
    id!: string;

    @Column({ type: "varchar", width: 100 })
    name!: string;

    @Column({ type: "varchar", width: 100 })
    url!: string;

    @Column({ type: "int", width: 3 })
    isPrivate!: number;
}
