import React from 'react';
import { shallow } from 'enzyme';
import { ChangeTheme } from '../../../components/change-theme/ChangeTheme';

describe('ChangeTheme component test', () => {
  test('should render component', () => {
    const wrapper = shallow(<ChangeTheme />);
    expect(wrapper.find('div.theme-checkbox')).toHaveLength(1);
  });
});
