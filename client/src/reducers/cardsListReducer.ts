import produce from 'immer';
import { ICardsListState } from '../types/state';
import { ICardsListActionType } from '../types/actions';
import { IOwnerData } from '../types/typesAPI';
import { HIDE_CARDS_LOADER, LOAD_CARDS_LIST_SUCCESS, SHOW_CARDS_LOADER } from '../constants/actions/cardsList';

const initialState: ICardsListState = {
  usersCards: [],
  isLoading: false,
  pages: 0,
  totalUsers: 0,
};

const showLoader = (draft: ICardsListState) => {
  draft.isLoading = true;
  return draft;
};

const hideLoader = (draft: ICardsListState) => {
  draft.isLoading = false;
  return draft;
};

const loadCardsListSuccess = (
  draft: ICardsListState,
  users?: Array<IOwnerData>,
  pages?: number,
  totalUsers?: number,
) => {
  draft.usersCards = users || [];
  draft.pages = pages || 0;
  draft.totalUsers = totalUsers || 0;
  return draft;
};

const loadCardsList = (state = initialState, action: ICardsListActionType) => produce(
  state,
  (draft: ICardsListState) => {
    switch (action.type) {
      case SHOW_CARDS_LOADER: return showLoader(draft);
      case HIDE_CARDS_LOADER: return hideLoader(draft);
      case LOAD_CARDS_LIST_SUCCESS:
        return loadCardsListSuccess(draft, action.usersCards, action.pages, action.totalUsers);
      default: return state;
    }
  },
);

export default loadCardsList;
