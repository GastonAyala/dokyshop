import React from 'react';
import image from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <React.Fragment>
            {/*<!-- Sidebar -->*/}
            <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/*<!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="http://localhost:3030/">
                    <div className="sidebar-brand-icon">
                        <img className="w-100" style={{height: 80 + "px"}} src={image} alt="Digital House" />
                    </div>
                </a>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider my-0" />

                {/*<!-- Nav Item - Dashboard -->*/}
                <li className="nav-item active">
                    <Link className="nav-link" to="/">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Panel de control</span></Link>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider" />


                {/*<!-- Nav Item - Charts -->*/}
                <li className="nav-item">
                    <Link className="nav-link" to="/productos">
                    <i className="fa-solid fa-box-open"></i>
                        <span>Productos</span></Link>
                </li>

                {/*<!-- Nav Item - Genres in DB -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/genres">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Categorias</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Last Movie in DB -->*/}
                <li className="nav-item">
                    <Link className="nav-link collapsed" to="/Products/last">
                    <i className="fa-solid fa-user"></i>
                        <span>Usuarios</span>
                    </Link>
                </li>

                {/*<!-- Nav Item - Tables -->*/}
                <li className="nav-item">
                    <a className="nav-link" href="/">
                    <i className="fa-solid fa-cart-shopping"></i>
                        <span>Ordenes</span></a>
                </li>

                {/*<!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block" />
            </ul>
            {/*<!-- End of Sidebar -->*/}

        </React.Fragment>
    )
}
export default SideBar;