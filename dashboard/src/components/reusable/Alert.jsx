import React from 'react'

export const Alert = ({message}) => {
    return (
        <div className="alert alert-info" role="alert">
            {message}
        </div>
    )
}
