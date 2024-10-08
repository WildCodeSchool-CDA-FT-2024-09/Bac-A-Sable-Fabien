import { IsBoolean, IsString, Max, Min } from "class-validator";
import { PrimaryColumn, Entity, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Status } from "../status/status.entity";
import { Lang } from "../lang/lang.entity";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Repo extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn()
    @IsString()
    id: string;

    @Field(() => String)
    @Column({ type: "varchar", width: 100 })
    @IsString()
    name: string;

    @Field(() => String)
    @Column({ type: "varchar", width: 100 })
    @IsString()
    url: string;

    @Field(() => Boolean)
    @Column({
        default: () => false
    })
    @IsBoolean()
    isFavorite: boolean;

    @Field(() => Status)
    @ManyToOne(() => Status, (status) => status.id)
    @Min(1)
    @Max(2)
    status: Status;

    @Field(() => [Lang])
    @ManyToMany(() => Lang, lang => lang.repos)
    @JoinTable()
    langs?: Lang[];
}
