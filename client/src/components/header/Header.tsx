import React, { useContext } from 'react';
import './Header.scss';
import { ReadOutlined, TeamOutlined } from '@ant-design/icons/lib';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import logo from '../../images/logo.png';
import { ICON_SIZE, urlPath } from '../../constants/common';
import { IState } from '../../types/state';
import { changeCurrentPageAction } from '../../actions/PaginationAction';
import { IAuthorizedUser } from '../../types/typesAPI';
import { ThemeContext } from '../contexts/DarkTheme';
import '../../locale/i18next';
import UserMenu from './userMenu/UserMenu';
import LoginMenu from './loginMenu/LoginMenu';

interface IProps {
  changeCurrentPage: (page: number) => void,
  authorizedUser: IAuthorizedUser,
}

const Header = ({ changeCurrentPage, authorizedUser }: IProps) => {
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleClickMenu = () => {
    changeCurrentPage(1);
  };

  return (
    <div className={`header ${themeContext.darkTheme && 'header_dark-theme'}`}>
      {/* <div className="header__burger"><MenuOutlined size={60} /></div> */}
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="Logo" className="header__logo__icon" />
          <div className="header__logo__title">Delta World</div>
        </div>
        <div className="header__menu">
          <TeamOutlined className="header__menu__icon-users" style={{ fontSize: ICON_SIZE }} />
          <a className="header__menu__title" href={`#/${urlPath.USERS_PATH}`} onClick={handleClickMenu}>
            {t('header.users')}
          </a>
          <ReadOutlined className="header__menu__icon-posts" style={{ fontSize: ICON_SIZE }} />
          <a className="header__menu__title" href={`#/${urlPath.POSTS_PATH}`} onClick={handleClickMenu}>
            {t('header.posts')}
          </a>
        </div>
        {authorizedUser.isAuthorized ? (
          <UserMenu />
        ) : (
          <LoginMenu />
        )}
      </div>
      {!authorizedUser.isAuthorized && <Redirect to={`/${urlPath.LOGIN_PATH}`} />}
    </div>
  );
};

export default connect(
  (state: IState) => ({
    authorizedUser: state.userData.authorizedUser,
  }),
  (dispatch) => ({
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch),
  }),
)(Header);
