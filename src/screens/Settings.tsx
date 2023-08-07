import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as AxiosService from '../api/AxiosService';
import { RiLogoutBoxLine } from "react-icons/ri";

const Settings = (props: { setUserToken: any }) => {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("userToken", "");
        props.setUserToken(localStorage.getItem("userToken"));

        // take us back to home page
        navigate("/");
    };

    const [userInfo, setUserInfo] = useState({ email: '', created_at: '' });

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await axios.get('/auth/get_user', AxiosService.getOptionsAuthed());

                setUserInfo(res.data);
            } catch (e) {
                console.log(e)
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
    );
};

export default Settings;
