import { Repo } from "./repo.entity";
import { Status } from "../status/status.entity";
import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { validate } from "class-validator";
import { Like } from "typeorm";

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
  @Authorized("admin")
  @Query(() => [Repo])
  async getRepos() {
    const repos = await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
    return repos;
  }

  @Authorized("admin")
  @Query(() => [Repo])
  async getFilteredRepos(
    @Arg("lang", { nullable: true }) lang: String,
    @Arg("name", { nullable: true }) name: String,
  ) {
    if (name) {
      return await Repo.find({
        where: [
          { name: Like(`%${name}%`) },
          {
            langs: {
              label: `${lang}`,
            },
          },
        ],
        relations: {
          status: true,
          langs: true,
        },
      });
    } else if (lang) {
      return await Repo.find({
        where: [
          {
            langs: {
              label: `${lang}`,
            },
          },
        ],
        relations: {
          status: true,
          langs: true,
        },
      });
    }
    return await Repo.find({
      relations: {
        status: true,
        langs: true,
      },
    });
  }

  @Query(() => Repo)
  async getRepo(@Arg("id") id: String) {
    return await Repo.findOneOrFail({
      where: {
        id: id.toString(),
      },
      relations: {
        status: true,
        langs: true,
      },
    });
  }

  @Mutation(() => Repo)
  async createNewRepo(@Arg("data") newRepo: RepoInput) {
    const repo = new Repo();
    repo.id = newRepo.id;
    repo.name = newRepo.name;
    repo.url = newRepo.url;

    const status = await Status.findOneOrFail({
      where: { id: +newRepo.isPrivate },
    });
    console.log(+newRepo.isPrivate, status);

    repo.status = status;

    const error = await validate(repo);
    if (error.length > 0) throw new Error(`Validation Error: ${error}`);

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

  @Mutation(() => Repo)
  async toggleFavoriteRepo(@Arg("id") id: string) {
    const repo = await Repo.findOneOrFail({ where: { id } });
    if (!repo) throw new Error("Repository not found!");
    repo.isFavorite = !repo.isFavorite;
    await repo.save();
    return repo;
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
}
