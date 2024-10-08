import { Lang } from "./lang.entity";
import { Query, Resolver } from 'type-graphql';

@Resolver(Lang)
export default class LangResolver {
    @Query(() => [Lang])
    async getLangs() {
        return await Lang.find();
    }

    // @Query(() => Lang)
    // async getLang(@Arg("id") id: String) {
    //     return await Lang.findOneBy({ id });
    // }
};