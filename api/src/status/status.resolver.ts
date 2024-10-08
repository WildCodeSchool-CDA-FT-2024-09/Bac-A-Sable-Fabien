import { Status } from "./status.entity";
import { Arg, Query, Resolver } from 'type-graphql';

@Resolver(Status)
export default class StatusResolver {
    @Query(() => [Status])
    async statuses() {
        return await Status.find();
    }

    @Query(() => Status)
    async status(@Arg("id") id: number) {
        return await Status.findOneOrFail({ where: { id } });
    }
};