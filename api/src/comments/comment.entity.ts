import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import { IsString, Length } from "class-validator";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Column()
    repoId: string;

    @Column({ type: "varchar", width: 30 })
    @IsString()
    @Length(1, 30)
    name: string;

    // @Column({ type: "datetime" })
    // postedAt: string;

    @Column({ type: "text" })
    comment: string;
}
