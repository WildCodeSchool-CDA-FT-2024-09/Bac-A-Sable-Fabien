import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn({ type: "int" })
    id: number;

    @Field(() => String)
    @Column()
    @IsNotEmpty()
    @IsString()
    repoId: string;

    @Field(() => String)
    @Column({ type: "varchar", width: 30 })
    @IsNotEmpty()
    @IsString()
    @Length(1, 30)
    name: string;

    @Field(() => String)
    @Column({ type: "text" })
    @IsString()
    @IsNotEmpty()
    comment: string;
}
