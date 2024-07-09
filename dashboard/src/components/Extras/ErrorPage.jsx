import React from "react";
import gato from '../../assets/images/gato.404.gif';
import '../../assets/css/notFound.css';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
    return (
        <>
            <main className="body-err404">
                <div className="main-err-404">
                    <div className="div">
                        <div className="contenedor">
                            <img className="gif-gato" src={gato} alt="error-404" />
                            <h1 className="titulo-404">
                                404
                            </h1>
                            <h2>
                                Página no encontrada
                            </h2>
                        </div>
                        <div className="contenedor-btn">
                            <Link to="/">
                                <button type="submit" className="btn">
                                    Volver al inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}