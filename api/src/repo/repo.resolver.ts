import { Repo } from "./repo.entity";
import { Status } from "../status/status.entity";
import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';

@InputType()
class RepoInput implements Partial<Repo> {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    url: string;

    @Field()
    isPrivate: number;
}

@Resolver(Repo)
export default class RepoResolver {
    @Query(() => [Repo])
    async getRepos() {
        const repos = await Repo.find({
            relations: {
                status: true,
                langs: true
            }
        });
        return repos;
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

        const status = await Status.findOneOrFail({
            where: { id: +newRepo.isPrivate },
        });
        repo.status = status;

        await repo.save();

        const myRepo = await Repo.findOneOrFail({
            where: { id: newRepo.id },
            relations: {
                langs: true,
                status: true,
            },
        });

        return myRepo;
    }

    @Mutation(() => Boolean)
    async deleteRepo(@Arg("id") id: string) {
        const repo = await Repo.findOneBy({ id });
        if (repo !== null) {
            await repo.remove();
            return true;
        }
        return false;
    }
};

