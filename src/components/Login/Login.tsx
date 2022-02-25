import React from "react";

const Login = () => {
    return (
        <React.Fragment>
            <div className="text-center mt-5 pt-5">
                <div className="row">
                    <div className="offset-md-3 col-xs-12 col-md-6">
                        <form>
                            <h1 className="h3 mb-3 fw-normal">Sign In Page</h1>
                            <div className="form-floating">
                                <input type="email" className="form-control" id="floatingInput" placeholder="name@email.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="password" />
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
                            <button className="w-100 btn btn-lg btn-primary" type="submit"data-form-type="action,login">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
};

export default Login;