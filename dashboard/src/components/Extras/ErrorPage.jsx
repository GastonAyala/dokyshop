import React from "react";
import gato from '../../assets/images/gato.404.gif';
import '../../assets/css/notFound.css';
export const ErrorPage = () => {
    return (
        <>
            <body className="body-err404">
                <main className="main-err-404">
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
                            <form action="/">
                                <button type="submit" className="btn">
                                    Volver al inicio
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </body>
        </>
    )
}