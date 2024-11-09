import { gql } from "@apollo/client";

export const GET_LANGS = gql`
  query GetLangs {
    getLangs {
      id
      label
    }
  }
`;

export const GET_FILTERED_REPOS = gql`
  query GetFilteredRepos($lang: String, $name: String) {
    getFilteredRepos(lang: $lang, name: $name) {
      id
      name
      url
      isFavorite
      status {
        id
        label
      }
      langs {
        id
        label
      }
    }
  }
`;

export const GET_REPO = gql`
  query GetRepo($repoId: String!) {
    getRepo(id: $repoId) {
      id
      name
      url
      isFavorite
      status {
        id
        label
      }
      langs {
        id
        label
      }
    }
  }
`;

export const GET_COMMENTS_OF_REPO = gql`
  query GetCommentsOfRepo($repoId: String!) {
    getCommentsOfRepo(repoId: $repoId) {
      id
      repoId
      name
      comment
    }
  }
`;

export const LOGIN = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;
