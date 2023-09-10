//import 'boxicons'
// import CommonFunction from "../../lib/common";
// import appSettings from "appSettings";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

import "./styles.scss";

export default function hellloDetail(props) {
    useEffect(
        () => {
            getPostsData();
        },
        []
    )
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);

    const [detail, setDetail]  = useState(null);

    const hello = () => {
        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj")
    }


    const getPostsData = async () => {
        // let res = await axios.get('http://localhost:8080/bookservice/books')
        // console.log(res, "hhhhhhhhhhhhhhhhhhhhh")
        // axios
        // .get("http://localhost:8080/bookservice/books")
        // .then(data => console.log(data))
        // .catch(error => console.log(error));
        // };

        let result = await axios.get('http://localhost:8080/product/get-all?page=0&size=100&sort=id,desc', {
            headers: {
                "Content-type": "application/json",
                //   "Authorization": `Bearer ${token}`,
            },
        }
        )
        setData(result.data);
        console.log(result, "hhhhhhhhhhhhhhhhhhhhh")

    }

    const rendenCardProduct = (rowdata) => {
        console.log(rowdata, "jjjjjjjjjjjjjjjjjjjjjjjjj")
        return (
            // <a>
            <div className='productCard col-2'
            //onClick={() => getPostsData()}
            >
                <div className='productCard__header'>

                </div>
                <div className='productCard__body'>
                    <div className='productCard__body__img'>
                        <img src={rowdata.link} width='100%' height='300' alt='hello img' />
                    </div>

                    <div className='productCard__body__content'>
                        <div className='productCard__body__content__title'>
                            {rowdata.name}
                        </div>
                        <div className='productCard__body__content__priceFinal'>
                            {rowdata.price * rowdata.discount / 100}
                        </div>
                        <div className='productCard__body__content__cost'>
                            <div className='productCard__body__content__cost__origin'>
                                {rowdata.price}
                            </div>
                            <div className='productCard__body__content__cost__discount'>
                                -{rowdata.discount}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='productCard__footer mb-1'>
                    <button type="button" class="btn btn-outline-secondary">Sửa</button>
                </div>
            </div>
            // </a>
        )
    }

    const footerContent = (
        <div>
            <button class="btn btn-outline-success" type="submit" onClick={(e) => setVisible(false)}>Hủy</button>
            <button class="btn btn-outline-success" type="submit" onClick={(e) => setVisible(true)}>Lưu</button>
        </div>
    );
    return (
        <div>
            <div className='header'>
                <div className='header-content'>

                </div>
                <div className='header-navbar'>
                    <nav class="navbar navbar-expand-lg navbar-light">

                        <a class="navbar-brand" href="#">Navbar</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav me-auto mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">Link</a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Dropdown
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><hr class="dropdown-divider" /></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                                </li>
                            </ul>
                            {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            <button class="btn btn-outline-success" type="submit" onClick={(e) => setVisible(true)}>Tạo mới</button>
                        </div>

                    </nav>
                </div>
            </div>


            <div className="layout">
                {/* <div className='layout-left'
                >
                    c
                </div> */}
                <div className='layout-center'>
                    <div class="container">
                        <div class="row">
                            {data?.map((e) => (
                                rendenCardProduct(e)
                            ))}
                        </div>
                    </div>
                </div>
                {/* <div className='layout-right'
                >
                    a
                </div> */}
            </div>
            <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>

                <div class="card w-full border-none">
                    <h5>Advanced</h5>
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="firstname6">Name Product</label>
                            <input id="firstname6" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="lastname6">Link Url</label>
                            <input id="lastname6" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="firstname6">Price</label>
                            <input id="firstname6" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="lastname6">Discount</label>
                            <input id="lastname6" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="lastname6">description</label>
                            <input id="lastname6" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        {/* <div class="field col-12">
                            <label for="address">Address</label>
                            <textarea id="address" type="text" rows="4" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"></textarea>
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="city">City</label>
                            <input id="city" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div>
                        <div class="field col-12 md:col-3">
                            <label for="state">State</label>
                            <select id="state" class="w-full text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round outline-none focus:border-primary">
                                <option>Arizona</option>
                                <option>California</option>
                                <option>Florida</option>
                                <option>Ohio</option>
                                <option>Washington</option>
                            </select>
                        </div>
                        <div class="field col-12 md:col-3">
                            <label for="zip">Zip</label>
                            <input id="zip" type="text" class="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full" />
                        </div> */}
                    </div>
                </div>


            </Dialog>
        </div>
    )
}
