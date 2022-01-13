import React, { useContext, useEffect } from 'react';
import './UserProfile.scss';
import { useParams } from 'react-router-dom';
import { Avatar } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { IAuthorizedUser, IUserProfile, IUsersPosts } from '../../types/typesAPI';
import { IState } from '../../types/state';
import { EMPTY_STRING } from '../../constants/common';
import { loadUserData } from '../../actions/UserProfileAction';
import { loadLocationAction } from '../../actions/LocationAction';
import { loadPostsByUserIdAction } from '../../actions/UsersPostsAction';
import Paginator from '../../components/pagination/Paginator';
import { changePaginationValueAction } from '../../actions/PaginationAction';
import { showModalEditProfilesAction } from '../../actions/ModalEditProdileAction';
import ModalEditProfile from '../../components/modal/ModalEditProfile';
import { ThemeContext } from '../../components/contexts/DarkTheme';
import ModalPosts from '../../components/modal/ModalPosts';
import { showModalPostsAction } from '../../actions/ModalPostsAction';
import { loadPostComments } from '../../actions/CommentsAction';
import PreLoader from '../../components/pre-loader/PreLoader';

interface IParams {
  id: string,
}

interface IProps {
  userData: IUserProfile;
  postsByUserId: Array<IUsersPosts>;
  isUserDataLoading: boolean;
  isUserPostsLoading: boolean;
  totalPosts: number;
  currentPage: number;
  authorizedUser: IAuthorizedUser;
  modalEditVisible: boolean;
  modalPostVisible: boolean;
  loadUserData: (id: string) => void,
  loadPostsByUserId: (page: number, limit: number, id: string) => void,
  currentLocation: (location: string) => void,
  changePagination: (totalValue: number, pageSize: number) => void;
  showModalEdit: () => void;
  showModalPosts: (post: IUsersPosts) => void;
  commentsByPostId: (page: number, limit: number, id: string) => void;
}

const UserProfile = ({
  userData,
  postsByUserId,
  isUserDataLoading,
  isUserPostsLoading,
  totalPosts,
  currentPage,
  authorizedUser,
  modalEditVisible,
  modalPostVisible,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  loadUserData,
  loadPostsByUserId,
  currentLocation,
  changePagination,
  showModalEdit,
  showModalPosts,
  commentsByPostId,
}: IProps) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const params = useParams<IParams>();

  useEffect(() => {
    loadUserData(params.id);
  }, [params.id]);

  useEffect(() => {
    if (!modalEditVisible && !modalPostVisible) currentLocation(t('locationPath.profile'));
    else if (modalEditVisible) currentLocation(t('locationPath.editProfile'));
    else currentLocation(t('locationPath.openPost'));
  }, [modalEditVisible, modalPostVisible, t]);

  useEffect(() => {
    loadPostsByUserId(currentPage - 1, 4, params.id);
  }, [currentPage, params.id]);

  useEffect(() => {
    changePagination(totalPosts, 4);
  }, [totalPosts]);

  const handleClickEdit = () => {
    showModalEdit();
  };

  const handleClickPostCard = (post: IUsersPosts) => {
    showModalPosts(post);
    commentsByPostId(0, 5, post.id);
  };

  return (
    <div className="user-profile">
      <ModalEditProfile />
      {isUserDataLoading
        ? <PreLoader />
        : (
          <div className="user-profile__form form">
            <ModalPosts />
            <div className={`form__body ${themeContext.darkTheme && 'form__body_dark-theme'}`}>
              <div className={`form__picture ${themeContext.darkTheme && 'form__picture_dark-theme'}`}>
                {userData.picture === EMPTY_STRING
                  ? <Avatar shape="square" size={256} icon={<UserOutlined />} className="form__picture__alt" />
                  : <img src={`${userData.picture}`} alt="" />}
              </div>
              <div className="form__user-data">
                <div className="form__user-data__data">
                  <h2>{`${userData.title} ${userData.firstName} ${userData.lastName}`}</h2>
                  <span>
                    <b>{t('userProfile.gender')}</b>
                    {` - ${userData.gender}`}
                  </span>
                  <span>
                    <b>{t('userProfile.dateOfBirth')}</b>
                    {` - ${userData.dateOfBirth}`}
                  </span>
                  <span>
                    <b>{t('userProfile.registerDate')}</b>
                    {` - ${userData.registerDate}`}
                  </span>
                  <span>
                    <b>E-mail</b>
                    {` - ${userData.email}`}
                  </span>
                  <span>
                    <b>{t('userProfile.phone')}</b>
                    {` - ${userData.phone}`}
                  </span>
                </div>
                <div className="form__user-data__id">
                  <b>ID</b>
                  {` - ${userData.id}`}
                </div>
              </div>
              {authorizedUser.id === params.id
                ? (
                  <div className="form__edit">
                    <EditOutlined className="form__edit__edit-icon" onClick={handleClickEdit} />
                  </div>
                )
                : null}
            </div>
            {isUserPostsLoading
              ? <div className="form__container-for-spinner"><PreLoader /></div>
              : (
                <div className="form__user-posts">
                  {postsByUserId.length > 0
                    ? (postsByUserId.map((post) => (
                      <div
                        className={`
                      form__user-posts__post-card 
                      ${themeContext.darkTheme && 'form__user-posts__post-card_dark-theme'}`}
                        onClick={() => handleClickPostCard(post)}
                        role="presentation"
                      >
                        <div className="post-card__box">
                          <img className="post-card__box__image" src={post.image} alt="Post" />
                        </div>
                        <div className="post-card__text">{post.text}</div>
                      </div>
                    )))
                    : (
                      <div
                        className={`
                      form__user-posts__none 
                      ${themeContext.darkTheme && 'form__user-posts__none_dark-theme'}`}
                      >
                        {t('userProfile.noPosts')}
                      </div>
                    )}
                </div>
              )}
            {postsByUserId.length > 0 && <Paginator />}
          </div>
        )}
    </div>
  );
};

export default connect(
  (state: IState) => ({
    userData: state.userData.userData,
    isUserDataLoading: state.userData.isLoading,
    isUserPostsLoading: state.usersPosts.isLoading,
    postsByUserId: state.usersPosts.usersPosts,
    totalPosts: state.usersPosts.comments,
    currentPage: state.pagination.currentPage,
    authorizedUser: state.userData.authorizedUser,
    modalEditVisible: state.modalEditProfile.visible,
    modalPostVisible: state.modalPosts.visible,
  }),
  (dispatch) => ({
    loadUserData: bindActionCreators(loadUserData, dispatch),
    currentLocation: bindActionCreators(loadLocationAction, dispatch),
    loadPostsByUserId: bindActionCreators(loadPostsByUserIdAction, dispatch),
    changePagination: bindActionCreators(changePaginationValueAction, dispatch),
    showModalEdit: bindActionCreators(showModalEditProfilesAction, dispatch),
    showModalPosts: bindActionCreators(showModalPostsAction, dispatch),
    commentsByPostId: bindActionCreators(loadPostComments, dispatch),
  }),
)(UserProfile);
