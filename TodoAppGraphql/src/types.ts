export type Todo = {
  id: string;
  name: string;
  isDone?: boolean;
  tag?: string;
};

export type ResponseTodo = Todo & {
  createdAt: string;
  updatedAt: string;
};

export interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
