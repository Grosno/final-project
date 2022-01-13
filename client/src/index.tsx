import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale/ru_RU';
import { Provider } from 'react-redux';
import App from './components/app/App';
import { store } from './store';
import { ThemeContextProvider } from './components/contexts/DarkTheme';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider locale={ruRU}>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
