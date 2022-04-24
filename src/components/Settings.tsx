import React, { useEffect, useState } from "react";
import axios from "axios";
import * as AxiosService from '../services/AxiosService';
import { RiLogoutBoxLine } from "react-icons/ri";
import LoadingComponent from "./Loading";

const Settings = (props: any) => {

    const handleLogout = props.handleLogout;
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({ email: '', created_at: '' });

    useEffect(() => {
        const getUserInfo = async () => {
            const res = await axios.get('/auth/get_user', AxiosService.getOptionsAuthed());

            setUserInfo(res.data);
            setLoading(false);
        }

        getUserInfo();
    }, []);


    return (
        loading ?
            <React.Fragment>
                <div className='mt-5'>
                    <LoadingComponent />
                </div>
            </React.Fragment>
            :
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row text-center mb-3 mt-1">
                        <h1>Settings</h1>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            {/* TODO: implement get user information function */}
                            <h3>{userInfo.email}</h3>
                            Joined Bloom: 
                            <br />
                            {userInfo.created_at}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-outline-danger" onClick={() => { handleLogout() }}>
                                <RiLogoutBoxLine /> Log out
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
    )
};

export default Settings;