import React, { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import {Search,Person,Chat,Notifications} from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar(){
    const {user} = useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
                <span className="logo">HSocial</span>
            </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon"/>
                    <input placeholder="Search Friends/Posts" className="searchInput"/>
                </div>
            </div>
            <div className="topbarIcons">
                <div className="topbarIconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                    <Chat/>
                    <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={`${PF}${user.profilePicture||"person/noavatar.webp"}`} alt="ProfilePicture" className="topbarImg"/>
                </Link>
            </div>
        </div>
    );
}