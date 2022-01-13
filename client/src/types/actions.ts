import {
  IAuthorizedUser, IOwnerData, IPostComments, IRegistrationUser, IUserProfile, IUsersPosts,
} from './typesAPI';

export interface IActionType {
  type: string;
}

export interface ICardsListActionType extends IActionType {
  usersCards?: Array<IOwnerData>;
  isLoading?: boolean;
  pages?: number;
  totalUsers?: number;
}

export interface IPaginationActionType extends IActionType {
  currentPage?: number;
  total?: number;
  pageSize?: number;
}

export interface IUserProfileActionType extends IActionType {
  userData?: IUserProfile;
  isLoading?: boolean;
  error?: string;
  authorizedUser?: IAuthorizedUser;
  imageUrl?: string;
}

// export interface IUpdateUserProfileActionType extends IActionType {
//   updatedUserData?: IUserProfile;
//   isLoading?: boolean;
// }

export interface IUsersPostsActionType extends IActionType {
  usersPosts?: Array<IUsersPosts>;
  isLoading?: boolean;
  comments?: number;
}

export interface ILocationActionType extends IActionType {
  currentLocation?: string;
}

export interface IModalActionType extends IActionType{
  visible?: boolean;
  currentPost?: IUsersPosts;
}

export interface IPostCommentsActionType extends IActionType {
  postComments?: Array<IPostComments>;
  totalComments?: number;
  isLoading?: boolean;
}

export interface INewUserActionType extends IActionType {
  newUser?: IRegistrationUser;
}
