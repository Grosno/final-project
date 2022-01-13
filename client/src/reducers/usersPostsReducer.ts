import produce from 'immer';
import { IUsersPostsState } from '../types/state';
import { IUsersPostsActionType } from '../types/actions';
import { IUsersPosts } from '../types/typesAPI';
import { HIDE_POSTS_LOADER, LOAD_USERS_POST_SUCCESS, SHOW_POSTS_LOADER } from '../constants/actions/usersPosts';

const initialState: IUsersPostsState = {
  usersPosts: [],
  isLoading: false,
  comments: 0,
};

const showLoader = (draft: IUsersPostsState) => {
  draft.isLoading = true;
  return draft;
};

const hideLoader = (draft: IUsersPostsState) => {
  draft.isLoading = false;
  return draft;
};

const loadUsersPostsSuccess = (draft: IUsersPostsState, posts?: Array<IUsersPosts>, countOfComments?: number) => {
  draft.usersPosts = posts || [];
  draft.comments = countOfComments || 0;
  return draft;
};

export default (state = initialState, action: IUsersPostsActionType) => produce(
  state,
  (draft: IUsersPostsState) => {
    switch (action.type) {
      case SHOW_POSTS_LOADER: return showLoader(draft);
      case HIDE_POSTS_LOADER: return hideLoader(draft);
      case LOAD_USERS_POST_SUCCESS: return loadUsersPostsSuccess(draft, action.usersPosts, action.comments);
      default: return state;
    }
  },
);
