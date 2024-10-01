import { IsString, Max, Min } from "class-validator";
import { PrimaryColumn, Entity, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Status } from "../status/status.entity";
import { Lang } from "../langs/lang.entity";

@Entity()
export class Repo extends BaseEntity {
    @PrimaryColumn()
    @IsString()
    id: string;

    @Column({ type: "varchar", width: 100 })
    @IsString()
    name: string;

    @Column({ type: "varchar", width: 100 })
    @IsString()
    url: string;

    @ManyToOne(() => Status, (status) => status.id)
    @Min(1)
    @Max(2)
    status: Status;

    @ManyToMany(() => Lang, lang => lang.repos)
    @JoinTable()
    langs?: Lang[];
}
