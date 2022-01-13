import produce from 'immer';
import { IRegistrationState } from '../types/state';
import { INewUserActionType } from '../types/actions';
import { CREATE_NEW_USER } from '../constants/actions/registration';
import { IRegistrationUser } from '../types/typesAPI';
import { EMPTY_STRING } from '../constants/common';

const initialState: IRegistrationState = {
  newUser: {
    id: EMPTY_STRING,
  } as IRegistrationUser,
};

const createNewUser = (draft: IRegistrationState, newUser?: IRegistrationUser) => {
  draft.newUser = newUser || {} as IRegistrationUser;
  return draft;
};

export default (state = initialState, action: INewUserActionType) => produce(
  state,
  (draft: IRegistrationState) => {
    switch (action.type) {
      case CREATE_NEW_USER: return createNewUser(draft, action.newUser);
      default: return state;
    }
  },
);
