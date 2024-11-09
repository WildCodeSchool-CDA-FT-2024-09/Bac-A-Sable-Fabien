import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  comment: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  repoId: Scalars['String']['output'];
};

export type CreateCommentInput = {
  comment: Scalars['String']['input'];
  name: Scalars['String']['input'];
  repoId: Scalars['String']['input'];
};

export type Lang = {
  __typename?: 'Lang';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewComment: Comment;
  createNewRepo: Repo;
  deleteComment: Scalars['Boolean']['output'];
  deleteRepo: Scalars['Boolean']['output'];
  toggleFavoriteRepo: Repo;
  updateComment: Comment;
};


export type MutationCreateNewCommentArgs = {
  data: CreateCommentInput;
};


export type MutationCreateNewRepoArgs = {
  data: RepoInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float']['input'];
};


export type MutationDeleteRepoArgs = {
  id: Scalars['String']['input'];
};


export type MutationToggleFavoriteRepoArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput;
  id: Scalars['Float']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllComments: Array<Comment>;
  getComment: Comment;
  getCommentsOfRepo: Array<Comment>;
  getFilteredRepos: Array<Repo>;
  getLangs: Array<Lang>;
  getRepo: Repo;
  getRepos: Array<Repo>;
  login: Scalars['Boolean']['output'];
  status: Status;
  statuses: Array<Status>;
};


export type QueryGetCommentArgs = {
  id: Scalars['Float']['input'];
};


export type QueryGetCommentsOfRepoArgs = {
  repoId: Scalars['String']['input'];
};


export type QueryGetFilteredReposArgs = {
  lang?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetRepoArgs = {
  id: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryStatusArgs = {
  id: Scalars['Float']['input'];
};

export type Repo = {
  __typename?: 'Repo';
  id: Scalars['ID']['output'];
  isFavorite: Scalars['Boolean']['output'];
  langs: Array<Lang>;
  name: Scalars['String']['output'];
  status: Status;
  url: Scalars['String']['output'];
};

export type RepoInput = {
  id: Scalars['String']['input'];
  isPrivate: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Status = {
  __typename?: 'Status';
  id: Scalars['Float']['output'];
  label: Scalars['String']['output'];
};

export type UpdateCommentInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  repoId?: InputMaybe<Scalars['String']['input']>;
};

export type ToggleFavoriteRepoMutationVariables = Exact<{
  toggleFavoriteRepoId: Scalars['String']['input'];
}>;


export type ToggleFavoriteRepoMutation = { __typename?: 'Mutation', toggleFavoriteRepo: { __typename?: 'Repo', name: string, url: string, isFavorite: boolean } };

export type CreateNewCommentMutationVariables = Exact<{
  data: CreateCommentInput;
}>;


export type CreateNewCommentMutation = { __typename?: 'Mutation', createNewComment: { __typename?: 'Comment', comment: string, id: string, name: string, repoId: string } };

export type DeleteCommentMutationVariables = Exact<{
  deleteCommentId: Scalars['Float']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: boolean };

export type GetLangsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLangsQuery = { __typename?: 'Query', getLangs: Array<{ __typename?: 'Lang', id: number, label: string }> };

export type GetFilteredReposQueryVariables = Exact<{
  lang?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetFilteredReposQuery = { __typename?: 'Query', getFilteredRepos: Array<{ __typename?: 'Repo', id: string, name: string, url: string, isFavorite: boolean, status: { __typename?: 'Status', id: number, label: string }, langs: Array<{ __typename?: 'Lang', id: number, label: string }> }> };

export type GetRepoQueryVariables = Exact<{
  repoId: Scalars['String']['input'];
}>;


export type GetRepoQuery = { __typename?: 'Query', getRepo: { __typename?: 'Repo', id: string, name: string, url: string, isFavorite: boolean, status: { __typename?: 'Status', id: number, label: string }, langs: Array<{ __typename?: 'Lang', id: number, label: string }> } };

export type GetCommentsOfRepoQueryVariables = Exact<{
  repoId: Scalars['String']['input'];
}>;


export type GetCommentsOfRepoQuery = { __typename?: 'Query', getCommentsOfRepo: Array<{ __typename?: 'Comment', id: string, repoId: string, name: string, comment: string }> };

export type LoginQueryVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: boolean };


export const ToggleFavoriteRepoDocument = gql`
    mutation ToggleFavoriteRepo($toggleFavoriteRepoId: String!) {
  toggleFavoriteRepo(id: $toggleFavoriteRepoId) {
    name
    url
    isFavorite
  }
}
    `;
export type ToggleFavoriteRepoMutationFn = Apollo.MutationFunction<ToggleFavoriteRepoMutation, ToggleFavoriteRepoMutationVariables>;

/**
 * __useToggleFavoriteRepoMutation__
 *
 * To run a mutation, you first call `useToggleFavoriteRepoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFavoriteRepoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFavoriteRepoMutation, { data, loading, error }] = useToggleFavoriteRepoMutation({
 *   variables: {
 *      toggleFavoriteRepoId: // value for 'toggleFavoriteRepoId'
 *   },
 * });
 */
export function useToggleFavoriteRepoMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFavoriteRepoMutation, ToggleFavoriteRepoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFavoriteRepoMutation, ToggleFavoriteRepoMutationVariables>(ToggleFavoriteRepoDocument, options);
      }
export type ToggleFavoriteRepoMutationHookResult = ReturnType<typeof useToggleFavoriteRepoMutation>;
export type ToggleFavoriteRepoMutationResult = Apollo.MutationResult<ToggleFavoriteRepoMutation>;
export type ToggleFavoriteRepoMutationOptions = Apollo.BaseMutationOptions<ToggleFavoriteRepoMutation, ToggleFavoriteRepoMutationVariables>;
export const CreateNewCommentDocument = gql`
    mutation CreateNewComment($data: CreateCommentInput!) {
  createNewComment(data: $data) {
    comment
    id
    name
    repoId
  }
}
    `;
export type CreateNewCommentMutationFn = Apollo.MutationFunction<CreateNewCommentMutation, CreateNewCommentMutationVariables>;

/**
 * __useCreateNewCommentMutation__
 *
 * To run a mutation, you first call `useCreateNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCommentMutation, { data, loading, error }] = useCreateNewCommentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCommentMutation, CreateNewCommentMutationVariables>(CreateNewCommentDocument, options);
      }
export type CreateNewCommentMutationHookResult = ReturnType<typeof useCreateNewCommentMutation>;
export type CreateNewCommentMutationResult = Apollo.MutationResult<CreateNewCommentMutation>;
export type CreateNewCommentMutationOptions = Apollo.BaseMutationOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($deleteCommentId: Float!) {
  deleteComment(id: $deleteCommentId)
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      deleteCommentId: // value for 'deleteCommentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const GetLangsDocument = gql`
    query GetLangs {
  getLangs {
    id
    label
  }
}
    `;

/**
 * __useGetLangsQuery__
 *
 * To run a query within a React component, call `useGetLangsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLangsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLangsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLangsQuery(baseOptions?: Apollo.QueryHookOptions<GetLangsQuery, GetLangsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLangsQuery, GetLangsQueryVariables>(GetLangsDocument, options);
      }
export function useGetLangsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLangsQuery, GetLangsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLangsQuery, GetLangsQueryVariables>(GetLangsDocument, options);
        }
export function useGetLangsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLangsQuery, GetLangsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLangsQuery, GetLangsQueryVariables>(GetLangsDocument, options);
        }
export type GetLangsQueryHookResult = ReturnType<typeof useGetLangsQuery>;
export type GetLangsLazyQueryHookResult = ReturnType<typeof useGetLangsLazyQuery>;
export type GetLangsSuspenseQueryHookResult = ReturnType<typeof useGetLangsSuspenseQuery>;
export type GetLangsQueryResult = Apollo.QueryResult<GetLangsQuery, GetLangsQueryVariables>;
export const GetFilteredReposDocument = gql`
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

/**
 * __useGetFilteredReposQuery__
 *
 * To run a query within a React component, call `useGetFilteredReposQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredReposQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredReposQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetFilteredReposQuery(baseOptions?: Apollo.QueryHookOptions<GetFilteredReposQuery, GetFilteredReposQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilteredReposQuery, GetFilteredReposQueryVariables>(GetFilteredReposDocument, options);
      }
export function useGetFilteredReposLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilteredReposQuery, GetFilteredReposQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilteredReposQuery, GetFilteredReposQueryVariables>(GetFilteredReposDocument, options);
        }
export function useGetFilteredReposSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilteredReposQuery, GetFilteredReposQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilteredReposQuery, GetFilteredReposQueryVariables>(GetFilteredReposDocument, options);
        }
export type GetFilteredReposQueryHookResult = ReturnType<typeof useGetFilteredReposQuery>;
export type GetFilteredReposLazyQueryHookResult = ReturnType<typeof useGetFilteredReposLazyQuery>;
export type GetFilteredReposSuspenseQueryHookResult = ReturnType<typeof useGetFilteredReposSuspenseQuery>;
export type GetFilteredReposQueryResult = Apollo.QueryResult<GetFilteredReposQuery, GetFilteredReposQueryVariables>;
export const GetRepoDocument = gql`
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

/**
 * __useGetRepoQuery__
 *
 * To run a query within a React component, call `useGetRepoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepoQuery({
 *   variables: {
 *      repoId: // value for 'repoId'
 *   },
 * });
 */
export function useGetRepoQuery(baseOptions: Apollo.QueryHookOptions<GetRepoQuery, GetRepoQueryVariables> & ({ variables: GetRepoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepoQuery, GetRepoQueryVariables>(GetRepoDocument, options);
      }
export function useGetRepoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepoQuery, GetRepoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepoQuery, GetRepoQueryVariables>(GetRepoDocument, options);
        }
export function useGetRepoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRepoQuery, GetRepoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRepoQuery, GetRepoQueryVariables>(GetRepoDocument, options);
        }
export type GetRepoQueryHookResult = ReturnType<typeof useGetRepoQuery>;
export type GetRepoLazyQueryHookResult = ReturnType<typeof useGetRepoLazyQuery>;
export type GetRepoSuspenseQueryHookResult = ReturnType<typeof useGetRepoSuspenseQuery>;
export type GetRepoQueryResult = Apollo.QueryResult<GetRepoQuery, GetRepoQueryVariables>;
export const GetCommentsOfRepoDocument = gql`
    query GetCommentsOfRepo($repoId: String!) {
  getCommentsOfRepo(repoId: $repoId) {
    id
    repoId
    name
    comment
  }
}
    `;

/**
 * __useGetCommentsOfRepoQuery__
 *
 * To run a query within a React component, call `useGetCommentsOfRepoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsOfRepoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsOfRepoQuery({
 *   variables: {
 *      repoId: // value for 'repoId'
 *   },
 * });
 */
export function useGetCommentsOfRepoQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsOfRepoQuery, GetCommentsOfRepoQueryVariables> & ({ variables: GetCommentsOfRepoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsOfRepoQuery, GetCommentsOfRepoQueryVariables>(GetCommentsOfRepoDocument, options);
      }
export function useGetCommentsOfRepoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsOfRepoQuery, GetCommentsOfRepoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsOfRepoQuery, GetCommentsOfRepoQueryVariables>(GetCommentsOfRepoDocument, options);
        }
export function useGetCommentsOfRepoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCommentsOfRepoQuery, GetCommentsOfRepoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCommentsOfRepoQuery, GetCommentsOfRepoQueryVariables>(GetCommentsOfRepoDocument, options);
        }
export type GetCommentsOfRepoQueryHookResult = ReturnType<typeof useGetCommentsOfRepoQuery>;
export type GetCommentsOfRepoLazyQueryHookResult = ReturnType<typeof useGetCommentsOfRepoLazyQuery>;
export type GetCommentsOfRepoSuspenseQueryHookResult = ReturnType<typeof useGetCommentsOfRepoSuspenseQuery>;
export type GetCommentsOfRepoQueryResult = Apollo.QueryResult<GetCommentsOfRepoQuery, GetCommentsOfRepoQueryVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $email: String!) {
  login(password: $password, email: $email)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const namedOperations = {
  Query: {
    GetLangs: 'GetLangs',
    GetFilteredRepos: 'GetFilteredRepos',
    GetRepo: 'GetRepo',
    GetCommentsOfRepo: 'GetCommentsOfRepo',
    Login: 'Login'
  },
  Mutation: {
    ToggleFavoriteRepo: 'ToggleFavoriteRepo',
    CreateNewComment: 'CreateNewComment',
    DeleteComment: 'DeleteComment'
  }
}