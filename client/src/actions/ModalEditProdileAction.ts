import { IModalActionType } from '../types/actions';
import { HIDE_MODAL_EDIT, SHOW_MODAL_EDIT } from '../constants/actions/modal';

export const showModalEditProfilesAction = (): IModalActionType => ({
  type: SHOW_MODAL_EDIT,
});

export const hideModalEditProfilesAction = (): IModalActionType => ({
  type: HIDE_MODAL_EDIT,
});
