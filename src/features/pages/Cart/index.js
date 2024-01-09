//import 'boxicons'
// import CommonFunction from "../../lib/common";
// import appSettings from "appSettings";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import _ from "lodash"
import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { formattedAmount } from '../../common/Constant';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { atom_cart } from "../../../recoil/My/atomHandle";
import { token } from "../../common/Constant"

import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import "./styles.scss";
import { Panel } from 'primereact/panel';

import { Toast } from 'primereact/toast';




// import "./styles.scss";

export default function Cart(props) {
    const toast = useRef(null);
    const setData_AtomCart = useSetRecoilState(atom_cart)
    const data_AtomCart = useRecoilValue(atom_cart)
    const [itemCart, setItemCart] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [total, setTotal] = useState();

    console.log(data_AtomCart, "oooooooooooooooooooooooooooooooooo")
    const _data_AtomCart = [
        { name: "ca" }, { name: "hang" }
    ]
    const renderItem = (item) => {
        return (
            <li class="list-group-item">
                {item?.productName}
            </li>
        )
    }

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const applyServiceChangeUser = (prop, val) => {
        // let _detail = _.cloneDeep(user)

        // _detail[prop] = val

        // setUser(_detail)
        //performValidate([prop], _detail)
    }
    const handleChangeQuantity = async (e, product) => {
        if(e.target.value){
            let _itemCart = [...itemCart]
            let item = _itemCart.filter(o => o.id === product.id)
            let _item = { ...item[0] };
            _item.quantity = e.target.value;
            console.log(_item, "8888888888888888888")
            let result = await axios.post(`http://localhost:8080/order-item/update-order-item`,
                _item,
                {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            );
            if(result.data?.result == "NOT ENOUGH"){
                toast.current.show({ severity: 'Error', detail: 'Quá số lượng trong kho!' });
            }
            if(result.data?.result == "NOT EXIST"){
                toast.current.show({ severity: 'Error', detail: 'Sản phẩm không có kích thước và màu sắc tương ứng!' });
            }
            console.log(result, "ddddddddddddddddddddddđ")
            setLoadding(!loadding)
        }
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
        setItemCart(result.data.result)
        totalPrice(result.data.result);
        // setVisibleAddCart(true);
    }

    const itemTemplate = (product) => {
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start px-4 pt-4 pb-0 gap-4">
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={product?.productImage} alt={product.productName} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900 text-overflow-ellipsis w-25rem text-left">{product?.productName}</div>
                            <div className='text-xs	text-left'>
                                Thường giao hàng sau 4 - 8 ngày
                            </div>
                            <div className="text-base font-semibold text-800">
                                <div>
                                    {product?.colorName} | {product?.sizeName}
                                </div>
                            </div>
                            {/* <Rating value={product?.rating} readOnly cancel={false}></Rating>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{product?.category}</span>
                                </span>
                                <Tag value={product?.inventoryStatus} severity={getSeverity(product)}></Tag>
                            </div> */}
                        </div>
                        <div className="flex flex-column sm:flex-row align-items-start xl:align-items-start flex-1 gap-4 justify-content-end">
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-6 sm:gap-2 pr-5 mr-1">
                                <InputText
                                    type="text"
                                    className="p-inputtext-sm w-3"
                                    // value={product?.quantity}
                                    defaultValue={product?.quantity}
                                    onChange={(e) => handleChangeQuantity(e, product)}
                                />
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 text-right">
                                <span className="text-2xl font-semibold w-5rem">${product.price}</span>
                                {/* <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                                <div className='line-through text-right'>
                                    ${product.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-content-end pr-4'>
                    <div className='cursor-pointer text-yellow-400'>
                        Xóa sản phẩm
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        );
    };

    const totalPrice = (_itemcart) => {
        let total = _itemcart?.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0);
        setTotal(total);
        console.log("cccccccccccccccccccccccccccccccccccccccccc", total)
        console.log("ooooooooooooooooooooooooooo", itemCart)

    }

    const header = () => {
        // return <Dropdown
        //     // options={sortOptions} 
        //     // value={sortKey}
        //     // onChange={onSortChange} 
        //     optionLabel="label" placeholder="Sort By Price"
        //     className="w-full sm:w-14rem"

        // />;
        return (
            <div className="col-12">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div className="w-9 sm:w-16rem xl:w-10rem block xl:block mx-auto border-round text-left">
                        Sản phẩm
                    </div>
                    <div className="flex flex-column sm:flex-row align-items-start xl:align-items-start flex-1 gap-4 justify-content-end">
                        {/* <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        </div> */}
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-6 sm:gap-2 text-left">
                            Số lượng
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 text-right">
                            <div className='w-7rem'>
                                Giá sản phẩm
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const renderCheckout = () => {
        window.location.href = "/checkout";
    }

    // useEffect(() => {
    //     updateOrderItem();
    // }, [])

    useEffect(() => {
        updateOrderItem();
        // totalPrice();
    }, [loadding])

    return (
        <div className='m-5'>
            <div className='ml-3 text-left text-3xl font-normal mb-3'>
                Shopping Bag
            </div>
            <hr className='mb-5 ml-3 mr-2 border-300'></hr>
            <div
                // style={{ width: '60%', border: "1px" }} 
                className='flex'
            >
                <div className='w-8'>
                    <DataView
                        value={itemCart} itemTemplate={itemTemplate}
                        header={header()}
                        className='border-1 border-round border-200 ml-3'

                    // sortField={sortField} sortOrder={sortOrder} 
                    />
                </div>
                <div className='w-4'>
                    <div className='w-11 ml-5'>
                        <Panel header="Thông tin đơn hàng">
                            <div className='flex justify-content-between'>
                                <div>
                                    Tổng Tiền:
                                </div>
                                <div>
                                    {formattedAmount(total)}
                                </div>
                            </div>
                            <div className='text-center mt-1'>
                                <Button label="Đến trang đặt hàng" severity="secondary" outlined style={{ width: "220px" }} onClick={() => renderCheckout()} />
                            </div>
                            <div className='text-xs	text-left mt-3'>
                                Rewards will be added to your account once the order has been fully shipped. Rewards amount is subject to change.
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>
            <Toast ref={toast} position="top-right" />
        </div>
    )
}
