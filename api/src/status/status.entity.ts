import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", width: 20 })
    label!: string;
}
