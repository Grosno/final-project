import React, { useState, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

export interface IThemeContextState {
  darkTheme: boolean;
  changeTheme: (value: boolean) => void;
}

const ThemeContext = React.createContext<Partial<IThemeContextState>>({});

const ThemeContextProvider = ({ children }: IProps) => {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('isDarkTheme') === 'true');
  const changeTheme = (value: boolean) => { setDarkTheme(value); };

  return (
    <ThemeContext.Provider value={{ darkTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
