import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';
import Registration from '../../../forms/registration/Registration';

const mockStore = configureStore([thunk]);

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

describe('Registration form test', () => {
  test('should render Registration form', () => {
    const store = mockStore({
      registration: {
        newUser: {},
      },
    });
    store.dispatch = jest.fn();
    const wrapper = mount(
      <HashRouter>
        <Route>
          <Provider store={store}>
            <Registration />
          </Provider>
        </Route>
      </HashRouter>,
    );
    expect(wrapper.find('div.form-registration')).toHaveLength(1);
  });
});
