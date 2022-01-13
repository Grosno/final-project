import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import ModalPosts from '../../../components/modal/ModalPosts';
import { EMPTY_STRING } from '../../../constants/common';

const mockStore = configureStore([thunk]);

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

describe('ModalPosts component test', () => {
  test('should be empty render', () => {
    const store = mockStore({
      modalPosts: {
        visible: false,
      },
      postComments: {},
    });
    const wrapper = mount(
      <Provider store={store}>
        <ModalPosts />
      </Provider>,
    );
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  test('should render ModalPosts component', () => {
    const store = mockStore({
      modalPosts: {
        visible: true,
        currentPost: {
          owner: {},
        },
      },
      postComments: {
        postComments: [{
          owner: {
            picture: EMPTY_STRING,
          },
        }],
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ModalPosts />
      </Provider>,
    );
    expect(wrapper.find('div.modal')).toHaveLength(1);
  });
  //
  // test('should call closeModal action by click', () => {
  //   const store = mockStore({
  //     modalPosts: {
  //       visible: true,
  //       currentPost: { owner: {} },
  //     },
  //     postComments: {
  //       postComments: [{
  //         owner: { picture: EMPTY_STRING },
  //       }],
  //     },
  //   });
  //   const wrapper = mount(
  //     <Provider store={store}>
  //       <ModalPosts />
  //     </Provider>,
  //   );
  //   store.dispatch = jest.fn();
  //   wrapper.find('div.modal').simulate('click');
  //   expect(actions.hideModalPostsAction).toBeCalled();
  // });
});
