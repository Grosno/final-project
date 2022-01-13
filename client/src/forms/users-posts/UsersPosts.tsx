import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { IAuthorizedUser, IUsersPosts } from '../../types/typesAPI';
import { IState } from '../../types/state';
import './UserPosts.scss';
import { loadUsersPostsAction } from '../../actions/UsersPostsAction';
import { changePaginationValueAction } from '../../actions/PaginationAction';
import { loadLocationAction } from '../../actions/LocationAction';
import { showModalPostsAction } from '../../actions/ModalPostsAction';
import ModalPosts from '../../components/modal/ModalPosts';
import { loadPostComments } from '../../actions/CommentsAction';
import { ThemeContext } from '../../components/contexts/DarkTheme';
import { PopUpComment } from '../../components/popup-comment/PopUpComment';
import PreLoader from '../../components/pre-loader/PreLoader';

interface IProps {
  usersPosts: Array<IUsersPosts>;
  isLoading: boolean;
  currentPage: number;
  totalComments: number;
  authorizedUser: IAuthorizedUser;
  modalVisible: boolean;
  loadUsersPosts: (currentPage: number, pageSize: number) => void;
  changePagination: (totalValue: number, pageSize: number) => void;
  currentLocation: (location: string) => void;
  showModalPosts: (post: IUsersPosts) => void;
  commentsByPostId: (page: number, limit: number, id: string) => void,
}

const UsersPosts = ({
  usersPosts,
  isLoading,
  currentPage,
  totalComments,
  loadUsersPosts,
  authorizedUser,
  modalVisible,
  changePagination,
  currentLocation,
  showModalPosts,
  commentsByPostId,
}: IProps) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    loadUsersPosts(currentPage - 1, 6);
  }, [currentPage]);

  useEffect(() => {
    changePagination(totalComments, 6);
  }, [totalComments]);

  useEffect(() => {
    if (!modalVisible) {
      currentLocation(authorizedUser.isAuthorized
        ? t('locationPath.postsAuthorized') : t('locationPath.posts'));
    } else currentLocation(t('locationPath.openPost'));
  }, [modalVisible, t]);

  const handleClickPostCard = (post: IUsersPosts) => {
    showModalPosts(post);
    commentsByPostId(0, 5, post.id);
  };

  return (
    <div className="posts-form">
      {isLoading ? (
        <PreLoader />
      ) : (
        <div className="posts-list posts">
          <ModalPosts />
          {usersPosts?.map((elem: IUsersPosts) => (
            <div
              className={`posts__card ${themeContext.darkTheme && 'posts__card_dark-theme'}`}
              onClick={() => handleClickPostCard(elem)}
              role="presentation"
            >
              <div className="posts__card__header">
                <div className="posts__card__header__avatar">
                  <img className="" src={elem.owner.picture} alt="Post-img" />
                </div>
                <div className="posts__card__header__title">
                  <PopUpComment comment={elem.id}>
                    <div className="posts__card__header__title__name">
                      {`${elem.owner.title}. ${elem.owner.firstName} ${elem.owner.lastName}`}
                    </div>
                  </PopUpComment>
                  <div className="posts__card__header__title__date">
                    {moment(elem.publishDate).format('DD MMM YYYY HH:mm a')}
                  </div>
                </div>
              </div>
              <div className="posts__card__picture">
                <img src={elem.image} alt="Posts-img" />
              </div>
              <div className="posts__card__comment">
                {elem.text}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default connect(
  (state: IState) => ({
    usersPosts: state.usersPosts.usersPosts,
    isLoading: state.usersPosts.isLoading,
    currentPage: state.pagination.currentPage,
    totalComments: state.usersPosts.comments,
    authorizedUser: state.userData.authorizedUser,
    modalVisible: state.modalPosts.visible,
  }),
  (dispatch) => ({
    loadUsersPosts: bindActionCreators(loadUsersPostsAction, dispatch),
    changePagination: bindActionCreators(changePaginationValueAction, dispatch),
    currentLocation: bindActionCreators(loadLocationAction, dispatch),
    showModalPosts: bindActionCreators(showModalPostsAction, dispatch),
    commentsByPostId: bindActionCreators(loadPostComments, dispatch),
  }),
)(UsersPosts);
