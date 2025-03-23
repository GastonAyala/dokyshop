import React from 'react';
import image from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { API_HOST } from '../../environment';

function SideBar() {
    return (
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul style={{backgroundColor: '#407FB9'}} className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href={API_HOST} style={{height:'100px'}}>
                    <div className="sidebar-brand-icon">
                        <img className="w-100" style={{height:"80px"}} src={image} alt="Dokyshop" />
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Panel de control</span>
                    </Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider" />

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/categorias">
                        <i className="fa-solid fa-table-list"></i>
                        <span>Categorías</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/subcategorias">
                        <i className="fa-solid fa-list"></i>
                        <span>Subcategorías</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/productos">
                    <i className="fa-solid fa-box-open"></i>
                        <span>Productos</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/usuarios">
                    <i className="fa-solid fa-user"></i>
                        <span>Usuarios</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/ordenes">
                    <i className="fa-regular fa-newspaper"></i>
                        <span>Ordenes</span>
                    </Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
            {/*<!-- End of Sidebar -->*/}

        </React.Fragment>
    )
}
export default SideBar;