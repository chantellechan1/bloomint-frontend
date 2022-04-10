import React, { useState } from "react";
import axiosInstance from "../services/AxiosService";

const CreateAccount = (props: any) => {
    const [email, setEmail] = useState('');
    const [password, setPw] = useState('');

    const handleCreateAccount = async () => {
        try {
            let res = await axiosInstance.post(
                `/auth/create_user`,
                { email: email },
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <React.Fragment>
            <div className="text-center mt-5 pt-5">
                <div className="row">
                    <div className="col-xs-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
                        <form>
                            <h1 className="h3 mb-3 fw-normal">New Account Page</h1>
                            <div className="form-floating mb-3">
                                <input
                                    type="email" className="form-control" id="floatingInput" placeholder="name@email.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <button
                                type="button" className="w-100 btn btn-outline-primary"
                                onClick={() => { handleCreateAccount() }}
                            >
                                Confirm Email
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default CreateAccount;
