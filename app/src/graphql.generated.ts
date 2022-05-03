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

export type GQLActivity = {
  __typename?: 'Activity';
  name: Scalars['String'];
  date: Maybe<Scalars['Float']>;
  type: GQLActivityType;
  id: Scalars['String'];
};

export type GQLActivityInput = {
  id: Scalars['String'];
};

export type GQLActivityType =
  | 'POLL'
  | 'DECISION';


export type GQLDecision = {
  __typename?: 'Decision';
  id: Scalars['ID'];
  user: GQLUser;
  option: GQLOption;
  poll: GQLPoll;
  answer: Maybe<Scalars['Float']>;
  createdAt: Maybe<Scalars['Float']>;
};

export type GQLDecisionInput = {
  user: Scalars['String'];
  poll: Scalars['String'];
  option: Scalars['String'];
  answer?: Maybe<Scalars['Float']>;
};

export type GQLGenre = {
  __typename?: 'Genre';
  apiId: Scalars['ID'];
  title: Scalars['String'];
  movies: Array<GQLMovie>;
};

export type GQLGetDecisionDto = {
  id: Scalars['String'];
};

export type GQLGetDecisionForPollDto = {
  pollId: Scalars['String'];
};

export type GQLGetDecisionForUserAndPollDto = {
  user: Scalars['String'];
  poll: Scalars['String'];
};

export type GQLGetOptionsForPollDto = {
  pollId: Scalars['String'];
};

export type GQLGetPollDto = {
  pollId: Scalars['String'];
};

export type GQLLocationDto = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type GQLMovie = {
  __typename?: 'Movie';
  id: Scalars['ID'];
  title: Scalars['String'];
  posterPath: Scalars['String'];
  backdropPath: Scalars['String'];
  rating: Scalars['String'];
  description: Scalars['String'];
  releaseDate: Scalars['String'];
  adult: Scalars['Boolean'];
  mediaType: Scalars['String'];
  genres: Array<GQLGenre>;
};

export type GQLMoviesDto = {
  __typename?: 'MoviesDto';
  title: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};

export type GQLMutation = {
  __typename?: 'Mutation';
  addProduct: GQLProduct;
  updateProduct: GQLProduct;
  deleteProduct: Scalars['Boolean'];
  addPoll: GQLPoll;
  addUser: GQLUser;
  addOption: GQLOption;
  addDecision: GQLDecision;
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


export type GQLMutationaddDecisionArgs = {
  data: GQLDecisionInput;
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
  thumbnailUrl: Scalars['String'];
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
  owner: GQLUser;
  type: GQLPollType;
  predefined: Scalars['Boolean'];
  createdAt: Maybe<Scalars['Float']>;
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

export type GQLPreset = {
  __typename?: 'Preset';
  title: Scalars['String'];
  thumbnailUrl: Scalars['String'];
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

export type GQLQrCodeDto = {
  shareLink: Scalars['String'];
};

export type GQLQuery = {
  __typename?: 'Query';
  product: GQLProduct;
  productsAll: Array<GQLProduct>;
  products: GQLPaginatedProducts;
  productsOffsetBased: Array<GQLProduct>;
  pollsAll: Array<GQLPoll>;
  getQRCode: GQLPoll;
  getPoll: GQLPoll;
  usersAll: Array<GQLUser>;
  refreshToken: Scalars['String'];
  checkToken: Scalars['Boolean'];
  thumbnailsAll: Array<GQLThumbnail>;
  optionsAll: Array<GQLDecision>;
  getOptionsForPoll: Array<GQLOption>;
  getDecision: GQLDecision;
  getDecisionsForPoll: Array<GQLDecision>;
  canDecide: Scalars['Boolean'];
  getActivity: Array<GQLActivity>;
  getRestaurantsPreset: Array<GQLOption>;
  genresAll: Array<GQLGenre>;
  addGenres: Scalars['Boolean'];
  getMoviesPreset: Array<GQLMoviesDto>;
  addMovies: Scalars['Boolean'];
  presetsAll: Array<GQLPreset>;
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


export type GQLQuerygetQRCodeArgs = {
  data: GQLQrCodeDto;
};


export type GQLQuerygetPollArgs = {
  data: GQLGetPollDto;
};


export type GQLQueryrefreshTokenArgs = {
  data: GQLRefreshTokenInput;
};


export type GQLQuerygetOptionsForPollArgs = {
  data: GQLGetOptionsForPollDto;
};


export type GQLQuerygetDecisionArgs = {
  data: GQLGetDecisionDto;
};


export type GQLQuerygetDecisionsForPollArgs = {
  data: GQLGetDecisionForPollDto;
};


export type GQLQuerycanDecideArgs = {
  data: GQLGetDecisionForUserAndPollDto;
};


export type GQLQuerygetActivityArgs = {
  data: GQLActivityInput;
};


export type GQLQuerygetRestaurantsPresetArgs = {
  data: GQLLocationDto;
};

export type GQLRefreshTokenInput = {
  refreshToken: Scalars['String'];
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
  refreshToken: Maybe<Scalars['String']>;
};

export type GQLUserInput = {
  name: Scalars['String'];
};
