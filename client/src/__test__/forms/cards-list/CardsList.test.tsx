import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import CardsList from '../../../forms/cards-list/CardsList';
import PreLoader from '../../../components/pre-loader/PreLoader';

const mockStore = configureStore([thunk]);

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

describe('CardsList component test', () => {
  test('should render CardsList form', () => {
    const store = mockStore({
      users: {},
      pagination: {},
      userData: {
        authorizedUser: {
          isAuthorized: false,
        },
      },
    });
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <CardsList />
      </Provider>,
    );
    expect(wrapper.find('div.user-form')).toHaveLength(1);
  });

  test('should render child component Preloader', () => {
    const store = mockStore({
      users: {
        isLoading: true,
      },
      pagination: {},
      userData: {
        authorizedUser: {
          isAuthorized: false,
        },
      },
    });
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <CardsList />
      </Provider>,
    );
    expect(wrapper.containsMatchingElement(<PreLoader />)).toBeTruthy();
  });

  // test('should render child component Link', () => {
  //   const store = mockStore({
  //     users: {
  //       isLoading: false,
  //       usersCards: [
  //         { user1: '1' },
  //         { user2: '2' },
  //       ],
  //     },
  //     pagination: {},
  //     userData: {
  //       authorizedUser: {
  //         isAuthorized: false,
  //       },
  //     },
  //   });
  //   store.dispatch = jest.fn();
  //   const wrapper = mount(
  //     <HashRouter>
  //       <Route>
  //         <Provider store={store}>
  //           <CardsList />
  //         </Provider>
  //       </Route>
  //     </HashRouter>,
  //   );
  //   expect(wrapper.contains(<Link to="" />)).toBeTruthy();
  // });
});
