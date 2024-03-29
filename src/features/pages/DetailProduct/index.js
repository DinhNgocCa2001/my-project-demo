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
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { generateRandomId, TextToHTML } from '../../common/Constant';
import { Dropdown } from 'primereact/dropdown';
import { atom_cart } from "../../../recoil/My/atomHandle";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { token } from "../../common/Constant"
import { Toast } from 'primereact/toast';
import { Editor } from "primereact/editor";




import "./styles.scss";
import { message } from 'antd';

export default function DetailProduct(props) {
    const toast = useRef(null);

    const setData_AtomCart = useSetRecoilState(atom_cart)
    const data_AtomCart = useRecoilValue(atom_cart)

    const { id } = useParams();
    let abc = generateRandomId();

    const dataEmpty =
    {
        "name": null,
        "price": 0,
        "discount": 0,
        "image": null,
        "description": "",
        "status": true
    }

    const detailEmpty = {
        "colorId": null,
        "sizeId": null,
        "quantity": 0
    }
    const [data, setData] = useState(null);
    const [visibleAddCart, setVisibleAddCart] = useState(true);
    const [visibleDelete, setVisibleDelete] = useState(false);

    const [size, setSize] = useState();
    const [color, setColor] = useState();
    const [detailBuy, setDetailBuy] = useState(detailEmpty);

    const [productVariant, setProductVariant] = useState(null);
    const [detail, setDetail] = useState(dataEmpty);
    const [loadding, setLoadding] = useState(false)
    const [lazyParams, setLazyParams] = useState({
        size: 18,
        page: 0,
        sort: "id,desc",
        search: "#"
    });
    const [total, setTotal] = useState(null);

    useEffect(
        () => {
            getDetailProduct();
        }, [id])

    const handleChangeParams = (page) => {
        let _param = { ...lazyParams };
        _param.page = page[0] - 1;
        setLazyParams(_param);
        console.log(page[0] - 1, "eeeeeeeeeeeeeeeeeeee")
    }

    const addOrder = async () => {
        let result = await axios.post(`http://localhost:8080/cart/add-order`,
            null,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
        // .then((data) => {

        //     if(data.data.code == "00"){
        //         message.warning("Vui lòng đăng nhập để tạo đơn hàng!")
        //     }

        //     if(data.data.code == "01"){
        //         message.success("Tạo đơn hàng thành công!")
        //     }

        //     if(data.data.code == "02"){
        //         message.error("Có lỗi xảy ra!")
        //     }

        //     if(data.data.code == "03"){
        //         message.error("Đơn hàng đã có!")
        //     }

        //     addItemToOrder(data.data.result);
        //     console.log(data.data.result, "vvvvvvvvvvvvvvvvvvvvvvvvvvv");
        // })

        return result;


        // let _data = [...data_AtomCart]
        // _data.push({
        //     name: detail?.name,
        //     quantity: detailBuy?.quantity,
        //     discount: detail?.discount,
        //     price: detail?.price,
        //     sizeId: detailBuy?.sizeId,
        //     colorId: detailBuy?.colorId
        // })
        // setData_AtomCart(_data);
        // console.log(_data, "aaaaaaaaaaaaaaaaaaaaaa")
        // setVisibleAddCart(true);
    }

    const getProductVariantBySizeIdAndColorId = async () => {
        let result = await axios.post(`http://localhost:8080/cart/add-order`,
            null,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
        return result;
    }
    // const show = () => {
    //     toast.current.show({ severity: 'info', summary: 'Info', detail: 'Message Content' });
    // };

    const addOrderItem = async () => {
        let _order = await addOrder();
        let _detailBuy = { ...detailBuy };
        _detailBuy.productId = id;
        console.log(_order, "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        if (!_order.data.result?.id) {
            toast.current.show({ severity: 'warn', detail: 'Bạn phải đăng nhập để thêm sản phẩm vào giỏ hàng!' });
            return 0;
        }

        _detailBuy.orderId = _order.data.result.id;
        _detailBuy.userId = _order.data.result.userId;

        let result = await axios.post(`http://localhost:8080/order-item/add-order-item`,
            _detailBuy,
            {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            }
        );
        if (result.data.result == "FALSE") {
            // message.error("Sản phẩm trong kho đã hết!")
            toast.current.show({ severity: 'error', detail: 'Sản phẩm trong kho đã hết!' });

        }
        if (result.data.result == "HAS") {
            // message.warning("Sản phẩm đã ở trong giỏ hàng!")
            toast.current.show({ severity: 'warn', detail: 'Sản phẩm đã ở trong giỏ hàng!' });

        }
        if (result.data.result == "NEW") {
            // message.success("Sản phẩm đã được thêm vào giỏ hàng!")
            toast.current.show({ severity: 'success', detail: 'Sản phẩm đã được thêm vào giỏ hàng!' });

        }
        console.log(result, "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
        updateOrderItem();

    }

    const updateOrderItem = async () => {
        let result = await axios.get(`http://localhost:8080/order-item/get-by-id`,
            {
                headers: {
                    // Sử dụng tiêu đề "Authorization"
                    "Authorization": `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }
        );
        console.log(result, "99999999999999999999999999")

        let _data = []

        if (Array.isArray(data_AtomCart)) {
            _data = [...data_AtomCart];
        }

        _data.push({
            name: detail?.name,
            quantity: detailBuy?.quantity,
            discount: detail?.discount,
            price: detail?.price,
            sizeId: detailBuy?.sizeId,
            colorId: detailBuy?.colorId
        })
        setData_AtomCart(result.data.result);
        console.log(_data, "aaaaaaaaaaaaaaaaaaaaaa")
        setVisibleAddCart(true);
    }

    const addItemToOrder = (order) => {
        let result = axios.get(`http://localhost:8080/order-item/get-by-id/${order?.id}`).then((data) => {
            setDetail(data.data);
            console.log(data.data, "wwwwwwwwwwwwwwwwwwwwwwwwwww")
        })
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


    const getDetailProduct = () => {
        let result = axios.get(`http://localhost:8080/product/get-by-id/${id}`).then((data) => {
            setDetail(data.data);
        })
    }

    const getProductVariant = () => {
        let result = axios.get(`http://localhost:8080/product/get-productVariant-by-id/${id}`).then((data) => {
            let dataReal = data.data;
            setProductVariant(dataReal);

            const listSize = dataReal.filter(o => o.sizeId);

            const listColorId = dataReal.filter(o => o.colorId);

            console.log(dataReal, "jjjjjjjjjjjjjjjjjjjjjjjjjj")
        })
    }

    // const getAllColor = () => {
    //     let result = axios.get(`http://localhost:8080/product/get-all-color`).then((data) => {
    //         let dataReal = data.data;
    //         setColor(dataReal);
    //     })
    // }

    const getItemColor = () => {
        let result = axios.get(`http://localhost:8080/product/get-productVariant-by-id-color/${id}`).then((data) => {
            let dataReal = data.data;
            setColor(dataReal);
        })
    }

    const getItemSize = () => {
        let result = axios.get(`http://localhost:8080/product/get-productVariant-by-id-size/${id}`).then((data) => {
            let dataReal = data.data;
            setSize(dataReal);
        })
    }


    // const getItemSizeAndColor = () => {
    //     let result = axios.get(`http://localhost:8080/product/get-productVariant-by-product-id/${id}`).then((data) => {
    //         let dataReal = data.data;
    //         setSize(dataReal);
    //         const sizes = data.map(item => {
    //             return {
    //                 sizeId: item.sizeId,
    //                 sizeName: item.sizeName
    //             };
    //         });

    //         const colors = data.map(item => {
    //             return {
    //                 colorId: item.colorId,
    //                 colorName: item.colorName
    //             };
    //         });
    //         setColor(colors);
    //         setSize(sizes)
    //     })
    // }

    // const getAllSize = () => {
    //     let result = axios.get(`http://localhost:8080/product/get-all-size`).then((data) => {
    //         let dataReal = data.data;
    //         setSize(dataReal);
    //     })
    // }

    useEffect(
        () => {
            getProductVariant();
            // getAllColor();
            // getAllSize();
            getItemColor();
            getItemSize();
            // getItemSizeAndColor();
        }, [])

    const changeSearch = (e) => {
        let _param = { ...lazyParams };
        _param.search = e.target.value;
        setLazyParams(_param);
    }

    const applyServiceChange = (prop, val) => {
        let _detail = _.cloneDeep(detailBuy)
        _detail[prop] = val

        setDetailBuy(_detail)
        setVisibleAddCart(false);
        //performValidate([prop], _detail)
    }

    const handleChangeColorId = (e) => {
        applyServiceChange('colorId', e.target.value)
        // let filter = {
        //     colorId: e.target.value,
        //     productId: id,
        // }
        // getItemSizeContext(filter)
    }

    const handleChangeSizeId = (e) => {
        applyServiceChange('sizeId', e.target.value)
        // let filter = {
        //     sizeId: e.target.value,
        //     productId: id,
        // }
        // getItemColorContext(filter)
    }


    const handleChangeQuantity = (e) => {
        applyServiceChange('quantity', e.value)
    }

    const getItemColorContext = (lazyParams) => {
        let result = axios.get(`http://localhost:8080/product/get-productVariant-by-id-color/context`,
            {
                params: lazyParams
            }

        ).then((data) => {
            let dataReal = data.data;
            setColor(dataReal);
        })
    }

    const getItemSizeContext = (lazyParams) => {
        let result = axios.get(`http://localhost:8080/product/get-productVariant-by-id-size/context`,
            {
                params: lazyParams
            }
        ).then((data) => {
            let dataReal = data.data;
            setSize(dataReal);
        })
    }

    // const getSearchData = () => {
    //     // chính
    //     let result = axios.get('http://localhost:8080/product/search', {
    //         headers: {
    //             "Content-type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //         params: lazyParams
    //     }
    //     ).then((data) => {
    //         // setData(data.data);
    //         // setTotal(data.data.totalElements);
    //         console.log(data?.data?.result?.content, "aaaaaaaaaaaaaaaaaaaa")
    //         setData_atom_dataProduct(data?.data?.result)
    //         // setData(data.data.result.content);
    //         // setTotal(data.data.result.totalElements);
    //     })
    // }

    return (
        <div className='abc'>
            {/* <div className='def'>
                <div className='t-header'>
                    <div className='t-header-banner'>
                        <div className='t-header-banner-content'>
                            <div className='header-content-left'>
                                <img src="https://1.bp.blogspot.com/-1JPaVHUJnGU/YOQeX2ylZII/AAAAAAAAFa0/2jJttGEW6f0fqL8KEAc6HLWFf3m0JILzACLcBGAsYHQ/logo.png" alt='hello img' />
                            </div>
                            <div className='t-header-banner-content-center'>
                                <div className='t-header-banner-content-center-search'>
                                    <input placeholder='Tìm kiếm sản phẩm' onChange={changeSearch}></input>
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
                                </div>
                            </div>
                            <div className='t-header-banner-content-right'>
                                <button type="button" class="position-relative">
                                    <i className="bx bx-shopping-bag text-3xl"></i>
                                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                        99+
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='detail'>
                <div className='detail_left'>
                    <div className='detail_left_imageSmall'>

                    </div>
                    <div className='detail_left_imageLagre'>
                        <img src={detail?.image} width='350' style={{ height: "550px" }} alt='hello img' />
                    </div>
                </div>
                <div className='detai_center'>

                </div>
                <div className='detail_right'>
                    <div className='detail_right_brand'>
                        MLB Korean
                    </div>
                    <div className='detail_right_title'>
                        {detail?.name}
                    </div>
                    <div className='detail_right_money'>
                        <div className='detail_right_money_money'>
                            $ {new Intl.NumberFormat().format(detail?.price)}
                        </div>
                        <div className='detail_right_money_code'>
                            # {detail?.id}
                        </div>
                    </div>
                    <hr />
                    <div className='detail_right_selection'>
                        <div>Màu sắc</div>
                        <Dropdown
                            value={detailBuy?.colorId}
                            onChange={handleChangeColorId}
                            options={color}
                            optionValue='colorId'
                            optionLabel="colorName"
                            placeholder="Chọn màu sản phẩm"
                            className="text-base text-color surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        />
                        <div className='m-3'></div>
                        <div>Kích cỡ</div>
                        <Dropdown
                            value={detailBuy?.sizeId}
                            onChange={handleChangeSizeId}
                            options={size}
                            optionLabel="sizeName"
                            optionValue='sizeId'
                            placeholder="Chọn kích thước"
                            className="text-base text-color surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        />
                        <div className='m-3'></div>
                        <div>Số lượng</div>
                        <InputNumber
                            id="Name"
                            value={detailBuy?.quantity}
                            //disabled={readOnly}
                            onChange={handleChangeQuantity}
                            className="text-base text-color surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
                        />
                        <div className='m-3'></div>
                        <button type="button" class="btn btn-outline-secondary"
                            disabled={visibleAddCart}
                            onClick={(e) => addOrderItem()}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
            <div className='text-left' style={{ "margin-left": '150px' }}>
                <div className='text-3xl bg-bluegray-100 mb-4'>
                    Mô tả sản phẩm
                </div>
                <div className='mx-2'>
                    {TextToHTML(detail?.description)}
                </div>
            </div>
            <Toast ref={toast} position="top-right" />
        </div>
    )
}
