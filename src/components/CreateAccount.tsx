import React, { useState } from "react";
import { Link } from "react-router-dom";
import { server } from "../server";

const CreateAccount = (props: { setLoading: any }) => {
    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);

    const handleCreateAccount = async () => {
        try {
            props.setLoading(true);
            await server.CreateAccount({email});
            setShowConfirm(true);
        } catch (error) {
            console.error(error);
            setErrorText('Account creation failed, check console for details.');
        } finally {
            props.setLoading(false);
        }
    }

    return (
        <React.Fragment>

            <div className="text-center mt-5 pt-5 px-5">
                {
                    errorText !== ''
                    &&
                    <div className="alert alert-danger mb-3" role="alert">
                        {errorText}
                    </div>
                }
                {
                    showConfirm
                    &&
                    <div className="alert alert-success mb-3" role="alert">
                        Thanks for signing up! Please check your email for next steps.
                    </div>
                }
                <div className="row">
                    <div className="col-xs-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4">
                        <form>
                            <h1 className="h3 mb-3 fw-normal">Create New Account</h1>
                            <div className="form-floating mb-3">
                                <input
                                    type="email" className="form-control" id="floatingInput" placeholder="name@email.com"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <button
                                type="button" className="w-100 btn btn-outline-primary"
                                onClick={handleCreateAccount}
                            >
                                Confirm Email
                            </button>
                        </form>
                    </div>

                    <div className="col-xs-12 offset-md-3 col-md-6 offset-lg-4 col-lg-4 mt-3">
                        <Link to="/">
                            <div className="w-100 btn btn-outline-primary">
                                Go Back
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default CreateAccount;
