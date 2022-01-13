import { Dispatch } from 'redux';
import { IUsersPostsActionType } from '../types/actions';
import { IUsersPosts } from '../types/typesAPI';
import { getPostsByUser, getUsersPosts } from '../components/api/dummyAPI';
import {
  HIDE_POSTS_LOADER,
  LOAD_USERS_POST_SUCCESS,
  SHOW_POSTS_LOADER,
} from '../constants/actions/usersPosts';

const showLoader = (): IUsersPostsActionType => ({
  type: SHOW_POSTS_LOADER,
});

const hideLoader = (): IUsersPostsActionType => ({
  type: HIDE_POSTS_LOADER,
});

const loadUsersPostsSuccess = (users: Array<IUsersPosts>, countOfComments: number): IUsersPostsActionType => ({
  type: LOAD_USERS_POST_SUCCESS,
  usersPosts: users,
  comments: countOfComments,
});

export const loadUsersPostsAction = (page: number, pageSize: number) => (dispatch: Dispatch) => {
  dispatch(showLoader());
  getUsersPosts(page, pageSize)
    .then((response) => dispatch(loadUsersPostsSuccess(response.data, response.total)))
    .finally(() => dispatch(hideLoader()));
};

export const loadPostsByUserIdAction = (page: number, limit: number, id: string) => (dispatch: Dispatch) => {
  dispatch(showLoader());
  getPostsByUser(page, limit, id)
    .then((response) => dispatch(loadUsersPostsSuccess(response.data, response.total)))
    .finally(() => dispatch(hideLoader()));
};
