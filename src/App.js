import logo from './logo.svg';
import './App.css';
import { Button } from 'primereact/button';
import Demo from './features/pages/demo-screem';
import Login from './features/pages/Login';
import Cart from './features/pages/Cart';
import Checkout from './features/pages/Checkout';


import OverView from './features/pages/OverView';
import UserAdministration from './features/pages/UserAdministration/index';

import DetailProduct from './features/pages/DetailProduct'
import InvoiedProduct from './features/components/invoied';
import { RecoilRoot } from 'recoil';
import HeaderMy from './features/components/HeaderMy/index'
import token from "../src/features/common/Constant"

//category
import Male from './features/pages/Category/Male';
import Female from './features/pages/Category/Female';
import Kids from './features/pages/Category/Kids';

import Accessory from './features/pages/Category/Accessory';

import Beauty from './features/pages/Category/Beauty';





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
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* danh mục */}
            <Route path="/product/male" element={<Male />} />
            <Route path="/product/female" element={<Female />} />
            <Route path="/product/kids" element={<Kids />} />
            <Route path="/product/accessory" element={<Accessory />} />
            <Route path="/product/beauty" element={<Beauty />} />


            <Route index path="/admin-user" element={<UserAdministration />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
