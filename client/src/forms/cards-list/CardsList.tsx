import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CardsList.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { IAuthorizedUser, IOwnerData } from '../../types/typesAPI';
import { IState } from '../../types/state';
import { loadCardsList } from '../../actions/CardsListAction';
import { changeCurrentPageAction, changePaginationValueAction } from '../../actions/PaginationAction';
import { loadLocationAction } from '../../actions/LocationAction';
import { ThemeContext } from '../../components/contexts/DarkTheme';
import { PopUpComment } from '../../components/popup-comment/PopUpComment';
import PreLoader from '../../components/pre-loader/PreLoader';

interface IProps {
  users: Array<IOwnerData>;
  isLoading: boolean;
  totalUsers: number;
  currentPage: number;
  authorizedUser: IAuthorizedUser;
  loadCards: (currentPage: number, pageSize: number) => void;
  changePagination: (totalValue: number, pageSize: number) => void;
  currentLocation: (location: string) => void;
  changeCurrentPage: (page: number) => void,
}

const CardsList = ({
  users,
  isLoading,
  totalUsers,
  currentPage,
  loadCards,
  changePagination,
  currentLocation,
  authorizedUser,
  changeCurrentPage,
}: IProps) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    loadCards(currentPage - 1, 6);
  }, [currentPage]);

  useEffect(() => {
    changePagination(totalUsers, 6);
  }, [totalUsers]);

  useEffect(() => {
    currentLocation(authorizedUser.isAuthorized
      ? t('locationPath.usersCardsAuthorized') : t('locationPath.usersCards'));
  }, [t]);

  const handleClickUserCard = () => {
    changeCurrentPage(1);
  };

  return (
    <div className="user-form">
      {isLoading ? (
        <PreLoader />
      ) : (
        <div className="user-list user">
          {users?.map((elem: IOwnerData) => (
            <Link
              className={`user__link ${themeContext.darkTheme && 'user__link_dark-theme'}`}
              to={`/user/${elem.id}`}
              onClick={handleClickUserCard}
            >
              <div className={`user__card ${themeContext.darkTheme && 'user__card_dark-theme'}`}>
                <div className="user__card__picture">
                  {elem.picture === undefined
                    ? <Avatar shape="square" size={200} icon={<UserOutlined />} className="user__card__picture__alt" />
                    : <img src={`${elem.picture}`} alt="" />}
                </div>
                <div className={`user__card__name ${themeContext.darkTheme && 'user__card__name_dark-theme'}`}>
                  <PopUpComment comment={elem.id}>
                    {`${elem.title !== undefined ? elem.title : ''} ${elem.firstName} ${elem.lastName}`}
                  </PopUpComment>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default connect(
  (state: IState) => ({
    users: state.users.usersCards,
    isLoading: state.users.isLoading,
    totalUsers: state.users.pages,
    currentPage: state.pagination.currentPage,
    authorizedUser: state.userData.authorizedUser,
  }),
  (dispatch) => ({
    // loadCards: bindActionCreators(loadCardsListProxyServer, dispatch),
    loadCards: bindActionCreators(loadCardsList, dispatch),
    changePagination: bindActionCreators(changePaginationValueAction, dispatch),
    currentLocation: bindActionCreators(loadLocationAction, dispatch),
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch),
  }),
)(CardsList);
