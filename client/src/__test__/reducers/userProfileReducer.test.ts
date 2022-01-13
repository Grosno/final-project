import userProfileReducer from '../../reducers/userProfileReducer';
import { EMPTY_STRING } from '../../constants/common';
import {
  HIDE_PROFILE_LOADER, LOAD_PROFILE_ERROR,
  LOAD_USER_PROFILE_SUCCESS,
  SHOW_PROFILE_LOADER,
} from '../../constants/actions/userProfile';

const initialState = {
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
    id: EMPTY_STRING,
    name: EMPTY_STRING,
    avatar: EMPTY_STRING,
    isAuthorized: false,
  },
  imageUrl: EMPTY_STRING,
};

describe('userProfileReducer test', () => {
  test('showLoader', () => {
    expect(userProfileReducer(initialState, { type: SHOW_PROFILE_LOADER }))
      .toEqual({
        ...initialState,
        isLoading: true,
      });
  });

  test('hideLoader', () => {
    expect(userProfileReducer(initialState, { type: HIDE_PROFILE_LOADER }))
      .toEqual({
        ...initialState,
        isLoading: false,
      });
  });

  test('loadCardsListSuccess', () => {
    const userData = {
      id: '111',
      picture: 'some url',
      firstName: 'firstName',
      dateOfBirth: 'lastName',
      email: 'some email',
      gender: 'any',
      lastName: 'lastName',
      phone: '09798789797',
      registerDate: '23.23.23',
      title: 'any',
    };
    expect(userProfileReducer(initialState, {
      type: LOAD_USER_PROFILE_SUCCESS,
      userData,
    }))
      .toEqual({
        ...initialState,
        userData,
      });
  });

  test('loadError', () => {
    const error = 'some error';
    expect(userProfileReducer(initialState, {
      type: LOAD_PROFILE_ERROR,
      error,
    }))
      .toEqual({
        ...initialState,
        error,
      });
  });
});
