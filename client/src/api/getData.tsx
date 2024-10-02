import axios from "axios";
import { Repo } from "../types/repoType";
import { Lang } from "../types/langType";

export async function getLangs() {
  let langs: Lang[];
  try {
    const { data } = await axios.get("http://localhost:3001/api/langs/");
    langs = data;
    return langs;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    } else {
      console.error(error);
    }
  }
}

export async function getRepos() {
  let repos: Repo[];
  try {
    const { data } = await axios.get("http://localhost:3001/api/repos/");
    repos = data;
    return repos;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    } else {
      console.error(error);
    }
  }
}

export async function getRepoById(id: string) {
  let repo: Repo[];
  try {
    const { data } = await axios.get(`http://localhost:3001/api/repos/${id}`);
    repo = data;
    return repo[0];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error);
    } else {
      console.error(error);
    }
  }
}
