import { gql, useMutation } from "@apollo/client";
import { Repo } from "../types/repoType";
import { useState } from "react";

const TOGGLE_FAVORITE = gql`
  mutation ToggleFavoriteRepo($toggleFavoriteRepoId: String!) {
    toggleFavoriteRepo(id: $toggleFavoriteRepoId) {
      name
      url
      isFavorite
    }
  }
`;

const FavoriteButton = ({ repo }: { repo: Repo }) => {
  const [fave, setFave] = useState(repo?.isFavorite);
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: { toggleFavoriteRepoId: repo?.id },
    onCompleted: (data) => {
      setFave(data.toggleFavoriteRepo.isFavorite);
    },
  });

  return (
    <button
      className={`float-end rounded px-1 ml-2 text-sm font-normal ${
        fave ? "bg-red-400 text-white" : "bg-gray-200 text-gray-400"
      }`}
      type="button"
      onClick={toggleFavorite}
    >
      {fave ? "Liked" : "Like"}
    </button>
  );
};

export default FavoriteButton;
