import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import UsersPosts from '../../../forms/users-posts/UsersPosts';

const mockStore = configureStore([thunk]);

describe('UsersPosts component test', () => {
  test('should render UsersPosts form', () => {
    const store = mockStore({
      usersPosts: {},
      pagination: {},
      userData: {
        authorizedUser: { isAuthorized: false },
      },
      modalPosts: { visible: false },
      postComments: { isLoading: false },
    });
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <UsersPosts />
      </Provider>,
    );
    expect(wrapper.find('div.posts-form')).toHaveLength(1);
  });
});
