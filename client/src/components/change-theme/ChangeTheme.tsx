import React, { useContext } from 'react';
import { Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/DarkTheme';
import './ChangeTheme.scss';
import '../../locale/i18next';

export const ChangeTheme = () => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);
  return (
    <div className="theme-checkbox">
      <Switch
        checkedChildren={t('darkThemeCheckbox.darkTheme')}
        unCheckedChildren={t('darkThemeCheckbox.defaultTheme')}
        defaultChecked={false}
        checked={themeContext.darkTheme}
        onChange={
            (e: boolean) => themeContext.changeTheme && themeContext.changeTheme(e)
        }
      />
      {localStorage.setItem('isDarkTheme', JSON.stringify(themeContext.darkTheme))}
    </div>
  );
};
