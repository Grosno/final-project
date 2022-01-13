import cardsListReducer from '../../reducers/cardsListReducer';
import { HIDE_CARDS_LOADER, LOAD_CARDS_LIST_SUCCESS, SHOW_CARDS_LOADER } from '../../constants/actions/cardsList';

const initialState = {
  usersCards: [],
  isLoading: false,
  pages: 0,
  totalUsers: 0,
};

describe('cardsListReducer test', () => {
  test('showLoader', () => {
    expect(cardsListReducer(initialState, { type: SHOW_CARDS_LOADER }))
      .toEqual({
        ...initialState,
        isLoading: true,
      });
  });

  test('hideLoader', () => {
    expect(cardsListReducer(initialState, { type: HIDE_CARDS_LOADER }))
      .toEqual({
        ...initialState,
        isLoading: false,
      });
  });

  test('loadCardsListSuccess', () => {
    const usersCards = [{
      id: '111',
      title: 'any',
      firstName: 'some firstName',
      lastName: 'some lastName',
      picture: 'some url',
    }];
    const pages = 0;
    const totalUsers = 1;
    expect(cardsListReducer(initialState, {
      type: LOAD_CARDS_LIST_SUCCESS,
      usersCards,
      pages,
      totalUsers,
    }))
      .toEqual({
        ...initialState,
        usersCards,
        pages,
        totalUsers,
      });
  });
});
