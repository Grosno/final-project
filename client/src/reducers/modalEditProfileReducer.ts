import produce from 'immer';
import { IModalEditProfilesState } from '../types/state';
import { IModalActionType } from '../types/actions';
import { HIDE_MODAL_EDIT, SHOW_MODAL_EDIT } from '../constants/actions/modal';

const initialState: IModalEditProfilesState = {
  visible: false,
};

const showModalEditProfile = (draft: IModalEditProfilesState) => {
  draft.visible = true;
  return draft;
};

const hideModalEditProfile = (draft: IModalEditProfilesState) => {
  draft.visible = false;
  return draft;
};

export default (state = initialState, action: IModalActionType) => produce(
  state,
  (draft: IModalEditProfilesState) => {
    switch (action.type) {
      case SHOW_MODAL_EDIT: return showModalEditProfile(draft);
      case HIDE_MODAL_EDIT: return hideModalEditProfile(draft);
      default: return state;
    }
  },
);
