import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { IState } from '../../types/state';
import './Location.scss';
import { ThemeContext } from '../contexts/DarkTheme';

interface IProps {
  currentLocation: string;
}

const Location = ({ currentLocation }: IProps) => {
  const themeContext = useContext(ThemeContext);
  return (
    <div className={`location ${themeContext.darkTheme && 'location_dark-theme'}`}>
      {currentLocation}
      <div className="logo-text">Delta World</div>
    </div>
  );
};
export default connect(
  (state: IState) => ({ currentLocation: state.location.currentLocation }),
)(Location);
