import produce from 'immer';
import { IModalPostsState } from '../types/state';
import { IModalActionType } from '../types/actions';
import { HIDE_MODAL_POSTS, SHOW_MODAL_POSTS } from '../constants/actions/modal';
import { EMPTY_STRING } from '../constants/common';
import { IUsersPosts } from '../types/typesAPI';

const initialState: IModalPostsState = {
  visible: false,
  currentPost: {
    id: EMPTY_STRING,
    image: EMPTY_STRING,
    text: EMPTY_STRING,
    publishDate: EMPTY_STRING,
    likes: 0,
    tags: [],
    owner: {
      lastName: EMPTY_STRING,
      firstName: EMPTY_STRING,
      title: EMPTY_STRING,
      picture: EMPTY_STRING,
      id: EMPTY_STRING,
    },
  },
};

const showModalPosts = (draft: IModalPostsState, post?: IUsersPosts) => {
  console.log('showModalPosts отработал');
  draft.visible = true;
  draft.currentPost = post || {} as IUsersPosts;
  return draft;
};

const hideModalPosts = (draft: IModalPostsState) => {
  draft.visible = false;
  draft.currentPost = {} as IUsersPosts;
  return draft;
};

export default (state = initialState, action: IModalActionType) => produce(
  state,
  (draft: IModalPostsState) => {
    switch (action.type) {
      case SHOW_MODAL_POSTS: return showModalPosts(draft, action.currentPost);
      case HIDE_MODAL_POSTS: return hideModalPosts(draft);
      default: return state;
    }
  },
);
