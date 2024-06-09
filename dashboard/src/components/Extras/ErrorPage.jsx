import React from "react";;
import imagenError from "../../assets/images/imagenError.jpg";
export const ErrorPage = () => {
    return (
        <div style={{backgroundColor : 'black'}}> 
            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 100 +'vw', height: 100 +'vh'}} src={imagenError} alt=" Star Wars - Mandalorian "/>
        </div>
    )
}