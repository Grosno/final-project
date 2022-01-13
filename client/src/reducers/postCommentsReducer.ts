import produce from 'immer';
import { IPostCommentsState } from '../types/state';
import { IPostCommentsActionType } from '../types/actions';
import { HIDE_COMMENTS_LOADER, LOAD_POST_COMMENTS, SHOW_COMMENTS_LOADER } from '../constants/actions/postComments';

const initialState: IPostCommentsState = {
  postComments: [],
  totalComments: 0,
  isLoading: false,
};

const showCommentsLoader = (draft: IPostCommentsState) => {
  draft.isLoading = true;
  return draft;
};

const hideCommentsLoader = (draft: IPostCommentsState) => {
  draft.isLoading = false;
  return draft;
};

const loadPostComments = (draft: IPostCommentsState, postComments?: any) => {
  draft.postComments = postComments || [];
  return draft;
};

export default (state = initialState, action: IPostCommentsActionType) => produce(
  state,
  (draft: IPostCommentsState) => {
    switch (action.type) {
      case LOAD_POST_COMMENTS: return loadPostComments(draft, action.postComments);
      case SHOW_COMMENTS_LOADER: return showCommentsLoader(draft);
      case HIDE_COMMENTS_LOADER: return hideCommentsLoader(draft);
      default: return state;
    }
  },
);
