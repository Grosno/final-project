import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar, Button, DatePicker, Form, Input, Upload,
} from 'antd';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons/lib';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IState } from '../../types/state';
import './ModalPosts.scss';
import { IAuthorizedUser, IUpdatedUserData, IUserProfile } from '../../types/typesAPI';
import { EMPTY_STRING } from '../../constants/common';
import { hideModalEditProfilesAction } from '../../actions/ModalEditProdileAction';
import './ModalEditProfile.scss';
import {
  changeAuthorizedUserAction, clearImageUrl,
  loadUpdatedUserDataAction,
  uploadImageToIMGBBAction,
} from '../../actions/UserProfileAction';
import { ThemeContext } from '../contexts/DarkTheme';
import { toBase64Url } from '../../utils/toBase64';

interface IModalProps {
  visible: boolean;
  userData: IUserProfile;
  updatedAvatarUrl: string;
  hideModalEditProfile: () => void;
  loadUpdatedData: (updatedData: IUpdatedUserData, id: string) => void;
  changeAuthorizedUser: (user: IAuthorizedUser) => void;
  uploadImageToIMGBB: (base64Url: FormData) => void;
  clearUpdatedAvatarUrl: () => void;
}

const ModalEditProfile = ({
  visible, userData, updatedAvatarUrl, hideModalEditProfile, loadUpdatedData, changeAuthorizedUser, uploadImageToIMGBB,
  clearUpdatedAvatarUrl,
}: IModalProps) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const [updatedData, setUpdatedData] = useState({} as IUpdatedUserData);
  const handleClickCloseModal = () => {
    hideModalEditProfile();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 17 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 16, offset: 7 },
    },
  };

  const handleClickSaveChanges = (values: IUpdatedUserData) => {
    setUpdatedData(Object.keys(values)
    // @ts-ignore
      .filter((key) => values[key] !== undefined)
    // @ts-ignore
      .reduce((update, key) => ({ ...update, [key]: values[key] }), {}));
  };

  const handleClickDeleteImage = () => {
    loadUpdatedData({ picture: EMPTY_STRING } as IUpdatedUserData, userData.id);
    localStorage.setItem('avatar', EMPTY_STRING);
    changeAuthorizedUser({
      id: userData.id,
      name: userData.firstName,
      avatar: EMPTY_STRING,
      isAuthorized: true,
    });
  };

  const handleUploadAction = (info: any) => {
    toBase64Url(info.file, (data) => {
      uploadImageToIMGBB(data);
    });
  };

  useEffect(() => {
    if (updatedAvatarUrl !== EMPTY_STRING) {
      loadUpdatedData({ picture: updatedAvatarUrl } as IUpdatedUserData, userData.id);
      localStorage.setItem('avatar', updatedAvatarUrl);
      changeAuthorizedUser({
        id: userData.id,
        name: userData.firstName,
        avatar: updatedAvatarUrl,
        isAuthorized: true,
      });
      clearUpdatedAvatarUrl();
    }
  }, [updatedAvatarUrl]);

  useEffect(() => {
    if (Object.keys(updatedData).length > 0) {
      loadUpdatedData(updatedData, userData.id);
      if (updatedData.picture !== undefined) localStorage.setItem('avatar', updatedData.picture || EMPTY_STRING);
      if (updatedData.firstName !== undefined) localStorage.setItem('name', updatedData.firstName || EMPTY_STRING);
      changeAuthorizedUser({
        id: userData.id,
        name: updatedData.firstName || localStorage.getItem('name') || EMPTY_STRING,
        avatar: updatedData.picture || localStorage.getItem('avatar') || EMPTY_STRING,
        isAuthorized: true,
      });
    }
  }, [updatedData]);

  if (!visible) return null;

  // @ts-ignore
  return (
    <div className="modal-edit" onClick={handleClickCloseModal} role="presentation">
      <div
        className={`modal-edit__content ${themeContext.darkTheme && 'modal-edit__content_dark-theme'}`}
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <div className="modal-edit__content__close">
          <div className="close-button" onClick={handleClickCloseModal} role="presentation">&times;</div>
        </div>
        <div className="modal-edit__picture">
          <div className="modal-edit__picture__user">
            {userData.picture === EMPTY_STRING
              ? <Avatar shape="square" size={128} icon={<UserOutlined />} className="form__picture__alt" />
              : <img src={userData.picture} alt="" />}
          </div>
          <div className="modal-edit__picture__update-delete-buttons">
            <Upload
              customRequest={handleUploadAction}
              name="Avatar"
              showUploadList={false}
              className={`update-button ${themeContext.darkTheme && 'update-button_dark-theme'}`}
            >
              {t('modalEditProfile.photo.update')}
            </Upload>
            <div
              className={`
                delete-button 
                ${userData.picture === EMPTY_STRING && 'disabled'} 
                ${themeContext.darkTheme && 'delete-button_dark-theme'}`}
              onClick={handleClickDeleteImage}
              role="presentation"
            >
              {t('modalEditProfile.photo.delete')}
            </div>
          </div>
        </div>
        <div className="modal-edit__body">
          <Form
            {...formItemLayout}
            className={`modal-edit__body__form ${themeContext.darkTheme && 'modal-edit__body__form_dark-theme'}`}
            name="user-info"
            onFinish={(values) => handleClickSaveChanges(values)}
          >
            <Form.Item
              name="firstName"
              label={t('modalEditProfile.label.name')}
              rules={[
                {
                  min: 2,
                  max: 50,
                  message: t('modalEditProfile.validate.firstName.errorLength'),
                },
                {
                  pattern: new RegExp(/^[A-zА-я]*$/, 'g'),
                  message: t('modalEditProfile.validate.firstName.errorLetter'),
                },
                {
                  whitespace: true,
                  message: t('modalEditProfile.validate.firstName.errorSpace'),
                },
              ]}
            >
              <Input defaultValue={userData.firstName} />
            </Form.Item>
            <Form.Item
              name="lastName"
              label={t('modalEditProfile.label.lastName')}
              rules={[
                {
                  min: 2,
                  max: 50,
                  message: t('modalEditProfile.validate.lastName.errorLength'),
                },
                {
                  pattern: new RegExp(/^[A-zА-я]*$/, 'g'),
                  message: t('modalEditProfile.validate.lastName.errorLetter'),
                },
                {
                  whitespace: true,
                  message: t('modalEditProfile.validate.lastName.errorSpace'),
                },
              ]}
            >
              <Input defaultValue={userData.lastName} />
            </Form.Item>
            <Form.Item
              name="gender"
              label={t('modalEditProfile.label.gender')}
            >
              <Input defaultValue={userData.gender} />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label={t('modalEditProfile.label.dateOfBirth')}
            >
              <DatePicker
                locale={locale}
                defaultValue={moment(userData.dateOfBirth)}
                getPopupContainer={(triggerNode) => triggerNode}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="E-mail"
            >
              <Input prefix={<MailOutlined />} defaultValue={userData.email} disabled />
            </Form.Item>
            <Form.Item
              name="phone"
              label={t('modalEditProfile.label.phone')}
              rules={[
                {
                  pattern: new RegExp(/^[0-9]*$/, 'g'),
                  message: t('modalEditProfile.validate.phone.errorLetter'),
                },
                {
                  whitespace: true,
                  message: t('modalEditProfile.validate.phone.errorSpace'),
                },
              ]}
            >
              <Input prefix={<PhoneOutlined />} defaultValue={userData.phone} />
            </Form.Item>
            <Form.Item name="form_button" {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className="modal__button"
              >
                {t('modalEditProfile.btnSaveChanges')}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: IState) => ({
    visible: state.modalEditProfile.visible,
    userData: state.userData.userData,
    updatedAvatarUrl: state.userData.imageUrl,
  }),
  (dispatch) => ({
    hideModalEditProfile: bindActionCreators(hideModalEditProfilesAction, dispatch),
    loadUpdatedData: bindActionCreators(loadUpdatedUserDataAction, dispatch),
    changeAuthorizedUser: bindActionCreators(changeAuthorizedUserAction, dispatch),
    uploadImageToIMGBB: bindActionCreators(uploadImageToIMGBBAction, dispatch),
    clearUpdatedAvatarUrl: bindActionCreators(clearImageUrl, dispatch),
  }),
)(ModalEditProfile);
