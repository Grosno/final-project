import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { EMPTY_STRING } from '../../../constants/common';
import ModalEditProfile from '../../../components/modal/ModalEditProfile';

const mockStore = configureStore([thunk]);

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

describe('ModalEditProfile component test', () => {
  test('should be empty render', () => {
    const store = mockStore({
      modalEditProfile: {
        visible: false,
      },
      userData: {
        userData: {},
        imageUrl: EMPTY_STRING,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ModalEditProfile />
      </Provider>,
    );
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  test('should render ModalPosts component', () => {
    const store = mockStore({
      modalEditProfile: {
        visible: true,
      },
      userData: {
        userData: {},
        imageUrl: EMPTY_STRING,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ModalEditProfile />
      </Provider>,
    );
    expect(wrapper.find('div.modal-edit')).toHaveLength(1);
  });
});
