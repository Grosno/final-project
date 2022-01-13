import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Pagination } from 'antd';
import Paginator from '../../../components/pagination/Paginator';

const mockStore = configureStore([thunk]);

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener() {},
    removeListener() {},
  };
};

describe('Paginator component test', () => {
  test('should render component with child', () => {
    const store = mockStore({
      pagination: {
        total: 0,
        currentPage: 0,
        pageSize: 0,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Paginator />
      </Provider>,
    );
    expect(wrapper.find('div.paginator')).toHaveLength(1);
    expect(wrapper.containsMatchingElement(<Pagination />)).toBeTruthy();
  });
});
