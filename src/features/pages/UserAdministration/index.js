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
import { token } from "../../common/Constant"
import { formattedAmount, listCategory, formattedDate } from "../../common/Constant";
import { Tag } from 'primereact/tag';
import { Dropdown } from 'primereact/dropdown';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import "./styles.scss";

export default function UserAdministration(props) {

    const toast = useRef(null);

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
    const [dataOld ,setDataOld] =  useState(null);

    /**
 * on datatable change paging
 * @param {*} event
 */
    const onPage = (event) => {
        let _lazyParams = { ...lazyParams };
        _lazyParams.size = event.rows;
        _lazyParams.page = event.page;
        _lazyParams.rows = event.rows;
        setLazyParams(_lazyParams);
    };

    const [detail, setDetail] = useState(dataEmpty);
    const [loadding, setLoadding] = useState(false)
    const [lazyParams, setLazyParams] = useState({
        first: 0,
        size: 20,
        page: 0,
        sort: "id,desc",
        search: "#",
        rows: 5
    });
    const [total, setTotal] = useState(null);

    useEffect(
        () => {
            getSearchData();
        },
        [loadding, lazyParams]
    )
    const hanleChangeStatus = async (product) => {        
        let _product = {...product};
        _product.createdAt =  null;
        _product.updatedAt =  null;

        let result = await axios.put('http://localhost:8080/user/update-status',_product, {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if(result.data){
            toast.current.show({ severity: 'info', detail: 'Thay đổi trạng thái người dùng thành công!' });
        }else{
            toast.current.show({ severity: 'error', detail: 'Thay đổi trạng thái người dùng thất bại!' });
        }
        setLoadding(!loadding);
    }


    const getSearchData = async () => {
        // phụ
        let idString = null;
        let result = await axios.get('http://localhost:8080/user/search', {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            params: lazyParams
        });

        setDataOld(result.data.result);
        setTotal(result.data.result?.totalElements);
        // setData_atom_dataProduct(data.data.result.content)
    }

    const handleChangeParams = (page) => {
        let _param = { ...lazyParams };
        _param.page = page[0] - 1;
        setLazyParams(_param);
    }

    // const handleChangeSize = (e) => {
    //     let _param = { ...lazyParams };

    //     _param.size = e.target.value || 10 ;
    //     setLazyParams(_param);
    // }

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

    const imageBodyTemplate = (product) => {
        return <img src={product?.image} alt={product?.image} className="w-2rem h-3rem shadow-2 border-round" />;
    };

    const sexBodyTemplate = (product) => {
        let strSex = product?.sex == 0 ? "Male" : product?.sex == 1 ? "Female" : product?.sex == 2 ? "Orther" : "";
        return strSex;
    }

    const dateOfBirthBodyTemplate = (product) => {
        return formattedDate(product?.dateOfBirth);
    }


    const idTemplate = (product) => {
        return `#${product?.id}`;
    };

    const priceBodyTemplate = (product) => {
        return formattedAmount(product?.price);
    };

    const categoryTemplate = (product) => {
        let result = listCategory.filter(o => o.id === product.categoryId)[0].name;
        return result;
    }

    const statusBodyTemplate = (product) => {
        return <Tag value={product?.status ? "Active" : "Inactive"} severity={getSeverity(product)}></Tag>;
    };

    const actionTemplate = (product) => {
        const items = [
            {
                label: 'Update',
                icon: 'pi pi-refresh',
                command: () => {
                    // toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
                }
            },
            {
                label: 'Change status',
                icon: 'pi pi-times',
                command: () =>
                    hanleChangeStatus(product)
                    // toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
                
            },
        ]
        return <SplitButton
            // onClick={save} 
            model={items}

        />;
    };

    const getSeverity = (product) => {
        switch (product?.status) {
            case true:
                return 'success';

            // case 'LOWSTOCK':
            //     return 'warning';

            case false:
                return 'danger';

            default:
                return null;
        }
    };

    const renderTable = () => {

        return (
            <div className='uuu'>
                {/* <DataTable
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
                </DataTable> */}

                <DataTable
                    value={dataOld?.content}
                    // header={header}
                    // footer={footer}
                    tableStyle={{ minWidth: '100%' }}
                // onPage={onPage}
                // paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}

                >
                    <Column field="id" header="id"></Column>
                    <Column field="username" header="User Name"></Column>
                    <Column field="email" header="Email"></Column>

                    <Column field="fullname" header="Full Name"></Column>

                    <Column field="Sex" header="Sex" body={sexBodyTemplate}></Column>
                    <Column field="dateOfBirth" header="Date Of Birth" body={dateOfBirthBodyTemplate}></Column>


                    <Column field="address" header="Address"></Column>

                    <Column field="roleId" header="Role Id"></Column>

                    {/* <Column field="createdAt" header="createdAt"></Column>
                    <Column field="updatedAt" header="updatedAt"></Column> */}



                    {/* <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate}></Column>

                    <Column field="soldQuantity" header="Số lượng trong kho"></Column>
                    <Column field="cartQuantity" header="Số lượng trong giỏ hàng"></Column>
                    <Column field="stock" header="Số lượng đã bán"></Column> */}

                    {/* <Column field="category" header="Category" body={categoryTemplate}></Column> */}
                    {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column> */}
                    <Column header="Status" body={statusBodyTemplate}></Column>
                    <Column header="Action" body={actionTemplate}></Column>
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
                <div className='header'>
                    <div className='header-navbar flex justify-content-end'>
                        <div className='header-navbar-right'>
                            {/* <button class="btn btn-outline-customer" type="submit" onClick={(e) => setVisible(true)}>Tạo mới</button> */}
                            <nav aria-label="...">
                                <ul class="pagination mb-0 ml-1">
                                    <li class="page-item disabled">
                                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                    </li>
                                    {renderPageItem(dataOld)}
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
                            {/* <div className='w-2rem'>
                                <input placeholder='Size' onChange={handleChangeSize} style={{width: "2rem", height: "auto"}} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>



            {/* <div className="layout">
                
            </div> */}
            {renderTable()}
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
            <Toast ref={toast} />
        </div>
    )
}
