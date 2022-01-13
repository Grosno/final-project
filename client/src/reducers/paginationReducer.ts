import produce from 'immer';
import { IPaginationState } from '../types/state';
import { IPaginationActionType } from '../types/actions';
import { CHANGE_CURRENT_PAGE, CHANGE_PAGINATION_VALUE } from '../constants/actions/pagination';

const initialState: IPaginationState = {
  currentPage: 0,
  total: 0,
  pageSize: 0,
};

const changeCurrentPage = (draft: IPaginationState, page?: number) => {
  draft.currentPage = page || 0;
  return draft;
};

const changePaginationTotalValue = (draft: IPaginationState, totalItems?: number, pageSize?: number) => {
  draft.total = totalItems || 0;
  draft.pageSize = pageSize || 0;
  return draft;
};

export default (state = initialState, action: IPaginationActionType) => produce(
  state,
  (draft: IPaginationState) => {
    switch (action.type) {
      case CHANGE_CURRENT_PAGE: return changeCurrentPage(draft, action.currentPage);
      case CHANGE_PAGINATION_VALUE: return changePaginationTotalValue(draft, action.total, action.pageSize);
      default: return state;
    }
  },
);
