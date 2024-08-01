<<<<<<< HEAD
import React from "react";
import "./index.css";
import "./setup";
import App from "./App";
=======
import React, {} from 'react';
import "./index.css";
import "./setup";
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js';
>>>>>>> master
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./components/Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
<<<<<<< HEAD
=======
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
>>>>>>> master

const domNode = document.getElementById("root");
const root = createRoot(domNode);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
<<<<<<< HEAD
        <App />
=======
        <GoogleOAuthProvider clientId='940835071660-da44he72t3otp7cbn96vlg5pb753tv73.apps.googleusercontent.com'>
          <App/>
        </GoogleOAuthProvider>
>>>>>>> master
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
