import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../services/AxiosService";

const handleLogin = async (email: string, pw: string, setLoginErr: Function, nav: Function) => {

    try {

        // attempt login
        let res = await axiosInstance.post(
            `/auth/login`,
            { email: email, password: pw },
        );
        
        // store user token in temporary session storage
        // TODO: figure out where to store this in capacitor on android
        sessionStorage.setItem('userToken', res.data.token);

        // navigate to home
        nav('/');

    } catch (error) {
        console.error(error);
        setLoginErr('Error Logging In')
    }

}

const ErrorMessage = (props: any) => {
    return (
        <React.Fragment>
            <div className="alert alert-danger mb-3" role="alert">
                {props.loginErr}
            </div>
        </React.Fragment>
    )
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPw] = useState('');
    const [loginErr, setLoginErr] = useState('');

    const nav = useNavigate();

    return (
        <React.Fragment>
            {
                loginErr !== '' && <ErrorMessage loginErr={loginErr} />
            }
            <div className="text-center mt-5 pt-5">
                <div className="row">
                    <div className="col-xs-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
                        <form>
                            <h1 className="h3 mb-3 fw-normal">Sign In Page</h1>
                            <div className="form-floating mb-3">
                                <input
                                    type="email" className="form-control" id="floatingInput" placeholder="name@email.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="password" className="form-control" id="floatingPassword" placeholder="password"
                                    value={password} onChange={(e) => setPw(e.target.value)}
                                />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>
                            {/*                             
                                <div className="checkbox mb-3">
                                    <label>
                                        <input type="checkbox" value="remember-me" data-form-type="consent,rememberme" /> 
                                        Remember me
                                    </label>
                                </div> 
                            */}
                            <button
                                type="button" className="w-100 btn btn-outline-primary"
                                onClick={() => { handleLogin(email, password, setLoginErr, nav) }}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Login;