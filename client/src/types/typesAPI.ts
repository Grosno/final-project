export interface IApiResponse {
  data: Array<IOwnerData>; // (Model)
  total: number; // (total items in DB)
  page: number; // (current page)
  limit: number; // (number of items on page)
}

export interface IOwnerData {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface IResponseError {
  error: string
}

export interface IUserProfile {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  registerDate: string;
  phone: string;
  picture: string;
  error?: string;
}

export interface IAuthorizedUser {
  id: string;
  name: string;
  avatar: string;
  isAuthorized: boolean;
}

export interface IUsersPosts {
  id: string;
  text: string;
  image: string;
  likes: number;
  tags: Array<string>;
  publishDate: string;
  owner: IOwnerData;
}

export interface IPostComments {
  id: string;
  message: string;
  owner: IOwnerData;
  post: string;
  publishDate: string;
}

export interface IRegistrationUser {
  id?: string;
  title?: string;
  firstName: string;
  lastName: string;
  gender?: string;
  email: string;
  dateOfBirth?: string;
  phone?: string;
  picture?: string;
  form_button?: undefined;
}

export interface IUpdatedUserData {
  id?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  phone?: string;
  picture?: string;
  registerDate?: string;
  title?: string;
}

export interface ITest {
  login?: string,
  password?: string,
}
