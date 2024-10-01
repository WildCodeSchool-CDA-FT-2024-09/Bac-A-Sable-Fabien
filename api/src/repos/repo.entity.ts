import { IsInt, IsString, Max, Min } from "class-validator";
import { PrimaryColumn, Entity, Column, BaseEntity/* , ManyToOne */ } from "typeorm";
// import { Status } from "../status/status.entity";

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

    @Column({ type: "int", width: 3 })
    @IsInt()
    @Min(1)
    @Max(2)
    isPrivate: number;

    // @ManyToOne(() => Status, (stat) => stat.repos)
    // status: Status;
}
