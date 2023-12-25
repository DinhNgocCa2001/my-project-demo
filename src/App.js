import logo from './logo.svg';
import './App.css';
import { Button } from 'primereact/button';
import Demo from './features/pages/demo-screem';
import Login from './features/pages/Login';
import Cart from './features/pages/Cart';

import OverView from './features/pages/OverView';
import DetailProduct from './features/pages/DetailProduct'
import InvoiedProduct from './features/components/invoied';
import { RecoilRoot } from 'recoil';
import HeaderMy from './features/components/HeaderMy/index'
import token from "../src/features/common/Constant"


import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <div>
          <HeaderMy></HeaderMy>
        </div>
        <BrowserRouter>
          <Routes>
            <Route index path="/overview" element={<OverView />} />
            <Route path="/product" element={<Demo />} />
            <Route path="/product/detail/:id" element={<DetailProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
