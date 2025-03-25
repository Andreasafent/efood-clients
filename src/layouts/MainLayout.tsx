import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

function MainLayout(){
    return (
        <div>
            <Header />
            <div className="p-6 bg-gray-50">
                <Outlet />                
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default MainLayout;