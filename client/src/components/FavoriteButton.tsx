import { useState } from "react";
import {
  useToggleFavoriteRepoMutation,
  Repo,
} from "../generated/graphql-types";

const FavoriteButton = ({ repo }: { repo: Repo }) => {
  const [fave, setFave] = useState<boolean | undefined>(repo?.isFavorite);
  const [toggleFavorite] = useToggleFavoriteRepoMutation({
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
      onClick={() => toggleFavorite()}
    >
      {fave ? "Liked" : "Like"}
    </button>
  );
};

export default FavoriteButton;
