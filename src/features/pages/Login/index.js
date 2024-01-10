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



// import "./styles.scss";

export default function Login(props) {
    const { setUserVisible } = props;
    const userEmpty =
    {
        "email": null,
        "password": null
    }
    const setRefreshData = useSetRecoilState(refreshData);
    const setToken_global = useSetRecoilState(token_global);


    const [login, setLogin] = useState(userEmpty);
    const [user, setUser] = useState(userEmpty);
    const [error, setError] = useState('');

    const submitLogin = () => {
        let result = axios.post("http://localhost:8080/user/login",
            {
                "email": user.email,
                "password": user.password
            }
        ).then((data) => {
            console.log(data, "uuuuuuuuuuuuuuuuuuuuuuuuuu")
            if (data.data.code == "00") {
                setUserVisible(false);
                setLogin(data.data)
                setError('')
                localStorage.setItem("token", data.data.result);
                setUser({});
                setToken_global(data.data.result);
            } else {
                // message.error("Đăng nhập không thành công")
                setError("Đăng nhập không thành công: Vui lòng kiểm tra lại tài khoản và mật khẩu")
                localStorage.removeItem("token");
            }
        }).catch((ex) => {
            console.error(ex);
        })
    }

    const createUser = async () => {
        let result = await axios.post("http://localhost:8080/user/create", user);

        if (!result.data?.result) {
            setError("Tài khoản đã tồn tại")
            localStorage.removeItem("token");
        } else {
            setUserVisible(false);
            // setLogin(data.data)
            setError('')
            localStorage.setItem("token", result.data?.result);
            setUser({});
            setRefreshData(Math.random());
        }

    }

    const applyServiceChangeUser = (prop, val) => {
        let _detail = _.cloneDeep(user)

        _detail[prop] = val

        setUser(_detail)
        //performValidate([prop], _detail)
        console.log(_detail, "sssssssssssssssssssss")
    }
    const handleChangeUsername = (e) => {
        applyServiceChangeUser('email', e.target.value)
    }
    const handleChangePassword = (e) => {
        applyServiceChangeUser('password', e.target.value)
    }

    //// create account

    const handleChangeFirstName = (e) => {
        applyServiceChangeUser('firstName', e.target.value)
    }

    const handleChangeLastName = (e) => {
        applyServiceChangeUser('lastName', e.target.value)
    }

    const handleChangeEmail = (e) => {
        applyServiceChangeUser('email', e.target.value)
    }

    const handleChangeDateOfBirth = (e) => {
        applyServiceChangeUser('dateOfBirth', e.target.value)
    }

    const handleChangeAddress = (e) => {
        applyServiceChangeUser('address', e.target.value)
    }

    const handleChangeSex = (e) => {
        applyServiceChangeUser('sex', e.value)
    }

    return (
        <>
            <TabView>
                <TabPanel header="Sign In">
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-2 lg:px-8">
                        <h2 className="text-center text-base leading-9 tracking-tight text-yellow-500">
                            Welcome back!
                        </h2>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div
                                className="space-y-6"
                            >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="block w-full border-0 border-round px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangeUsername}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="block w-full border-0 border-round px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            onChange={handleChangePassword}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <button
                                        // type="submit"
                                        onClick={() => submitLogin()}
                                        className="flex w-full justify-center bg-secondary border-round px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </div>

                            <p className="mt-10 text-right text-sm text-red-500">
                                {error}
                            </p>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Start a 14 day free trial
                                </a>
                            </p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Sign Up">
                    <div className="">
                        <h2 className="text-center text-base leading-9 tracking-tight text-yellow-500">
                            Get up to 2% back on every purchase!
                        </h2>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <div class="row g-3">
                                <div class="col">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="First name"
                                        aria-label="First name"
                                        onChange={handleChangeFirstName}
                                    />
                                </div>
                                <div class="col">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Last name"
                                        aria-label="Last name"
                                        onChange={handleChangeLastName}
                                    />
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col">
                                    <input
                                        type="Email"
                                        class="form-control"
                                        placeholder="Email"
                                        aria-label="First name"
                                        onChange={handleChangeEmail}
                                    />
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col">
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="Password"
                                        aria-label="First name"
                                        onChange={handleChangePassword}
                                    />
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col">
                                    <input
                                        type="date"
                                        class="form-control"
                                        placeholder="Date Of Birth"
                                        aria-label="First name"
                                        onChange={handleChangeDateOfBirth}
                                    />
                                </div>
                            </div>
                            <div class="row g-3">
                                <div class="col">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Address"
                                        aria-label="First name"
                                        onChange={handleChangeAddress}
                                    />
                                </div>
                            </div>
                            <div class="row g-3 pl-2 flex flex-wrap justify-content-left gap-3">
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="ingredient1"
                                        name="pizza"
                                        value="0"
                                        onChange={handleChangeSex}
                                        checked={user?.sex == 0 ? true : false}
                                    />
                                    <label htmlFor="ingredient1" className="ml-2">Male</label>
                                </div>
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="ingredient2"
                                        name="pizza"
                                        value="1"
                                        onChange={handleChangeSex}
                                        checked={user?.sex == 1 ? true : false}
                                    />
                                    <label htmlFor="ingredient2" className="ml-2">Female</label>
                                </div>
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="ingredient2"
                                        name="pizza"
                                        value="2"
                                        onChange={handleChangeSex}
                                        checked={user?.sex == 2 ? true : false}
                                    />
                                    <label htmlFor="ingredient2" className="ml-2">Orther</label>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <button
                                    onClick={() => createUser()}
                                    className="flex w-full justify-center border-round bg-secondary py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gradient focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create Account
                                </button>
                            </div>
                            <p className="mt-10 text-right text-sm text-red-500">
                                {error}
                            </p>

                            <p className="mt-10 text-center text-sm text-gray-500">
                                Not a member?{' '}
                                <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    Start a 14 day free trial
                                </a>
                            </p>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </>
    )
}
