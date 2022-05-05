import React, { useEffect, useState } from "react";
import axios from "axios";
import * as AxiosService from '../services/AxiosService';
import { RiLogoutBoxLine } from "react-icons/ri";

const Settings = (props: { setLoading: any, handleLogout: any }) => {

    const handleLogout = props.handleLogout;
    const [userInfo, setUserInfo] = useState({ email: '', created_at: '' });

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                props.setLoading(true);
                const res = await axios.get('/auth/get_user', AxiosService.getOptionsAuthed());

                setUserInfo(res.data);
            } catch (e) {
                console.log(e)
            } finally {
                props.setLoading(false);
            }
            
        }

        getUserInfo();
    }, []);


    return (
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