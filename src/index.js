import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import StateStudy from './pages/Study/StateStudy/StateStudy';

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter>
        {/* <App /> */}
        <StateStudy />
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>
);

