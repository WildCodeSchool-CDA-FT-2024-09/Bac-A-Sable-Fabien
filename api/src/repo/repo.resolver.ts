import { Repo } from "./repo.entity";
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';

@InputType()
class RepoInput {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    url: string;
}

@Resolver(Repo)
export default class RepoResolver {
    @Query(() => [Repo])
    async getRepos() {
        return await Repo.find({
            relations: {
                status: true,
                langs: true
            }
        });
    }

    @Query(() => Repo)
    async getRepo(@Arg("id") id: String) {
        return await Repo.findOneOrFail({
            where: {
                id: id.toString()
            },
            relations: {
                status: true
            }
        });
    }

    @Mutation(() => Repo)
    async createNewRepo(@Arg("data") newRepo: RepoInput) {
        // TODO: data validation
        const repo = new Repo();
        repo.id = newRepo.id;
        repo.name = newRepo.name;
        repo.url = newRepo.url;
        await repo.save();
        return repo;
    }
};

