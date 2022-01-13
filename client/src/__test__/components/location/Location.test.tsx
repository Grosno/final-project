import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Location from '../../../components/location/Location';

const mockStore = configureStore([thunk]);

describe('Location component test', () => {
  test('should render component', () => {
    const store = mockStore({
      location: {},
    });
    const wrapper = mount(
      <Provider store={store}>
        <Location />
      </Provider>,
    );
    expect(wrapper.find('div.location')).toHaveLength(1);
  });

  test('current location text', () => {
    const location = 'Test location';
    const store = mockStore({
      location: {
        currentLocation: location,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Location />
      </Provider>,
    );
    expect(wrapper.text()).toBe(`${location}Delta World`);
  });
});
