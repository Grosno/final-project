import produce from 'immer';
import { IUserProfileState } from '../types/state';
import { IUserProfileActionType } from '../types/actions';
import {
  CHANGE_AUTHORIZED_USER, CLEAR_IMAGE_URL, CLEAR_USER_DATA,
  HIDE_PROFILE_LOADER, LOAD_IMAGE_URL_FROM_IMGBB,
  LOAD_PROFILE_ERROR,
  LOAD_USER_PROFILE_SUCCESS, LOGOUT_PROFILE,
  SHOW_PROFILE_LOADER, UPDATE_USER_DATA,
} from '../constants/actions/userProfile';
import { IAuthorizedUser, IUserProfile } from '../types/typesAPI';
import { EMPTY_STRING } from '../constants/common';

const initialState: IUserProfileState = {
  userData: {
    id: EMPTY_STRING,
    picture: EMPTY_STRING,
    firstName: EMPTY_STRING,
    dateOfBirth: EMPTY_STRING,
    email: EMPTY_STRING,
    gender: EMPTY_STRING,
    lastName: EMPTY_STRING,
    phone: EMPTY_STRING,
    registerDate: EMPTY_STRING,
    title: EMPTY_STRING,
  },
  isLoading: false,
  error: '',
  authorizedUser: {
    id: localStorage.getItem('ID') || EMPTY_STRING,
    name: localStorage.getItem('name') || EMPTY_STRING,
    avatar: localStorage.getItem('avatar') || EMPTY_STRING,
    isAuthorized: localStorage.getItem('isAuthorized') === 'true' || false,
  },
  imageUrl: EMPTY_STRING,
};

const showLoader = (draft: IUserProfileState) => {
  draft.isLoading = true;
  return draft;
};

const hideLoader = (draft: IUserProfileState) => {
  draft.isLoading = false;
  return draft;
};

const loadError = (draft: IUserProfileState, error?: string) => {
  draft.isLoading = false;
  draft.error = error || '';
  return draft;
};

const loadImageFromIMGGB = (draft: IUserProfileState, url?: string) => {
  draft.imageUrl = url || EMPTY_STRING;
  return draft;
};

const clearImageUrl = (draft: IUserProfileState) => {
  draft.imageUrl = EMPTY_STRING;
  return draft;
};

const logout = (draft: IUserProfileState) => {
  draft.authorizedUser.avatar = EMPTY_STRING;
  draft.authorizedUser.name = EMPTY_STRING;
  draft.authorizedUser.id = EMPTY_STRING;
  draft.authorizedUser.isAuthorized = false;
  return draft;
};

const changeAuthorizedUser = (draft: IUserProfileState, user?: IAuthorizedUser) => {
  draft.authorizedUser.name = user?.name || EMPTY_STRING;
  draft.authorizedUser.avatar = user?.avatar || EMPTY_STRING;
  draft.authorizedUser.id = user?.id || EMPTY_STRING;
  draft.authorizedUser.isAuthorized = user?.isAuthorized || false;
  return draft;
};

const clearUserData = (draft: IUserProfileState) => {
  draft.userData = { id: EMPTY_STRING } as IUserProfile;
  return draft;
};

const loadUserDataSuccess = (draft: IUserProfileState, data?: IUserProfile) => {
  draft.userData = {
    id: data?.id || EMPTY_STRING,
    picture: data?.picture || EMPTY_STRING,
    firstName: data?.firstName || EMPTY_STRING,
    dateOfBirth: data?.dateOfBirth || EMPTY_STRING,
    email: data?.email || EMPTY_STRING,
    gender: data?.gender || EMPTY_STRING,
    lastName: data?.lastName || EMPTY_STRING,
    phone: data?.phone || EMPTY_STRING,
    registerDate: data?.registerDate || EMPTY_STRING,
    title: data?.title || EMPTY_STRING,
  };
  draft.error = '';
  return draft;
};

export default (state = initialState, action:IUserProfileActionType) => produce(
  state,
  (draft: IUserProfileState) => {
    switch (action.type) {
      case SHOW_PROFILE_LOADER: return showLoader(draft);
      case HIDE_PROFILE_LOADER: return hideLoader(draft);
      case LOAD_USER_PROFILE_SUCCESS: return loadUserDataSuccess(draft, action.userData);
      case LOAD_PROFILE_ERROR: return loadError(draft, action.error);
      case LOAD_IMAGE_URL_FROM_IMGBB: return loadImageFromIMGGB(draft, action.imageUrl);
      case LOGOUT_PROFILE: return logout(draft);
      case CHANGE_AUTHORIZED_USER: return changeAuthorizedUser(draft, action.authorizedUser);
      case UPDATE_USER_DATA: return loadUserDataSuccess(draft, action.userData);
      case CLEAR_USER_DATA: return clearUserData(draft);
      case CLEAR_IMAGE_URL: return clearImageUrl(draft);
      default: return state;
    }
  },
);
