import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldErrors = {
  __typename?: 'FieldErrors';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<UserResponse>;
  login?: Maybe<UserResponse>;
  updateUser?: Maybe<UserResponse>;
  deleteUser?: Maybe<UserResponse>;
  createPost?: Maybe<PostResponse>;
  updatePost?: Maybe<PostResponse>;
  deletePost?: Maybe<PostResponse>;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  username: Scalars['String'];
  email: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  email: Scalars['String'];
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
  userId: Scalars['String'];
  body?: Maybe<Scalars['String']>;
};


export type MutationUpdatePostArgs = {
  title: Scalars['String'];
  body: Scalars['String'];
  postId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
  userId: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  title: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  user_id?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PostInput = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<Maybe<FieldErrors>>>;
  data?: Maybe<Post>;
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Query = {
  __typename?: 'Query';
  getUsers?: Maybe<UserResponse>;
  getUser?: Maybe<UserResponse>;
  getPosts?: Maybe<PostResponse>;
  getPost?: Maybe<PostResponse>;
};


export type QueryGetUserArgs = {
  userId: Scalars['String'];
};


export type QueryGetPostArgs = {
  postId: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  uuid: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  role: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserDetails = {
  name?: Maybe<Scalars['String']>;
  uuid: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Maybe<FieldErrors>>>;
  data?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: Maybe<{ __typename?: 'UserResponse', errors?: Maybe<Array<Maybe<{ __typename?: 'FieldErrors', field: string, message: string }>>>, data?: Maybe<{ __typename?: 'User', id: string, uuid: string, email: string, username: string, token?: Maybe<string>, createdAt: string, updatedAt: string }> }> };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: Maybe<{ __typename?: 'UserResponse', errors?: Maybe<Array<Maybe<{ __typename?: 'FieldErrors', field: string, message: string }>>>, data?: Maybe<{ __typename?: 'User', id: string, uuid: string, email: string, username: string, token?: Maybe<string>, createdAt: string, updatedAt: string }> }> };

export type UpdatePostMutationVariables = Exact<{
  title: Scalars['String'];
  body: Scalars['String'];
  postId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost?: Maybe<{ __typename?: 'PostResponse', errors?: Maybe<Array<Maybe<{ __typename?: 'FieldErrors', field: string, message: string }>>>, data?: Maybe<{ __typename?: 'Post', id: number, uuid: string, title: string, body?: Maybe<string>, user_id?: Maybe<string>, createdAt: string, updatedAt: string }> }> };

export type GetPostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: Maybe<{ __typename?: 'PostResponse', errors?: Maybe<Array<Maybe<{ __typename?: 'FieldErrors', field: string, message: string }>>>, data?: Maybe<{ __typename?: 'Post', id: number, uuid: string, title: string, body?: Maybe<string>, user_id?: Maybe<string> }> }> };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getPosts?: Maybe<{ __typename?: 'PostResponse', errors?: Maybe<Array<Maybe<{ __typename?: 'FieldErrors', field: string, message: string }>>>, posts?: Maybe<Array<Maybe<{ __typename?: 'Post', id: number, uuid: string, title: string, body?: Maybe<string>, user_id?: Maybe<string>, createdAt: string, updatedAt: string }>>> }> };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    errors {
      field
      message
    }
    data {
      id
      uuid
      email
      username
      token
      createdAt
      updatedAt
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(email: $email, username: $username, password: $password) {
    errors {
      field
      message
    }
    data {
      id
      uuid
      email
      username
      token
      createdAt
      updatedAt
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($title: String!, $body: String!, $postId: String!, $userId: String!) {
  updatePost(title: $title, body: $body, postId: $postId, userId: $userId) {
    errors {
      field
      message
    }
    data {
      id
      uuid
      title
      body
      user_id
      createdAt
      updatedAt
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      postId: // value for 'postId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const GetPostDocument = gql`
    query GetPost($postId: String!) {
  getPost(postId: $postId) {
    errors {
      field
      message
    }
    data {
      id
      uuid
      title
      body
      user_id
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    errors {
      field
      message
    }
    posts {
      id
      uuid
      title
      body
      user_id
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;