import { Dispatch } from 'redux';
import { IUserProfileActionType } from '../types/actions';
import {
  CHANGE_AUTHORIZED_USER, CLEAR_IMAGE_URL, CLEAR_USER_DATA,
  HIDE_PROFILE_LOADER, LOAD_IMAGE_URL_FROM_IMGBB,
  LOAD_PROFILE_ERROR,
  LOAD_USER_PROFILE_SUCCESS, LOGOUT_PROFILE,
  SHOW_PROFILE_LOADER, UPDATE_USER_DATA,
} from '../constants/actions/userProfile';
import { IAuthorizedUser, IUpdatedUserData, IUserProfile } from '../types/typesAPI';
import { getUserProfile, updateUserProfile } from '../components/api/dummyAPI';
import { uploadImage } from '../components/api/imgbbAPI';

const showLoader = (): IUserProfileActionType => ({
  type: SHOW_PROFILE_LOADER,
});

const hideLoader = (): IUserProfileActionType => ({
  type: HIDE_PROFILE_LOADER,
});

export const loadErrorAction = (error?: string): IUserProfileActionType => ({
  type: LOAD_PROFILE_ERROR,
  error,
});

export const logoutAction = (): IUserProfileActionType => ({
  type: LOGOUT_PROFILE,
});

export const changeAuthorizedUserAction = (user: IAuthorizedUser): IUserProfileActionType => ({
  type: CHANGE_AUTHORIZED_USER,
  authorizedUser: user,
});

export const clearUserData = (): IUserProfileActionType => ({
  type: CLEAR_USER_DATA,
});

export const clearImageUrl = (): IUserProfileActionType => ({
  type: CLEAR_IMAGE_URL,
});

const updateUserData = (updatedData: IUserProfile): IUserProfileActionType => ({
  type: UPDATE_USER_DATA,
  userData: updatedData,
});

const loadUserDataSuccess = (data: IUserProfile): IUserProfileActionType => ({
  type: LOAD_USER_PROFILE_SUCCESS,
  userData: data,
});

const loadImageUrlFromIMGBB = (newImage: string): IUserProfileActionType => ({
  type: LOAD_IMAGE_URL_FROM_IMGBB,
  imageUrl: newImage,
});

export const loadUserData = (id: string) => (dispatch: Dispatch) => {
  dispatch(showLoader());
  getUserProfile(id)
    .then((response: IUserProfile) => (JSON.stringify(response).includes('error')
      ? dispatch(loadErrorAction(response.error)) : dispatch(loadUserDataSuccess(response))))
    .catch((error) => dispatch(loadErrorAction(error)))
    .finally(() => dispatch(hideLoader()));
};

export const loadUpdatedUserDataAction = (updatedData: IUpdatedUserData, id: string) => (dispatch: Dispatch) => {
  dispatch(showLoader());
  updateUserProfile(id, updatedData)
    .then((response: IUserProfile) => dispatch(updateUserData(response)))
    .finally(() => dispatch(hideLoader()));
};

export const uploadImageToIMGBBAction = (data: FormData) => (dispatch: Dispatch) => {
  uploadImage(data)
    .then((response) => dispatch(loadImageUrlFromIMGBB(response.data.image.url)));
};
