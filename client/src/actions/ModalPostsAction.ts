import { IModalActionType } from '../types/actions';
import { HIDE_MODAL_POSTS, SHOW_MODAL_POSTS } from '../constants/actions/modal';
import { IUsersPosts } from '../types/typesAPI';

export const showModalPostsAction = (post: IUsersPosts): IModalActionType => ({
  type: SHOW_MODAL_POSTS,
  currentPost: post,
});

export const hideModalPostsAction = (): IModalActionType => ({
  type: HIDE_MODAL_POSTS,
});
