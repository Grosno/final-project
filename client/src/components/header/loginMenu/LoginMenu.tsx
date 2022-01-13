import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { urlPath } from '../../../constants/common';
import { ThemeContext } from '../../contexts/DarkTheme';

const LoginMenu = () => {
  const themeContext = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <div className="header__authorization">
      <a className="header__authorization__log-in" href={`#/${urlPath.LOGIN_PATH}`}>
        {t('header.login')}
      </a>
      <a
        className={`
          header__authorization__registration 
          ${themeContext.darkTheme && 'header__authorization__registration_dark-theme'}`}
        href={`#/${urlPath.REGISTRATION_PATH}`}
      >
        {t('header.registration')}
      </a>
    </div>
  );
};

export default LoginMenu;
