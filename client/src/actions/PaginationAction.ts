import { IPaginationActionType } from '../types/actions';
import { CHANGE_CURRENT_PAGE, CHANGE_PAGINATION_VALUE } from '../constants/actions/pagination';

export const changeCurrentPageAction = (page: number): IPaginationActionType => ({
  type: CHANGE_CURRENT_PAGE,
  currentPage: page,
});

export const changePaginationValueAction = (totalItems: number, pageSize: number): IPaginationActionType => ({
  type: CHANGE_PAGINATION_VALUE,
  total: totalItems,
  pageSize,
});
