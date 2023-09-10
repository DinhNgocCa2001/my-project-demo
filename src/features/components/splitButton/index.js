import 'boxicons'
import "./styles.scss";
import React, { useEffect, useRef, useState } from 'react';
export default function SplitButton(props) {
    const {items} = props;
    const [disable, setDisable] = useState(true);
    const renderList = () => {
        setDisable(!disable);
    }

    return (
        <div className='splitbutton'>
            <button
                onClick={() => renderList()}
            ><span class='bx bxs-down-arrow' /></button>
            <ul
                className={disable ? `display-hidden` : null}
            >
                {
                    items?.map((item, index) => (
                   <li index={index}>
                        <a onClick={item.action}>
                            {item.label}
                        </a>
                    </li>
                    ))
                }
            </ul>
            {/* <select name="cars" id="cars">
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select> */}
        </div>

    )
}


                //     <option value={item.label}>
                //     <a onClick={item.action}>
                //         {item.label}
                //     </a>
                // </option>