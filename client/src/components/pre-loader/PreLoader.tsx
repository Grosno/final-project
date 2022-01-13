import { Spin } from 'antd';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/DarkTheme';
import './PreLoader.scss';

const PreLoader = () => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  return (
    <div className="preloader-form">
      <Spin
        tip={t('spin.loading')}
        className={`
            preloader-form__spinner 
            ${themeContext.darkTheme && 'preloader-form__spinner_dark-theme'}`}
      />
    </div>
  );
};

export default PreLoader;
