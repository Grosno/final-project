import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Form, Input,
} from 'antd';
import { UserOutlined } from '@ant-design/icons/lib';
import './LogIn.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IState } from '../../types/state';
import { loadLocationAction } from '../../actions/LocationAction';
import { EMPTY_STRING, urlPath } from '../../constants/common';
import {
  changeAuthorizedUserAction,
  clearUserData,
  loadErrorAction,
  loadUserData,
} from '../../actions/UserProfileAction';
import { IAuthorizedUser, IUserProfile } from '../../types/typesAPI';
import { ThemeContext } from '../../components/contexts/DarkTheme';
import '../../locale/i18next';

interface IProps {
  currentLocation: (location: string) => void;
  loadUserData: (id: string) => void;
  userData: IUserProfile;
  error: string,
  authorizedUser: IAuthorizedUser,
  changeAuthorizedUser: (user: IAuthorizedUser) => void,
  clearUserProfile: () => void,
  clearError: (error: string) => void,
}

const LogInForm = ({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  currentLocation, error, loadUserData, authorizedUser, userData, changeAuthorizedUser, clearUserProfile, clearError,
}: IProps) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const [btnLoading, setBtnLoading] = useState(false);
  const [input, setInput] = useState('');
  const [loginId, setLoginId] = useState('');
  const [canLogin, setCanLogin] = useState(false);

  useEffect(() => {
    currentLocation(t('locationPath.login'));
  }, [t]);

  useEffect(() => {
    if (loginId !== EMPTY_STRING) {
      setBtnLoading(true);
      loadUserData(loginId);
      setCanLogin(true);
    }
  }, [loginId]);

  useEffect(() => {
    clearUserProfile();
  }, []);

  useEffect(() => {
    if (userData.id !== EMPTY_STRING && canLogin) {
      localStorage.setItem('ID', loginId);
      localStorage.setItem('name', userData.firstName);
      localStorage.setItem('avatar', userData.picture);
      localStorage.setItem('isAuthorized', JSON.stringify(true));
      changeAuthorizedUser({
        id: userData.id,
        name: userData.firstName,
        avatar: userData.picture,
        isAuthorized: true,
      });
    }
  }, [canLogin, userData]);

  const handleClickLogin = () => {
    setLoginId(input);
  };

  useEffect(() => {
    if (error !== '') {
      localStorage.removeItem('isAuthorized');
      localStorage.removeItem('ID');
      localStorage.removeItem('name');
      localStorage.removeItem('avatar');
      changeAuthorizedUser({
        id: EMPTY_STRING,
        name: EMPTY_STRING,
        avatar: EMPTY_STRING,
        isAuthorized: false,
      });
      setBtnLoading(false);
    }
    clearError(EMPTY_STRING);
  }, [error]);

  return (
    <div className={`form-login ${themeContext.darkTheme && 'form-login_dark-theme'}`}>
      <div className="form-login__title">{t('login.title')}</div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Form
        className="form-login__form"
        name="login-form"
      >
        <span className="form-login__input-title">ID</span>
        <Form.Item
          name="user-id"
          label=""
          rules={[
            {
              required: true,
              message: t('login.validate.inputId'),
            },
            {
              pattern: new RegExp(/^[0-9A-z]*$/, 'g'),
              message: t('login.validate.errorId'),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={t('login.placeholder')}
            onChange={(event) => setInput(event.target.value)}
          />
        </Form.Item>
        <Form.Item name="form-button">
          <Button
            type="primary"
            htmlType="submit"
            className="form-login__button"
            onClick={handleClickLogin}
            loading={btnLoading}
          >
            {t('login.btnLogin')}
          </Button>
        </Form.Item>
      </Form>
      <div className="form-login__footer-text">
        {t('login.anyAccount')}
        {' '}
        <a href={`#/${urlPath.REGISTRATION_PATH}`}>{t('login.register')}</a>
      </div>
      {authorizedUser.isAuthorized && <Redirect to={`/user/${localStorage.getItem('ID') || loginId}`} />}
    </div>
  );
};

export default connect(
  (state: IState) => ({
    error: state.userData.error,
    userData: state.userData.userData,
    authorizedUser: state.userData.authorizedUser,
  }),
  (dispatch) => ({
    currentLocation: bindActionCreators(loadLocationAction, dispatch),
    loadUserData: bindActionCreators(loadUserData, dispatch),
    changeAuthorizedUser: bindActionCreators(changeAuthorizedUserAction, dispatch),
    clearUserProfile: bindActionCreators(clearUserData, dispatch),
    clearError: bindActionCreators(loadErrorAction, dispatch),
  }),
)(LogInForm);
