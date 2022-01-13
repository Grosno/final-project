import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'antd';
import './Paginator.scss';
import { IState } from '../../types/state';
import { changeCurrentPageAction } from '../../actions/PaginationAction';
import { ThemeContext } from '../contexts/DarkTheme';

interface IProps {
  total: number;
  currentPage: number;
  pageSize: number;
  changeCurrentPage: (page: number) => void,
}

const Paginator = ({
  total,
  currentPage,
  pageSize,
  changeCurrentPage,
}: IProps) => {
  const themeContext = useContext(ThemeContext);
  const handleSelectFormClick = (page: number) => {
    changeCurrentPage(page);
  };

  return (
    <div className={`paginator ${themeContext.darkTheme && 'paginator_dark-theme'}`}>
      <Pagination
        total={total}
        current={currentPage}
        pageSize={pageSize}
        showSizeChanger={false}
        onChange={handleSelectFormClick}
      />
    </div>
  );
};

export default connect(
  (state: IState) => ({
    total: state.pagination.total,
    currentPage: state.pagination.currentPage,
    pageSize: state.pagination.pageSize,
  }),
  (dispatch) => ({
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch),
  }),
)(Paginator);
