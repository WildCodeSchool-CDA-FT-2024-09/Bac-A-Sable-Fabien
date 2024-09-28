import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity()
export class Lang {
    @PrimaryGeneratedColumn({ type: "int" })
    id!: number;

    @Column({ type: "varchar", width: 30 })
    label!: string;
}
