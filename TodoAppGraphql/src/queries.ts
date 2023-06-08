import {gql} from '@apollo/client';
import {IPaginatedType, ResponseTodo} from './types';

export const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfoFields on PageInfo {
    endCursor
    hasNextPage
    hasPreviousPage
    startCursor
  }
`;

export const TODOS_PAGE_INFO_CLIENT = gql`
  query QueryCursorBasedPaginated($limit: Int!) {
    queryCursorBasedPaginated(limit: $limt) @client {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export const TODOS_QUERY = gql`
  query QueryCursorBasedPaginated(
    $limit: Int!
    $previousPageCursor: String
    $nextPageCursor: String
  ) {
    queryCursorBasedPaginated(
      limit: $limit
      previousPageCursor: $previousPageCursor
      nextPageCursor: $nextPageCursor
    ) {
      edges {
        node {
          id
          createdAt
          isDone
          name
          tag
          updatedAt
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`;

export type TODOS_QUERY_TYPE = {
  queryCursorBasedPaginated: IPaginatedType<ResponseTodo>;
};

export const CREATE_TODO = gql`
  mutation CreateTodoMutation($createTodoInput: CreateTodoInput!) {
    createTodo(createTodoInput: $createTodoInput) {
      createdAt
      id
      isDone
      name
      tag
      updatedAt
    }
  }
`;

export type CREATE_TODO_TYPE = {
  createTodo: ResponseTodo;
};

export const REMOVE_TODO = gql`
  mutation Mutation($removeTodoId: String!) {
    removeTodo(id: $removeTodoId) {
      deletedCount
    }
  }
`;

export const EDIT_TODO = gql`
  mutation Mutation($updateTodoInput: UpdateTodoInput!) {
    updateTodo(updateTodoInput: $updateTodoInput) {
      id
      name
      isDone
      tag
      createdAt
      updatedAt
    }
  }
`;

export type EDIT_TODO_TYPE = {
  updateTodo: ResponseTodo;
};

const TODO_QUERY_BODY = `#graphql
    todo(id: $todoId) {
      createdAt
      id
      isDone
      name
      tag
      updatedAt
    }
`;

export const GET_TODO_BY_ID = gql`
  query QueryTodo($todoId: String!) {
    ${TODO_QUERY_BODY}
  }
`;

export type GET_TODO_BY_ID_TYPE = {
  todo: ResponseTodo;
};

export const GET_TODO_BY_ID_LOCAL = gql`
  query QueryTodo($todoId: String!) {
    ${TODO_QUERY_BODY}
  }
`;

export type GET_TODO_BY_ID_LOCAL_TYPE = {
  todo: ResponseTodo;
  prevCursor: string;
};
