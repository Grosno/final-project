import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from '../../../components/footer/Footer';

describe('Footer component test', () => {
  test('should render component', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('div.footer')).toHaveLength(1);
  });
});
