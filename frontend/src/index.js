import React, { Suspense, lazy } from 'react';
import "./index.css";
import "./setup";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./components/Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import LoadingSpinner from './components/Loading';

const domNode = document.getElementById("root");
const App = lazy(() => import('./App'));
const root = createRoot(domNode);
root.render(
  <ChakraProvider>
    <BrowserRouter>
      <ChatProvider>
      <Suspense fallback={<LoadingSpinner/>}>
          <App />
        </Suspense>
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
