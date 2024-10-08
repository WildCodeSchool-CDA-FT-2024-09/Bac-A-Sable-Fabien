import { PrimaryGeneratedColumn, Entity, Column, BaseEntity, OneToMany } from "typeorm";
import { Repo } from "../repo/repo.entity";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Status extends BaseEntity {
    @Field(() => Number)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "varchar", width: 20 })
    label: string;

    // @Field()
    @OneToMany(() => Repo, (repo) => repo.status)
    repos?: Repo[];
}
