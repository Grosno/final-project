import React, { useContext } from 'react';
import './Footer.scss';
import { Select } from 'antd';
import i18next from 'i18next';
import { ChangeTheme } from '../change-theme/ChangeTheme';
import { ThemeContext } from '../contexts/DarkTheme';
import '../../locale/i18next';

const { Option } = Select;

export const Footer = () => {
  const themeContext = useContext(ThemeContext);

  const handleClickSelectLanguage = (lang: string) => {
    i18next.changeLanguage(lang);
  };

  return (
    <div className={`footer ${themeContext.darkTheme && 'footer_dark-theme'}`}>
      <div className="footer__container">
        <div className="footer__container__info">Delta world © 1970-2021</div>
        <div className="footer__container__buttons">
          <Select defaultValue="Русский" onSelect={handleClickSelectLanguage} size="small">
            <Option value="ru">Русский</Option>
            <Option value="en">English</Option>
          </Select>
          <ChangeTheme />
        </div>
      </div>
    </div>
  );
};
