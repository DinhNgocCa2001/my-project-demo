
//import 'boxicons'
// import CommonFunction from "../../lib/common";
// import appSettings from "appSettings";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import _ from "lodash"
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { atom_cart, atom_dataProduct, token_global } from "../../../recoil/My/atomHandle";
import Login from '../../pages/Login/index';
import { token } from "../../common/Constant"
// import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';


import "./styles.scss";
import { redirect } from 'react-router-dom';

export default function HeaderMy(props) {
    const setData_AtomCart = useSetRecoilState(atom_cart)
    const data_AtomCart = useRecoilValue(atom_cart)

    const token_global_component = useRecoilValue(token_global)

    const setData_atom_dataProduct = useSetRecoilState(atom_dataProduct)
    const dataEmpty =
    {
        "name": null,
        "price": 0,
        "discount": 0,
        "image": null,
        "description": "",
        "status": true,
        "categoryId": null
    }
    const userEmpty =
    {
        "username": null,
        "password": null
    }
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [userVisible, setUserVisible] = useState(false);
    const [login, setLogin] = useState(userEmpty);

    const typeProduct = [
        {
            "id": 1,
            "name": "Clothing"
        },
        {
            "id": 2,
            "name": "Shoes"
        },
        {
            "id": 3,
            "name": "Tops"
        },
        {
            "id": 4,
            "name": "Bottoms"
        },
        {
            "id": 5,
            "name": "Accessories"
        },
    ]

    const [detail, setDetail] = useState(dataEmpty);
    const [user, setUser] = useState(userEmpty);
    const [loadding, setLoadding] = useState(false)
    const [category, setCategory] = useState();

    const [lazyParams, setLazyParams] = useState({
        size: 18,
        page: 0,
        sort: "id,desc",
        search: "#"
    });
    const [total, setTotal] = useState(null);

    useEffect(
        () => {
            getSearchData();
        },
        [loadding, lazyParams]
    )

    useEffect(
        () => {
            updateOrderItem();
        },
        [token_global_component]
    )

    // const navigate = useNavigate();
    // const routeChange = (path) => {
    //     navigate(path);
    // }

    const handleLogin = () => {
        setUserVisible(true);
    }

    useEffect(() => {
        getAllCategory()
    }, [])


    const getSearchData = () => {
        // chính
        let result = axios.get('http://localhost:8080/product/search', {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            params: lazyParams
        }
        ).then((data) => {
            // setData(data.data);
            // setTotal(data.data.totalElements);
            console.log(data?.data?.result?.content, "aaaaaaaaaaaaaaaaaaaa")
            setData_atom_dataProduct(data?.data?.result)
            // setData(data.data.result.content);
            // setTotal(data.data.result.totalElements);
        })
    }

    const getAllCategory = async () => {
        let _category = [];
        let result = await axios.get('http://localhost:8080/category/get-all');
        _category = [...result.data.result]
        setCategory(result.data.result);
    }

    const handleChangeParams = (page) => {
        let _param = { ...lazyParams };
        _param.page = page[0] - 1;
        setLazyParams(_param);
    }

    const renderPageItem = (data) => {
        var array = [];
        for (var i = 1; i <= data?.totalPages; i++) {
            array.push([i]);
        }
        return (
            <div className='flex'>
                {array.map(e => (
                    <li class={`page-item ${data?.number == (e - 1) ? "active" : ""}`} aria-current="page" key={e}>
                        <a class="page-link" onClick={() => handleChangeParams(e)}>{e}</a>
                    </li>
                ))}
            </div>
        )
    }

    const createProduct = (data) => {
        let result = axios.post("http://localhost:8080/product/create",
            {
                "name": data.name,
                "price": data.price,
                "discount": data.discount,
                "image": data.image,
                "description": data.description,
                "status": true,
                "categoryId": data.categoryId
            }
        ).then((data) => {
            setLoadding(!loadding);
            setDetail(dataEmpty);
        })
        //window.location.reload();
    }

    const updateOrderItem = async () => {
        let result = await axios.get(`http://localhost:8080/order-item/get-by-id`,
            {
                headers: {
                    // Sử dụng tiêu đề "Authorization"
                    "Authorization": `Bearer ${token_global_component}`,
                    "Content-type": "application/json"
                }
            }
        );
        console.log(result, "99999999999999999999999999")

        // let _data = [...data_AtomCart]
        // _data.push({
        //     name: detail?.name,
        //     quantity: detailBuy?.quantity,
        //     discount: detail?.discount,
        //     price: detail?.price,
        //     sizeId: detailBuy?.sizeId,
        //     colorId: detailBuy?.colorId
        // })
        setData_AtomCart(result.data.result);
        // setItemCart(result.data.result)
        // totalPrice(result.data.result);
        // setVisibleAddCart(true);
    }

    const updateInDatabase = async (data) => {
        let result = await axios.put(`http://localhost:8080/product/update/${data.id}`,
            {
                "id": data.id,
                "name": data.name,
                "price": data.price,
                "discount": data.discount,
                "image": data.image,
                "description": data.description,
                "status": data.status
            }).then((data) => {
                setLoadding(!loadding);
                setDetail(dataEmpty);
            })
    }
    const update = (data) => {
        setDetail(data);
        setVisible(true);
    }
    const deleteProdcut = (data) => {
        let _data = { ...data };
        _data.status = 0;
        setDetail(_data);
        setVisibleDelete(true);
    }

    const submit = () => {
        let _detail = { ...detail };
        if (_detail.id) {
            updateInDatabase(_detail);
        } else {
            createProduct(_detail);
        }
        setVisible(false);
        setVisibleDelete(false);
    }

    const cancel = () => {
        setVisible(false);
        setDetail(dataEmpty);
    }

    const applyServiceChange = (prop, val) => {
        let _detail = _.cloneDeep(detail)

        _detail[prop] = val

        setDetail(_detail)
        //performValidate([prop], _detail)
    }

    const applyServiceChangeUser = (prop, val) => {
        let _detail = _.cloneDeep(user)

        _detail[prop] = val

        setUser(_detail)
        //performValidate([prop], _detail)
    }

    const handleChangeUsername = (e) => {
        applyServiceChangeUser('username', e.target.value)
    }
    const handleChangePassword = (e) => {
        applyServiceChangeUser('password', e.target.value)
    }

    const handleChangeName = (e) => {
        applyServiceChange('name', e.target.value)
    }
    const handleChangeLink = (e) => {
        applyServiceChange('image', e.target.value)
    }
    const handleChangePrice = (e) => {
        applyServiceChange('price', e.value)
    }

    const handleChangeDiscount = (e) => {
        applyServiceChange('discount', e.value)
    }

    const handleChangeCategoryId = (e) => {
        applyServiceChange('categoryId', e.value.id)
    }

    const handleChangeDescription = (e) => {
        applyServiceChange('description', e.target.value)
    }

    const changeSearch = (e) => {
        let _param = { ...lazyParams };
        _param.search = e.target.value;
        setLazyParams(_param);
    }


    const footerContent = (
        <div>
            <button class="btn btn-outline-success" type="submit" onClick={(e) => cancel()}>Hủy</button>
            <button class="btn btn-outline-success" type="submit" onClick={(e) => submit()}>Lưu</button>
        </div>
    );

    const cancelDetele = () => {
        setVisibleDelete(false);
        setDetail(dataEmpty);
    }

    const submitDetele = () => {
        let _detail = { ...detail };
        if (_detail.id) {
            updateInDatabase(_detail);
        } else {
            createProduct(_detail);
        }
        setVisible(false);
        setVisibleDelete(false);
    }

    const footerContentDetele = (
        <div>
            <button class="btn btn-outline-success" type="submit" onClick={(e) => cancelDetele()}>Hủy</button>
            <button class="btn btn-outline-success" type="submit" onClick={(e) => submitDetele()}>Xóa</button>
        </div>
    );

    const renderListItemInCart = () => {
        window.location.href = "/cart";
    }

    const renderCategory = (category) => {
        console.log(category, "22222222222222222222")
        let href = ""
        switch (category.id) {
            case 1:
                href = "/product/male"
                break;
            case 2:
                href = "/product/female"
                break;
            case 3:
                href = "/product/kids"
                break;
            case 4:
                href = "/product/accessory"
                break;
            case 5:
                href = "/product/beauty"
                break;
            case 0:
                href = "/product"
                break;
            default:
            // Các hành động mặc định khi không có trường hợp nào khớp
        }
        console.log(href, "55555555555555555555555555555")
        return (
            <li class="nav-item" className="text-gray-600 mx-6">
                <a class="nav-link" href={href}>{category?.name}</a>
            </li>
        )
    }

    // const navigationProduct = (data) => {
    //     let _data = { ...data };
    //     let linkUrl = "/product/detail/" + _data.id;
    //     routeChange(linkUrl);
    // }

    return (
        <div className=''>
            <div className='t-header'>
                <div className='t-header-banner'>
                    <div className='t-header-banner-content'>
                        <a className='header-content-left' href="/product" >
                            <img src="https://pubcdn.ivymoda.com/ivy2/images/logo.png" alt='hello img' />

                            {/* <img src="https://1.bp.blogspot.com/-1JPaVHUJnGU/YOQeX2ylZII/AAAAAAAAFa0/2jJttGEW6f0fqL8KEAc6HLWFf3m0JILzACLcBGAsYHQ/logo.png" alt='hello img' /> */}
                        </a>
                        <div className='t-header-banner-content-center'>
                            <div className='t-header-banner-content-center-search'>
                                <input placeholder='Tìm kiếm sản phẩm' className='px-2' onChange={changeSearch}></input>
                            </div>
                            {/* <Button type="button" class="position-relative d-flex" >
                                <a class="nav-link" href={"/product"}>Tìm kiếm</a>
                            </Button> */}

                            {/* <div className='t-header-banner-content-center-help'>
                                <div className='t-header-banner-content-center-help-img'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/7044/7044607.png" alt='hello img' />
                                </div>
                                <div className='t-header-banner-content-center-help-content'>
                                    <div className='t-header-banner-content-center-help-content-title'>
                                        Tư vấn hỗ trợ
                                    </div>
                                    <div className='t-header-banner-content-center-help-content-phone'>
                                        1900 1000
                                    </div>
                                </div>
                            </div>
                            <div className='t-header-banner-content-center-help'>
                                <div className='t-header-banner-content-center-help-img'>
                                    <img src="https://cdn-icons-png.flaticon.com/512/7044/7044607.png" alt='hello img' />
                                </div>
                                <div className='t-header-banner-content-center-help-content'>
                                    <div className='t-header-banner-content-center-help-content-title'>
                                        Tư vấn hỗ trợ
                                    </div>
                                    <div className='t-header-banner-content-center-help-content-phone'>
                                        1900 1000
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className='t-header-banner-content-right'>
                            <button type="button" class="position-relative" onClick={() => renderListItemInCart()}>
                                <i className="bx bx-shopping-bag text-3xl"></i>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {data_AtomCart?.length > 10 ? "10" : data_AtomCart?.length}{data_AtomCart?.length > 10 ? "+" : null}
                                    {/* <span class="visually-hidden">unread messages</span> */}
                                </span>
                            </button>
                            <div className='mr-5'></div>

                            <Button type="button" class="position-relative d-flex" onClick={handleLogin}>
                                {
                                    (!login?.username || login?.username?.length == 0) &&
                                    <i className="bx bx-user-circle text-3xl"></i>
                                }
                                <div class="btn btn-outline-secondary">
                                    {login?.username ? login.username : "Login"}
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <ul class="nav justify-content-center ">
            <li class="nav-item" className="text-gray-600 mx-6">
                <a class="nav-link" href={"/product"}>{"Trang chủ"}</a>
            </li>
                {category?.map(ca => renderCategory(ca))}
                {/* <li class="nav-item mx-5">
                    <a class="nav-link active" aria-current="page" href="#">Active</a>
                </li>
                <li class="nav-item mx-5">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item mx-5">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item mx-5">
                    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                </li> */}
            </ul>
            <hr className='mt-1 mb-4'></hr>


            <Dialog
                // header="Login"
                visible={userVisible}
                style={{ width: '35vw', height: "70vw" }}
                onHide={() => setUserVisible(false)}
            // footer={footerContentUser}
            >

                {/* <div class="card w-full border-none">
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="firstname6">Username</label>
                            <InputText
                                id="Name"
                                value={user?.username}
                                //disabled={readOnly}
                                onChange={handleChangeUsername}
                                className="text-base text-color surface-overlay border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="lastname6">Password</label>
                            <InputText
                                id="Name"
                                value={user?.password}
                                //disabled={readOnly}
                                type='password'
                                onChange={handleChangePassword}
                                className="text-base text-color surface-overlay border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />
                        </div>
                    </div>
                </div> */}
                <Login setUserVisible={setUserVisible}  ></Login>
            </Dialog>
        </div>
    )
}
