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
import { Checkbox } from 'primereact/checkbox';

import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import { refreshData, token_global } from "../../../recoil/My/atomHandle";

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
import QRScanner1213 from "../../components/ScannerQr1213/index"


export default function TestShopee(props) {
    
    return (
        <>
            <QRScanner1213></QRScanner1213>
        </>
    )
}
