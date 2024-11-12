import { PrimaryGeneratedColumn, Entity, Column, BaseEntity, ManyToMany } from "typeorm";
import { IsString, Length } from "class-validator";
import { Repo } from "../repo/repo.entity";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Lang extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Field()
    @Column({ type: "varchar", width: 30 })
    @IsString()
    @Length(1, 30)
    label: string;

    @ManyToMany(() => Repo, repo => repo.langs)
    repos?: Repo[];
}
