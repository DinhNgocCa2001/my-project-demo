import 'boxicons'
import "./styles.scss";
import React, { useEffect, useRef, useState } from 'react';
import CreateDialog from '../createDialog';
import InvoiedDetail from '../invoiedDetail';
import SplitButton from '../splitButton';

export default function Demo(props) {
    const { title, listPerson } = props;
    const [listRender, setListRender] = useState([]);
    const [content, setContent] = useState("Thu gọn");
    const [appear, setAppear] = useState(false);
    const [isAll, setIsAll] = useState(true);
    const [disable, setDisable] = useState(false);
    const [abc, setAbc] = useState(false);
    const [editData, setEditData] = useState(null);
    useEffect(() => {
        if (listPerson.length >= 2) {
            setListRender(listPerson.slice(0, 2));
            setAppear(true);
        } else {
            setListRender(listPerson);
            setAppear(false);
        }
    }, [listPerson])

    useEffect(() => {
        if (isAll) {
            setListRender(listPerson.slice(0, 2));
            setContent("Xem thêm");
        } else {
            setListRender(listPerson);
            setContent("Thu gọn");
        }
    }, [isAll])

    const renderConfig = () => {
        let _listPerson = [...listPerson]
        setListRender(_listPerson);
        setIsAll(!isAll);
    }

    const create = () => {
        setEditData(null);
        setAbc(true);
    }

    const edit = (data) => {
        setAbc(true)
        console.log("ca dz")
        setEditData(data)
    }

    const deleteItem = (data) => {
        
        console.log("ca dz đang tập xóa")
        
    }

    const cancel = () => {
        setAbc(false);
    }

    const renderEndButton = (data) => {
        var items = []
        data ? 
            items = [{
                label: "Sửa",
                action: () => edit(data),
            },
            {
                label: "Xóa",
                action: () => deleteItem(data),
            }
            ]
        : 
            items = [
                {
                    label: "Thêm",
                    action: () => create(),
                },
            ]

        return(
            <SplitButton items={items}></SplitButton>
        )
    }

    const invoiedProduct = () => {
        return (
            <div className='card'>

                <div className='card__header'>
                    <div className='card__header__left'>
                        <div className='card__header__left__icon'>
                            <i class='bx bx-user-plus' />
                        </div>
                        <div className='card__header__left__title'>
                            {title}
                        </div>

                    </div>
                    <div className='card__header__right'>
                        {renderEndButton()}
                    </div>
                </div>
                {listRender?.map((person, index) =>
                (
                    <div key={index} className='card__body'>
                        <div className='card__body__left'>
                            <div className='card__body__left__icon'>
                                <i class='bx bx-user-circle' />
                            </div>
                            <div className='card__body__left__info'>
                                <div className='card__body__left__info__name'>
                                    {person.name}
                                </div>
                                <div className='card__body__left__info__detail'>
                                    <div>
                                        Vai trò: {person.vai_tro}
                                    </div>
                                    <div>
                                        Chức vụ: {person.chuc_vu}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card__body__right'>
                            {renderEndButton(person)}
                        </div>
                    </div>
                )
                )}
                {appear
                    ?
                    <div className='card__footer'>
                        <a onClick={() => renderConfig()}>{content}</a>
                    </div>
                    : null
                }
            </div>
        )
    }

    return (
        <div className='main'>
            {invoiedProduct()}
            <CreateDialog disable={abc}>
                <InvoiedDetail
                    //ref={ref} 
                    content={editData ? "Chỉnh sửa nhân sự liên quan" : "Thêm mới nhân sự liên quan"}
                    cancel={cancel}
                    data={editData} >
                </InvoiedDetail>
            </CreateDialog>
        </div>
    )
}