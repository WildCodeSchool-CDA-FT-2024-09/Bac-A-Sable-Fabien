import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import "reflect-metadata";

@Entity()
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", width: 20 })
    label: string;
}
