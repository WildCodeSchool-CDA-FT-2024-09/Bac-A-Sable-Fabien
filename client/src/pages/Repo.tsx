import { Form, useLoaderData } from "react-router-dom";
import { getRepoById } from "../api/getData";
import Button from "../components/Button";

export async function loader({ params }) {
  const repo = await getRepoById(params.repoId);
  return { repo };
}

export default function Repo() {
  const { repo } = useLoaderData();

  return (
    <div id="repo">
      <div>
        <h2 className="font-bold text-2xl pb-4">
          {repo.name}
          <span
            className={`${
              repo.status.label === "private" ? "bg-red-400" : "bg-green-400"
            } rounded px-1 ml-2 text-sm`}
          >
            {repo.status.label}
          </span>
        </h2>

        {repo.url && (
          <p className="pb-4">
            <a target="_blank" href={repo.url}>
              Project URL: {repo.url}
            </a>
          </p>
        )}

        <p>Languages:</p>
        <ul>
          {repo.langs.map((lang) => (
            <li className="list-disc ml-5" key={lang.id}>
              {lang.label}
            </li>
          ))}
        </ul>

        <div className="flex flex-rows gap-4 my-4">
          <Form action="edit">
            <Button variant="secondary" type="submit">
              Edit
            </Button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this repo.")) {
                event.preventDefault();
              }
            }}
          >
            <Button variant="danger" type="submit">
              Delete
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}