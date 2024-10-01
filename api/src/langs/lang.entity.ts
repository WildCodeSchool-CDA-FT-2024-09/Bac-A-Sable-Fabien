import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import { IsString, Length } from "class-validator";

@Entity()
export class Lang extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column({ type: "varchar", width: 30 })
    @IsString()
    @Length(1, 30)
    label: string;
}
