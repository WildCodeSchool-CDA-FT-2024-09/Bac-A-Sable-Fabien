import { gql } from "@apollo/client";

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavoriteRepo($toggleFavoriteRepoId: String!) {
    toggleFavoriteRepo(id: $toggleFavoriteRepoId) {
      name
      url
      isFavorite
    }
  }
`;

export const CREATE_NEW_COMMENT = gql`
  mutation CreateNewComment($data: CreateCommentInput!) {
    createNewComment(data: $data) {
      comment
      id
      name
      repoId
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: Float!) {
    deleteComment(id: $deleteCommentId)
  }
`;
