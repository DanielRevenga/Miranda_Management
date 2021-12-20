import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ThemeProvider } from 'styled-components';
import { HTML5Backend } from 'react-dnd-html5-backend'

import App from './App';
import { darkTheme } from "./styles/themes";
import { DndProvider } from 'react-dnd';
import { AuthProvider } from './context/AuthContext';
import store from "./store";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <DndProvider backend={HTML5Backend}>
          <AuthProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </AuthProvider>
        </DndProvider>
      </ThemeProvider>
     </Provider>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
