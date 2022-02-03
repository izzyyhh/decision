export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};


export type GQLMutation = {
  __typename?: 'Mutation';
  addProduct: GQLProduct;
  updateProduct: GQLProduct;
  deleteProduct: Scalars['Boolean'];
<<<<<<< HEAD
  addUser: GQLUser;
=======
>>>>>>> add initial global styles
};


export type GQLMutationaddProductArgs = {
  data: GQLProductInput;
};


export type GQLMutationupdateProductArgs = {
  data: GQLProductInput;
  id: Scalars['ID'];
};


export type GQLMutationdeleteProductArgs = {
  id: Scalars['ID'];
};


export type GQLMutationaddUserArgs = {
  data: GQLUserInput;
};

export type GQLPaginatedProducts = {
  __typename?: 'PaginatedProducts';
  nodes: Array<GQLProduct>;
  totalCount: Scalars['Int'];
  nextPage: Maybe<Scalars['Int']>;
  previousPage: Maybe<Scalars['Int']>;
  totalPages: Maybe<Scalars['Int']>;
};

export type GQLProduct = {
  __typename?: 'Product';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Maybe<Scalars['DateTime']>;
  sales: Scalars['Int'];
};

export type GQLProductInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type GQLQuery = {
  __typename?: 'Query';
  product: GQLProduct;
  productsAll: Array<GQLProduct>;
  products: GQLPaginatedProducts;
  productsOffsetBased: Array<GQLProduct>;
  usersAll: Array<GQLUser>;
  checkToken: Scalars['Boolean'];
};


export type GQLQueryproductArgs = {
  id: Scalars['ID'];
};


export type GQLQueryproductsArgs = {
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  sortColumnName?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<GQLSortDirection>;
  query?: Maybe<Scalars['String']>;
};


export type GQLQueryproductsOffsetBasedArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sortColumnName?: Maybe<Scalars['String']>;
  sortDirection?: Maybe<GQLSortDirection>;
  query?: Maybe<Scalars['String']>;
};

export type GQLSortDirection =
  | 'ASC'
  | 'DESC';

export type GQLUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type GQLUserInput = {
  name: Scalars['String'];
};
