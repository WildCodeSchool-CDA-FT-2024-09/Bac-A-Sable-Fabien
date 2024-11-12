import { PrimaryGeneratedColumn, Entity, Column, BaseEntity } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "int" })
  id: number;

  @Field(() => String, { nullable: false })
  @Column()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  @Column()
  //   @IsString()
  fullname: string;

  @Field(() => String, { nullable: false })
  @Column()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field(() => Number, { nullable: false, defaultValue: 2 })
  @Column()
  @Min(1)
  @Max(2)
  role: number;
}
