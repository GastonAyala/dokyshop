import SideBar from '../components/Dashboard/SideBar'
import TopBar from '../components/Dashboard/TopBar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/reusable/Footer'

export const Root = () => {
  return (
    <>
      <div id="wrapper">
        <SideBar />

        <div id="content-wrapper" className="d-flex flex-column">
          {/*<!-- Main Content -->*/}
          <div id="content">
            <TopBar />

            <Outlet />

            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Root