import {
  IOwnerData, IPostComments, IRegistrationUser, IUserProfile, IUsersPosts,
} from './typesAPI';

export interface IState {
  users: ICardsListState;
  pagination: IPaginationState;
  userData: IUserProfileState;
  usersPosts: IUsersPostsState;
  location: ILocationState;
  authorization: IAuthorizationState;
  modalPosts: IModalPostsState;
  modalEditProfile: IModalEditProfilesState;
  postComments: IPostCommentsState;
  registration: IRegistrationState;
}

export interface ICardsListState {
  usersCards: Array<IOwnerData>;
  isLoading: boolean;
  pages: number;
  totalUsers: number;
}

export interface IPaginationState {
  currentPage: number;
  total: number;
  pageSize: number;
}

export interface IUserProfileState {
  userData: IUserProfile;
  isLoading: boolean;
  error: string;
  authorizedUser: IAuthorizedUserState;
  imageUrl: string;
}

export interface IAuthorizedUserState {
  id: string;
  name: string;
  avatar: string;
  isAuthorized: boolean;
}

export interface IUsersPostsState {
  usersPosts: Array<IUsersPosts>;
  isLoading: boolean;
  comments: number;
}

export interface ILocationState {
  currentLocation: string;
}

export interface IAuthorizationState {
  isLogged: boolean;
  userId: string;
}

export interface IModalPostsState {
  visible: boolean;
  currentPost: IUsersPosts;
}

export interface IModalEditProfilesState {
  visible: boolean;
}

export interface IPostCommentsState {
  postComments: Array<IPostComments>;
  totalComments: number;
  isLoading: boolean;
}

export interface IRegistrationState {
  newUser: IRegistrationUser;
}
