import { Dispatch } from 'redux';
import { getCommentsByPost } from '../components/api/dummyAPI';
import { IPostCommentsActionType } from '../types/actions';
import { HIDE_COMMENTS_LOADER, LOAD_POST_COMMENTS, SHOW_COMMENTS_LOADER } from '../constants/actions/postComments';

const showCommentsLoader = (): IPostCommentsActionType => ({
  type: SHOW_COMMENTS_LOADER,
});

const hideCommentsLoader = (): IPostCommentsActionType => ({
  type: HIDE_COMMENTS_LOADER,
});

const loadPostCommentsAction = (comments: any): IPostCommentsActionType => ({
  type: LOAD_POST_COMMENTS,
  postComments: comments,
});

export const loadPostComments = (page: number, limit: number, id: string) => (dispatch: Dispatch) => {
  dispatch(showCommentsLoader());
  getCommentsByPost(page, limit, id)
    .then((response) => dispatch(loadPostCommentsAction(response.data)))
    .finally(() => dispatch(hideCommentsLoader()));
};
