//import 'boxicons'
// import CommonFunction from "../../lib/common";
// import appSettings from "appSettings";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import _ from "lodash"
import axios from 'axios';
import { useParams } from "react-router-dom";
import { generateRandomId } from '../../common/Constant';
import { Dropdown } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import React, {
    forwardRef,
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    useCallback
} from "react";

import {
    message,
} from "antd";



// import "./styles.scss";

export default function Login(props) {
    const { setUserVisible } = props;
    const userEmpty =
    {
        "email": null,
        "password": null
    }
    const [login, setLogin] = useState(userEmpty);
    // const [userVisible, setUserVisible] = useState(false);
    const [user, setUser] = useState(userEmpty);
    const [error, setError] = useState('');

    const submitLogin = () => {
        let result = axios.post("http://localhost:8080/user/login",
            {
                "email": user.email,
                "password": user.password
            }
        ).then((data) => {
            if (data.data) {
                setUserVisible(false);
                setLogin(data.data)
                setError('')
                localStorage.setItem("token", data.data.result);
            } else {
                // message.error("Đăng nhập không thành công")
                setError("Đăng nhập không thành công")
                localStorage.removeItem("token");
            }
        }).catch((ex) => {
            console.error(ex);
        })
    }
    const applyServiceChangeUser = (prop, val) => {
        let _detail = _.cloneDeep(user)

        _detail[prop] = val

        setUser(_detail)
        //performValidate([prop], _detail)
        console.log(_detail, "sssssssssssssssssssss")
    }
    const handleChangeUsername = (e) => {
        applyServiceChangeUser('email', e.target.value)
    }
    const handleChangePassword = (e) => {
        applyServiceChangeUser('password', e.target.value)
    }


    // useImperativeHandle(ref, () => ({
    //     /**
    //      * choose
    //      */
    //     choose: () => {
    //         setValidate(_.cloneDeep(defaultValidate));
    //         setSelected({ users: [], scope: "owner" });
    //         setShow(true);
    //     },
    // }));
    // const { id } = useParams();
    // let abc = generateRandomId();

    // console.log(id, "jjjjjjjjjjjjjjjjjjjjjj")
    // const dataEmpty =
    // {
    //     "name": null,
    //     "price": 0,
    //     "discount": 0,
    //     "image": null,
    //     "description": "",
    //     "status": true
    // }

    // const detailEmpty = {
    //     "colorId": null,
    //     "sizeId": null,
    //     "quantity": 0
    // }
    // const [data, setData] = useState(null);
    // const [visible, setVisible] = useState(false);
    // const [visibleDelete, setVisibleDelete] = useState(false);

    // const [size, setSize] = useState();
    // const [color, setColor] = useState();
    // const [detailBuy, setDetailBuy] = useState(detailEmpty);

    // const [productVariant, setProductVariant] = useState(null);
    // const [detail, setDetail] = useState(dataEmpty);
    // const [loadding, setLoadding] = useState(false)
    // const [lazyParams, setLazyParams] = useState({
    //     size: 18,
    //     page: 0,
    //     sort: "id,desc",
    //     search: "#"
    // });
    // const [total, setTotal] = useState(null);

    // useEffect(
    //     () => {
    //         getDetailProduct();
    //     }, [id])

    // const handleChangeParams = (page) => {
    //     let _param = { ...lazyParams };
    //     _param.page = page[0] - 1;
    //     setLazyParams(_param);
    //     console.log(page[0] - 1, "eeeeeeeeeeeeeeeeeeee")
    // }

    // const addOrder = () => {

    // }

    // const renderPageItem = (data) => {
    //     var array = [];
    //     for (var i = 1; i <= data?.totalPages; i++) {
    //         array.push([i]);
    //     }
    //     return (
    //         <div className='flex'>
    //             {array.map(e => (
    //                 <li class={`page-item ${data?.number == (e - 1) ? "active" : ""}`} aria-current="page" key={e}>
    //                     <a class="page-link" onClick={() => handleChangeParams(e)}>{e}</a>
    //                 </li>
    //             ))}
    //         </div>
    //     )
    // }


    // const getDetailProduct = () => {
    //     let result = axios.get(`http://localhost:8080/product/get-by-id/${id}`).then((data) => {
    //         setDetail(data.data);
    //     })
    // }

    // const getProductVariant = () => {
    //     let result = axios.get(`http://localhost:8080/product/get-productVariant-by-id/${id}`).then((data) => {
    //         let dataReal = data.data;
    //         setProductVariant(dataReal);

    //         const listSize = dataReal.filter(o => o.sizeId);

    //         const listColorId = dataReal.filter(o => o.colorId);

    //         console.log(dataReal, "jjjjjjjjjjjjjjjjjjjjjjjjjj")
    //     })
    // }

    // const getAllColor = () => {
    //     let result = axios.get(`http://localhost:8080/product/get-all-color`).then((data) => {
    //         let dataReal = data.data;
    //         setColor(dataReal);
    //     })
    // }

    // const getAllSize = () => {
    //     let result = axios.get(`http://localhost:8080/product/get-all-size`).then((data) => {
    //         let dataReal = data.data;
    //         setSize(dataReal);
    //     })
    // }

    // useEffect(
    //     () => {
    //         getProductVariant();
    //         getAllColor();
    //         getAllSize();
    //     }, [])

    // const changeSearch = (e) => {
    //     let _param = { ...lazyParams };
    //     _param.search = e.target.value;
    //     setLazyParams(_param);
    // }

    // const applyServiceChange = (prop, val) => {
    //     let _detail = _.cloneDeep(detailBuy)
    //     _detail[prop] = val

    //     setDetailBuy(_detail)
    //     //performValidate([prop], _detail)
    // }

    // const handleChangeColorId = (e) => {
    //     applyServiceChange('colorId', e.value.id)
    // }

    // const handleChangeSizeId = (e) => {
    //     applyServiceChange('sizeId', e.value.id)
    // }


    // const handleChangeQuantity = (e) => {
    //     applyServiceChange('quantity', e.value)
    // }

    // ca: comment 22/12/2023
    // return (
    //     <div class="bg-white">
    //         <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    //             <h2 class="sr-only">Products</h2>

    //             <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
    //                 <div style={{ height: "350px", width: "250px" }} class="group">
    //                     <div class="max-w-2xl mx-auto">


    //                         <div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
    //                             <a href="#">
    //                                 <img className='rounded-t-lg p-1' src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp" alt="product image" />
    //                             </a>
    //                             <div class="px-5 pb-5">
    //                                 <a href="#">
    //                                     <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">Apple Watch Series 7
    //                                         GPS, Aluminium Case, Starlight Sport</h3>
    //                                 </a>
    //                                 <div class="flex items-center mt-2.5 mb-5">
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
    //                                 </div>
    //                                 <div class="flex items-center justify-between">
    //                                     <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
    //                                     <a href="#"
    //                                         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
    //                                         to cart</a>
    //                                 </div>
    //                             </div>
    //                         </div>

    //                     </div>        </div>
    //                 <div style={{ height: "350px", width: "250px" }} class="group">
    //                     <div class="max-w-2xl mx-auto">


    //                         <div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
    //                             <a href="#">
    //                                 <img className='rounded-t-lg p-1' src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp" alt="product image" />
    //                             </a>
    //                             <div class="px-5 pb-5">
    //                                 <a href="#">
    //                                     <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">Apple Watch Series 7
    //                                         GPS, Aluminium Case, Starlight Sport</h3>
    //                                 </a>
    //                                 <div class="flex items-center mt-2.5 mb-5">
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
    //                                 </div>
    //                                 <div class="flex items-center justify-between">
    //                                     <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
    //                                     <a href="#"
    //                                         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
    //                                         to cart</a>
    //                                 </div>
    //                             </div>
    //                         </div>

    //                     </div>        </div>
    //                 <div style={{ height: "350px", width: "250px" }} class="group">
    //                     <div class="max-w-2xl mx-auto">


    //                         <div class="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
    //                             <a href="#">
    //                                 <img className='rounded-t-lg p-1' src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp" alt="product image" />
    //                             </a>
    //                             <div class="px-5 pb-5">
    //                                 <a href="#">
    //                                     <h3 class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">Apple Watch Series 7
    //                                         GPS, Aluminium Case, Starlight Sport</h3>
    //                                 </a>
    //                                 <div class="flex items-center mt-2.5 mb-5">
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <svg class="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
    //                                         xmlns="http://www.w3.org/2000/svg">
    //                                         <path
    //                                             d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
    //                                         </path>
    //                                     </svg>
    //                                     <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
    //                                 </div>
    //                                 <div class="flex items-center justify-between">
    //                                     <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
    //                                     <a href="#"
    //                                         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
    //                                         to cart</a>
    //                                 </div>
    //                             </div>
    //                         </div>

    //                     </div>        </div>
    //             </div>
    //         </div>
    //     </div>

    // )

    return (
        <>
            {/* <div className="card"> */}
            <TabView>
                <TabPanel header="Sign In">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                                <img
                                    className="mx-auto h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company"
                                />
                                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                    Welcome back!
                                </h2>
                            </div> */}
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Welcome back!
                        </h2>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div
                                className="space-y-6"
                            // action="#" 
                            // method="POST"
                            >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangeUsername}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangePassword}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        // type="submit"
                                        onClick={() => submitLogin()}
                                        className="flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </div>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                {error}
                            </p>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Start a 14 day free trial
                                </a>
                            </p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Sign Up">
                    <p className="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui
                        ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </TabPanel>
            </TabView>
            {/* </div> */}
        </>
    )
}
// Login = forwardRef(Login);
// export default Login;
