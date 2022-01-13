import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loadCardsList from './reducers/cardsListReducer';
import paginator from './reducers/paginationReducer';
import posts from './reducers/usersPostsReducer';
import locationPage from './reducers/locationReducer';
import userData from './reducers/userProfileReducer';
import modalPosts from './reducers/modalPostsReducer';
import modalEditProfile from './reducers/modalEditProfileReducer';
import postComments from './reducers/postCommentsReducer';
import registration from './reducers/registrationReducer';

export const store = createStore(
  combineReducers({
    users: loadCardsList,
    pagination: paginator,
    usersPosts: posts,
    location: locationPage,
    userData,
    modalPosts,
    modalEditProfile,
    postComments,
    registration,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);
