import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import "reflect-metadata";

@Entity()
export class Lang extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", width: 30 })
    label: string;
}
