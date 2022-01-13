import React, { useContext } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons/lib';
import { useTranslation } from 'react-i18next';
import { IState } from '../../types/state';
import { hideModalPostsAction } from '../../actions/ModalPostsAction';
import './ModalPosts.scss';
import { IPostComments, IUsersPosts } from '../../types/typesAPI';
import { EMPTY_STRING } from '../../constants/common';
import { ThemeContext } from '../contexts/DarkTheme';
import { PopUpComment } from '../popup-comment/PopUpComment';
import PreLoader from '../pre-loader/PreLoader';

interface IModalProps {
  visible: boolean;
  currentPost: IUsersPosts;
  isLoading: boolean;
  comments: Array<IPostComments>;
  hideModalPosts: () => void;
}

const ModalPosts = ({
  visible, currentPost, isLoading, comments, hideModalPosts,
}: IModalProps) => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  const handleClickCloseModal = () => {
    hideModalPosts();
  };

  if (!visible) return null;

  return (
    <div className="modal" onClick={hideModalPosts} role="presentation">
      <div
        className={`modal__content ${themeContext.darkTheme && 'modal__content_dark-theme'}`}
        onClick={(event) => event.stopPropagation()}
        role="presentation"
      >
        <div className="modal__content__close">
          <div className="close-button" onClick={handleClickCloseModal} role="presentation">&times;</div>
        </div>
        <div className="modal__header">
          <div className="modal__header__user">
            <img src={currentPost.owner.picture} alt="User's post img" />
            <PopUpComment comment={currentPost.owner.id}>
              {`${currentPost.owner.title}. ${currentPost.owner.firstName} ${currentPost.owner.lastName}`}
            </PopUpComment>
          </div>
          <div className="modal__header__date">
            {`${moment(currentPost.publishDate).format('DD MMM YYYY HH:mm')}`}
          </div>
        </div>
        <div className="modal__body">
          <div className="modal__body__image">
            <img src={currentPost.image} alt="Post img" />
          </div>
          <div className="modal__body__text">
            {currentPost.text}
          </div>
        </div>
        <div className="modal__comments">
          {/* eslint-disable-next-line no-nested-ternary */}
          {isLoading
            ? (
              <PreLoader />
            )
            : (comments.length > 0
              ? (comments?.map((comment: IPostComments) => (
                <div className="modal__comments__comment comment">
                  <div className="comment__img">
                    {comment.owner.picture === EMPTY_STRING
                      ? <Avatar size="small" icon={<UserOutlined />} className="comment__avatar" />
                      : <img src={comment.owner.picture} alt="" />}
                  </div>
                  <div className="comment__content">
                    <div className={`
                    comment__content__title 
                    ${themeContext.darkTheme && 'comment__content__title_dark-theme'}`}
                    >
                      <span className="comment__content__title__user">
                        <PopUpComment comment={comment.owner.id}>
                          {`${comment.owner.title} ${comment.owner.firstName} ${comment.owner.lastName}`}
                        </PopUpComment>
                      </span>
                      <span className="comment__content__title__date">
                        {moment(comment.publishDate).format('DD MMM YYYY HH:mm')}
                      </span>
                    </div>
                    <div className="comment__content__text">{comment.message}</div>
                  </div>
                </div>
              )))
              : <div>{t('modalPosts.noComments')}</div>)}
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: IState) => ({
    visible: state.modalPosts.visible,
    currentPost: state.modalPosts.currentPost,
    isLoading: state.postComments.isLoading,
    comments: state.postComments.postComments,
  }),
  (dispatch) => ({
    hideModalPosts: bindActionCreators(hideModalPostsAction, dispatch),
  }),
)(ModalPosts);
