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
import { generateRandomId } from '../../common/Constant';
import { Dropdown } from 'primereact/dropdown';
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { atom_cart } from "../../../recoil/My/atomHandle";



// import "./styles.scss";

export default function Cart(props) {
    const setData_AtomCart = useSetRecoilState(atom_cart)
    const data_AtomCart = useRecoilValue(atom_cart)
    const _data_AtomCart = [
        {name: "ca"}, {name: "hang"}
    ]
    const renderItem = (item) => {
        return(
            <li class="list-group-item">
                {item?.name}
            </li>
        )
    }
    return (
        <div style={{ height: '400px', width: '400px' }} >
            <ul class="list-group list-group-flush">
                {_data_AtomCart?.map((item) => renderItem(item))}
            </ul>
        </div>
    )
}
