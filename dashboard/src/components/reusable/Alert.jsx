import React from 'react'

export const Alert = ({message}) => {
    return (
        <div class="alert alert-info" role="alert">
            {message}
        </div>
    )
}
