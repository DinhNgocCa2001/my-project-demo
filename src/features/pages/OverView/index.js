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
import {token} from "../../common/Constant"

import "./styles.scss";

export default function OverView(props) {
    const dataEmpty =
    {
        "name": null,
        "price": 0,
        "discount": 0,
        "image": null,
        "description": "",
        "status": true
    }
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

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
            getSearchData();
        },
        [loadding, lazyParams]
    )


    const getSearchData = () => {
        // phụ
        let result = axios.get('http://localhost:8080/product/search', {
            headers: {
                "Content-type": "application/json",
                  "Authorization": `Bearer ${token}`,
            },
            params: lazyParams
        }
        ).then((data) => {
            setData(data.data.result);
            setTotal(data.data.result.totalElements);
            // setData_atom_dataProduct(data.data.result.content)

        })
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

    const renderTable = () => {

        return (
            <div className='uuu'>
                <DataTable
                    value={data?.content}
                    dataKey="id"
                    // resize column
                    resizableColumns
                    columnResizeMode="expand"

                    scrollable scrollHeight="400px"

                    // scrollable
                    // scrollDirection="both"
                    // scrollHeight="flex"
                    lazy
                    // paginator
                    // rowsPerPageOptions={[20, 25, 50, 100, 150]}
                    // paginatorTemplate="RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink NextPageLink LastPageLink"
                    // currentPageReportTemplate="{first} - {last} of {totalRecords}"
                    // sort
                    reorderableColumns
                    reorderableRows
                >
                    <Column field="id" header="id"></Column>
                    <Column field="name" header="Name"></Column>
                    <Column field="price" header="price"></Column>
                    <Column field="status" header="status"></Column>
                </DataTable>
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
                "status": true
            }
        ).then((data) => {
            setLoadding(!loadding);
            setDetail(dataEmpty);
        })
        //window.location.reload();
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

    const rendenCardProduct = (rowdata) => {
        return (
            // <a>
            <div className='productCard col-2'
            //onClick={() => getSearchData()}
            >
                <div className='productCard__header'>

                </div>
                <div className='productCard__body'>
                    <div className='productCard__body__img'>
                        <img src={rowdata.image} width='100%' height='300' alt='hello img' />
                    </div>

                    <div className='productCard__body__content'>
                        <div className='productCard__body__content__title'>
                            {rowdata.name}
                        </div>
                        <div className='productCard__body__content__priceFinal'>
                            {new Intl.NumberFormat().format(rowdata.price * (100 - rowdata.discount) / 100)}₫
                        </div>
                        <div className='productCard__body__content__cost'>
                            <div className='productCard__body__content__cost__origin'>
                                {new Intl.NumberFormat().format(rowdata.price)}
                            </div>
                            <div className='productCard__body__content__cost__discount'>
                                -{rowdata.discount}%
                            </div>
                        </div>
                    </div>
                </div>
                <div className='productCard__footer mb-1'>
                    <button type="button" class="btn btn-outline-secondary" onClick={(e) => update(rowdata)}>Sửa</button>
                    <button type="button" class="btn btn-outline-danger ml-1" onClick={(e) => deleteProdcut(rowdata)}>Xóa</button>
                </div>
            </div>
            // </a>
        )
    }

    // const performValidate = (props, _currentDetail) => {
    //     let result = _.cloneDeep(validate), isValid = true
    //     let _detail = _currentDetail ? _currentDetail : detail
    //     // validate all props
    //     if (props.length === 0) {
    //         for (const property in result) {
    //             props.push(property)
    //         }
    //     }

    //     // validate props
    //     props.forEach(prop => {
    //         switch (prop) {
    //             case 'bankCategoryCode':
    //                 result[prop] = _detail.bankCategoryCode ? null : `${t('crm.bank.code')} ${t('message.cant-be-empty')}`
    //                 if (_detail.bankCategoryCode.length>25){
    //                     result[prop] =`${t('crm.legal.bankCategoryCode-length')}`
    //                 }
    //                 break
    //             case 'bankCategoryName':
    //                 result[prop] = _detail.bankCategoryName ? null : `${t('crm.bank.name')} ${t('message.cant-be-empty')}`
    //                 if (_detail.bankCategoryName.length>100){
    //                     result[prop] =`${t('crm.legal.bankCategoryName-length')}`
    //                 }
    //                 break
    //             // case 'paymentTermCode':
    //             // result[prop] =
    //             //     _detail.paymentTermCode?.length > 0
    //             //         ? null
    //             //         : `${t("crm.leadSource.name")} ${t("message.cant-be-empty")}`;
    //             //     if (!result[prop] && !REGEX_ACCOUNT_NAME.test(_detail.paymentTermCode)) {
    //             //         result[prop] = `${t("crm.leadSource.name")} ${t("crm.require.name")}`;
    //             //     }
    //             //     break

    //             default:
    //                 break
    //         }
    //     })


    //     setValidate(result)

    //     // check if object has error
    //     for (const property in result) {
    //         if (result[property]) {
    //             isValid = false
    //             break
    //         }
    //     }

    //     return isValid
    // }

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
    return (
        <div className='abc'>
            <div className='def'>
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
                                        {/* <span class="visually-hidden">unread messages</span> */}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='header'>
                    <div className='header-navbar'>
                        <nav class="navbar navbar-expand-lg navbar-light">

                            <a class="navbar-brand" href="#">Sale</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav me-auto mb-lg-0">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="#">
                                            Wommen
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">
                                            Men
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="#">Kids</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">
                                            Beauty
                                        </a>
                                    </li>
                                    {/* <li class="nav-item dropdown">
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
                                </li> */}
                                </ul>
                                {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
                            </div>
                        </nav>
                        <div className='header-navbar-right'>
                            <button class="btn btn-outline-customer" type="submit" onClick={(e) => setVisible(true)}>Tạo mới</button>
                            <nav aria-label="...">
                                <ul class="pagination mb-0 ml-1">
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                    </li>
                                    {renderPageItem(data)}
                                    {/* {renderTable(data)} */}
                                    {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item active" aria-current="page">
                                        <a class="page-link" href="#">2</a>
                                    </li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li> */}
                                    <li class="page-item">
                                        <a class="page-link" href="#">Next</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>



            <div className="layout">
                {renderTable()}
            </div>
            <Dialog header="Sửa" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={footerContent}>

                <div class="card w-full border-none">
                    {/* <h5>Advanced</h5> */}
                    <div class="formgrid grid">
                        <div class="field col-12 md:col-6">
                            <label for="firstname6">Name Product</label>
                            <InputText
                                id="Name"
                                value={detail?.name}
                                //disabled={readOnly}
                                onChange={handleChangeName}
                                className="text-base text-color surface-overlay border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="lastname6">Link Url</label>
                            <InputText
                                id="Name"
                                value={detail?.image}
                                //disabled={readOnly}
                                onChange={handleChangeLink}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="firstname6">Price</label>
                            <InputNumber
                                id="Name"
                                value={detail?.price}
                                //disabled={readOnly}
                                onChange={handleChangePrice}
                                className="text-base text-color surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="lastname6">Discount</label>
                            <InputNumber
                                id="Name"
                                value={detail?.discount}
                                //disabled={readOnly}
                                onChange={handleChangeDiscount}
                                className="text-base text-color surface-overlay surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />                        </div>
                        <div class="field col-12 md:col-12">
                            <label for="lastname6">Description</label>
                            <InputText
                                id="Name"
                                value={detail?.description}
                                //disabled={readOnly}
                                onChange={handleChangeDescription}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />                        </div>
                    </div>
                </div>


            </Dialog>

            <Dialog header="Sửa" visible={visibleDelete} style={{ width: '50vw' }} onHide={() => setVisibleDelete(false)} footer={footerContent}>

                <div class="card w-full border-none">
                    Bạn có muốn xóa sản phẩm {detail?.name} không ?
                </div>


            </Dialog>
        </div>
    )
}
