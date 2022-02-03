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


export type GQLDecision = {
  __typename?: 'Decision';
  id: Scalars['ID'];
  answer: Scalars['Float'];
};

export type GQLGetOptionsForPollDto = {
  pollId: Scalars['String'];
};

export type GQLGetPollDto = {
  pollId: Scalars['String'];
};

export type GQLMutation = {
  __typename?: 'Mutation';
  addProduct: GQLProduct;
  updateProduct: GQLProduct;
  deleteProduct: Scalars['Boolean'];
  addPoll: GQLPoll;
  addUser: GQLUser;
  addOption: GQLOption;
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


export type GQLMutationaddPollArgs = {
  data: GQLPollInput;
};


export type GQLMutationaddUserArgs = {
  data: GQLUserInput;
};


export type GQLMutationaddOptionArgs = {
  data: GQLOptionInput;
};

export type GQLOption = {
  __typename?: 'Option';
  id: Scalars['ID'];
  title: Scalars['String'];
  poll: GQLPoll;
  thumbnailUrl: Maybe<Scalars['String']>;
};

export type GQLOptionInput = {
  title: Scalars['String'];
  poll: Scalars['String'];
};

export type GQLPaginatedProducts = {
  __typename?: 'PaginatedProducts';
  nodes: Array<GQLProduct>;
  totalCount: Scalars['Int'];
  nextPage: Maybe<Scalars['Int']>;
  previousPage: Maybe<Scalars['Int']>;
  totalPages: Maybe<Scalars['Int']>;
};

export type GQLPoll = {
  __typename?: 'Poll';
  id: Scalars['ID'];
  title: Scalars['String'];
  sharelink: Maybe<Scalars['String']>;
  predefined: Scalars['Boolean'];
};

export type GQLPollInput = {
  title: Scalars['String'];
  predefined?: Maybe<Scalars['Boolean']>;
  owner: Scalars['String'];
  type: GQLPollType;
};

export type GQLPollType =
  | 'BINARY'
  | 'DATE'
  | 'NUMERICAL'
  | 'TINDER';

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
  pollsAll: Array<GQLPoll>;
  getPoll: GQLPoll;
  usersAll: Array<GQLUser>;
  checkToken: Scalars['Boolean'];
  thumbnailsAll: Array<GQLThumbnail>;
  optionsAll: Array<GQLDecision>;
  getOptionsForPoll: Array<GQLOption>;
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


export type GQLQuerygetPollArgs = {
  data: GQLGetPollDto;
};


export type GQLQuerygetOptionsForPollArgs = {
  data: GQLGetOptionsForPollDto;
};

export type GQLSortDirection =
  | 'ASC'
  | 'DESC';

export type GQLThumbnail = {
  __typename?: 'Thumbnail';
  id: Scalars['ID'];
  link: Scalars['String'];
};

export type GQLUser = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  token: Scalars['String'];
};

export type GQLUserInput = {
  name: Scalars['String'];
};
