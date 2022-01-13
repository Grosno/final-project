import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../../../components/header/Header';

const storeMock = configureStore([thunk]);

describe('Header component test', () => {
  test('should render component with children LoginMenu', () => {
    const store = storeMock({
      userData: {
        authorizedUser: {},
      },
    });
    const wrapper = mount(
      <HashRouter>
        <Route>
          <Provider store={store}>
            <Header />
          </Provider>
        </Route>
      </HashRouter>,
    );
    expect(wrapper.find('div.header')).toHaveLength(1);
  });

  test('should render component with children UserMenu', () => {
    const store = storeMock({
      userData: {
        authorizedUser: {
          isAuthorized: true,
        },
      },
    });
    const wrapper = mount(
      <HashRouter>
        <Route>
          <Provider store={store}>
            <Header />
          </Provider>
        </Route>
      </HashRouter>,
    );
    expect(wrapper.find('div.header')).toHaveLength(1);
  });
});
