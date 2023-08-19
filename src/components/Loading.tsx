import React from 'react'

const LoadingComponent = () => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-success" role="status">
        </div>
      </div>
    </React.Fragment>
  )
}

export default LoadingComponent
