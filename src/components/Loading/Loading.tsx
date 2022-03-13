import React from "react";

const LoadingComponent = () => {
    return (
        <React.Fragment>
            <div className="row">
                <div className="col text-center">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LoadingComponent;