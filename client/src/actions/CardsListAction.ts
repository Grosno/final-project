import { Dispatch } from 'redux';
import { ICardsListActionType } from '../types/actions';
import { IOwnerData } from '../types/typesAPI';
import { HIDE_CARDS_LOADER, LOAD_CARDS_LIST_SUCCESS, SHOW_CARDS_LOADER } from '../constants/actions/cardsList';
import { getUsersData } from '../components/api/dummyAPI';

const showLoader = (): ICardsListActionType => ({
  type: SHOW_CARDS_LOADER,
});

const hideLoader = (): ICardsListActionType => ({
  type: HIDE_CARDS_LOADER,
});

const loadCardsListSuccess = (users: Array<IOwnerData>, countOfPages: number): ICardsListActionType => ({
  type: LOAD_CARDS_LIST_SUCCESS,
  usersCards: users,
  pages: countOfPages,

});

export const loadCardsList = (page: number, pageSize: number) => (dispatch: Dispatch) => {
  dispatch(showLoader());
  getUsersData(page, pageSize)
    .then((response) => dispatch(loadCardsListSuccess(response.data, response.total)))
    .finally(() => dispatch(hideLoader()));
};
