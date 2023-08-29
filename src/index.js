import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user.context';
import { PostsProvider } from './context/posts.context';
import { UsersListProvider } from './context/usersList.context';
import { ChatContextProvider } from './context/chat.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PostsProvider>
          <UsersListProvider>
            <ChatContextProvider>
            <App />
            </ChatContextProvider>
          </UsersListProvider>
        </PostsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
