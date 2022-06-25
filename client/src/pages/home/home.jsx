import Topbar from "../../components/topbar/topbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Rightbar from "../../components/rightbar/rightbar.jsx";
import Feed from "../../components/feed/feed.jsx";
import "./home.css";

function Home(){
    return(
        <>
            <Topbar/>
            <div className="homeContainer">
                <Sidebar/>
                <Feed/>
                <Rightbar/>
            </div>
        </>
    );
}

export default Home;