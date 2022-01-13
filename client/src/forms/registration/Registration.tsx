import React, { useContext, useEffect } from 'react';
import {
  Button, DatePicker, Form, Input, Radio,
} from 'antd';
import './Registration.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons/lib';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IState } from '../../types/state';
import { loadLocationAction } from '../../actions/LocationAction';
import { EMPTY_STRING, urlPath } from '../../constants/common';
import { IAuthorizedUser, IRegistrationUser } from '../../types/typesAPI';
import { registrationAction } from '../../actions/RegistrationAction';
import { changeAuthorizedUserAction } from '../../actions/UserProfileAction';
import { ThemeContext } from '../../components/contexts/DarkTheme';
import '../../locale/i18next';

interface IProps {
  newUser: IRegistrationUser;
  currentLocation: (location: string) => void;
  registration: (user: IRegistrationUser) => void;
  changeAuthorizedUser: (user: IAuthorizedUser) => void,
}

const Registration = ({
  newUser, currentLocation, registration, changeAuthorizedUser,
}: IProps) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    currentLocation(t('locationPath.registration'));
  }, [t]);

  const handleClickRegistrationButton = (values: IRegistrationUser) => {
    delete values.form_button;
    registration(values);
  };

  useEffect(() => {
    if (newUser.id !== EMPTY_STRING) {
      localStorage.setItem('ID', newUser.id || EMPTY_STRING);
      localStorage.setItem('name', newUser.firstName);
      localStorage.setItem('avatar', newUser.picture || EMPTY_STRING);
      localStorage.setItem('isAuthorized', JSON.stringify(true));
      changeAuthorizedUser({
        id: newUser.id || EMPTY_STRING,
        name: newUser.firstName,
        avatar: newUser.picture || EMPTY_STRING,
        isAuthorized: true,
      });
    }
  }, [newUser]);

  return (
    <div className={`form-registration ${themeContext.darkTheme && 'form-registration_dark-theme'}`}>
      <div className="form-registration__title">
        {t('registerForm.title')}
      </div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Form
        className="form-registration__form"
        name="registration-form"
        onFinish={(values) => handleClickRegistrationButton(values)}
      >
        <span className="form-registration__input-title">
          {t('registerForm.fields.firstName')}
        </span>
        <Form.Item
          name="firstName"
          hasFeedback
          rules={[
            {
              required: true,
              message: t('registerForm.validate.firstName.inputName'),
            },
            {
              min: 2,
              max: 50,
              message: t('registerForm.validate.firstName.errorLength'),
            },
            {
              pattern: new RegExp(/^[A-zА-я]*$/, 'g'),
              message: t('registerForm.validate.firstName.errorLetter'),
            },
            {
              whitespace: true,
              message: t('registerForm.validate.firstName.errorSpace'),
            },
          ]}
        >
          <Input placeholder={t('registerForm.placeholder.inputName')} />
        </Form.Item>
        <span className="form-registration__input-title">{t('registerForm.fields.lastName')}</span>
        <Form.Item
          name="lastName"
          hasFeedback
          rules={[
            {
              required: true,
              message: t('registerForm.validate.lastName.inputLastName'),
            },
            {
              min: 2,
              max: 50,
              message: t('registerForm.validate.lastName.errorLength'),
            },
            {
              pattern: new RegExp(/^[A-zА-я]*$/, 'g'),
              message: t('registerForm.validate.lastName.errorLetter'),
            },
            {
              whitespace: true,
              message: t('registerForm.validate.lastName.errorSpace'),
            },
          ]}
        >
          <Input placeholder={t('registerForm.placeholder.inputLastName')} />
        </Form.Item>
        <span className="form-registration__input-title">{t('registerForm.fields.gender')}</span>
        <Form.Item
          name="gender"
          hasFeedback
          className="form-registration__form__gender"
          rules={[
            {
              required: true,
              message: t('registerForm.validate.gender'),
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male" style={themeContext.darkTheme ? { color: 'ghostwhite' } : {}}>
              {t('registerForm.placeholder.genderMale')}
            </Radio>
            <Radio value="female" style={themeContext.darkTheme ? { color: 'ghostwhite' } : {}}>
              {t('registerForm.placeholder.genderFemale')}
            </Radio>
          </Radio.Group>
        </Form.Item>
        <span className="form-registration__input-title">{t('registerForm.fields.dateOfBirth')}</span>
        <Form.Item
          name="dateOfBirth"
          hasFeedback
          rules={[
            {
              required: true,
              message: t('registerForm.validate.dateOfBirth'),
            },
          ]}
        >
          <DatePicker locale={locale} placeholder={t('registerForm.placeholder.chooseDate')} />
        </Form.Item>
        <span className="form-registration__input-title">E-mail</span>
        <Form.Item
          name="email"
          hasFeedback
          rules={[
            {
              type: 'email',
              message: t('registerForm.validate.email.errorEmail'),
            },
            {
              required: true,
              message: t('registerForm.validate.email.inputEmail'),
            },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>
        <span className="form-registration__input-title">{t('registerForm.fields.phone')}</span>
        <Form.Item
          name="phone"
          hasFeedback
          rules={[
            {
              required: true,
              message: t('registerForm.validate.phone.inputPhone'),
            },
            {
              pattern: new RegExp(/^[0-9]*$/, 'g'),
              message: t('registerForm.validate.phone.errorLetter'),
            },
            {
              whitespace: true,
              message: t('registerForm.validate.phone.errorSpace'),
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} />
        </Form.Item>
        <Form.Item name="form_button">
          <Button
            type="primary"
            htmlType="submit"
            className="form-registration__button"
          >
            {t('registerForm.buttonRegister')}
          </Button>
        </Form.Item>
      </Form>
      <div className="form-registration__footer-text">
        {t('registerForm.haveAnAccount')}
        {' '}
        <a href={`#/${urlPath.LOGIN_PATH}`}>{t('registerForm.toLogin')}</a>
      </div>
      {newUser.id !== '' && <Redirect to={`/user/${newUser.id}`} />}
    </div>
  );
};

export default connect(
  (state: IState) => ({
    newUser: state.registration.newUser,
  }),
  (dispatch) => ({
    currentLocation: bindActionCreators(loadLocationAction, dispatch),
    registration: bindActionCreators(registrationAction, dispatch),
    changeAuthorizedUser: bindActionCreators(changeAuthorizedUserAction, dispatch),
  }),
)(Registration);
