import { Dispatch } from 'redux';
import { postNewUser } from '../components/api/dummyAPI';
import { IRegistrationUser } from '../types/typesAPI';
import { INewUserActionType } from '../types/actions';
import { CREATE_NEW_USER } from '../constants/actions/registration';

const createNewUserSuccess = (newUser: IRegistrationUser): INewUserActionType => ({
  type: CREATE_NEW_USER,
  newUser,
});

export const registrationAction = (user: IRegistrationUser) => (dispatch: Dispatch) => {
  postNewUser(user)
    .then((response) => dispatch(createNewUserSuccess(response)));
};
