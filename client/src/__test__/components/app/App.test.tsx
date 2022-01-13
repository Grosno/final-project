import React from 'react';
import { shallow } from 'enzyme';
import App from '../../../components/app/App';

describe('App component test', () => {
  test('should render component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('div.container')).toHaveLength(1);
  });
});
