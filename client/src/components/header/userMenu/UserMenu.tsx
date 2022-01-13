import React, { useContext } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTranslation } from 'react-i18next';
import { EMPTY_STRING } from '../../../constants/common';
import { IAuthorizedUser } from '../../../types/typesAPI';
import { IState } from '../../../types/state';
import { changeCurrentPageAction } from '../../../actions/PaginationAction';
import { clearUserData, logoutAction } from '../../../actions/UserProfileAction';
import { ThemeContext } from '../../contexts/DarkTheme';
import '../../../locale/i18next';

interface IProps {
  authorizedUser: IAuthorizedUser,
  changeCurrentPage: (page: number) => void,
  logoutProfile: () => void,
  clearUserInfo: () => void,
}

const UserMenu = ({
  authorizedUser, changeCurrentPage, logoutProfile, clearUserInfo,
}: IProps) => {
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  const handleLogoutClick = () => {
    localStorage.removeItem('ID');
    localStorage.removeItem('name');
    localStorage.removeItem('avatar');
    localStorage.removeItem('isAuthorized');
    logoutProfile();
    clearUserInfo();
  };

  const handleClickMenu = () => {
    changeCurrentPage(1);
  };

  return (
    <div className="header__authorization">
      <a
        className="header__authorization__logged"
        href={`#/user/${authorizedUser.id}`}
        onClick={handleClickMenu}
      >
        {authorizedUser.avatar === EMPTY_STRING
          ? <Avatar size="default" icon={<UserOutlined />} className="default-avatar" />
          : <div className="user-avatar"><img src={authorizedUser.avatar} alt="" /></div>}
        {authorizedUser.name}
      </a>
      <a
        className={`
          header__authorization__logout 
          ${themeContext.darkTheme && 'header__authorization__logout_dark-theme'}`}
        onClick={handleLogoutClick}
        role="presentation"
      >
        {t('header.logout')}
      </a>
    </div>
  );
};

export default connect(
  (state: IState) => ({
    authorizedUser: state.userData.authorizedUser,
  }),
  (dispatch) => ({
    changeCurrentPage: bindActionCreators(changeCurrentPageAction, dispatch),
    logoutProfile: bindActionCreators(logoutAction, dispatch),
    clearUserInfo: bindActionCreators(clearUserData, dispatch),
  }),
)(UserMenu);
