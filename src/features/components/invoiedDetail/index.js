import 'boxicons'
import "./styles.scss";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
export default function InvoiedDetail(props) {
    const { content, cancel, data } = props;
    const [selected, setSelected] = useState();
    const changeVaiTro = (e) => {
        console.log(e, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        setSelected(e.target.value);
    }
    return (
        <div className='detail'>
            <div className='detail__header'>
                <div className='detail__header__content'>
                    {content}
                </div>
            </div>
            <div className='detail__body'>
                <div className='detail__body__input'>
                    <span className='detail__body__input__textSmall'>Người liên hệ</span>
                    <div>
                        {data?.contact}
                    </div>
                </div>
                <div className='detail__body__input'>
                    <span>Tên nhân sự</span>
                    <div className='detail__body__input__search'>
                        <input type='text' placeholder='Chọn nhân lực'></input>
                        <i class='bx bx-search-alt-2' />
                    </div>
                </div>
                <div className='detail__body__input'>
                    <span>Nhóm người dùng</span>
                    <div className='detail__body__input__search'>
                        <input type='text' placeholder='Tìm kiếm nhóm người dùng'></input>
                        <i class='bx bx-search-alt-2' />
                    </div>
                </div>
                <div className='detail__body__input'>
                    <span>Vai trò</span>
                    <select value={selected} onChange={(e) => {changeVaiTro(e)}}>
                        <option key='1' value="volvo">Giám đốc Khối sản xuất</option>
                        <option key='2' value="saab">Presale</option>
                        <option key='3' value="mercedes">Nhân viên Pháp chế</option>
                        <option key='4' value="audi">Nhân viên Tư vấn bán hàng</option>
                    </select>
                </div>
            </div>
            <div className='detail__footer'>
                <div className='detail__footer__right'>
                    <button onClick={() => cancel()} className='detail__footer__right__cancel'>
                        Hủy
                    </button>
                    <button onClick={() => cancel()} className='detail__footer__right__save'>
                        <i class='bx bxs-save' />
                        <div>Lưu</div>
                        
                    </button>

                </div>
            </div>
        </div>
    )
}

// InvoiedDetail = forwardRef(InvoiedDetail);
// export default InvoiedDetail;