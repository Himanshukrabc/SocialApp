import React, { useState,useEffect } from 'react'
import Topbar from "../../components/topbar/topbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Rightbar from "../../components/rightbar/rightbar.jsx";
import Feed from "../../components/feed/feed.jsx";
import './profile.css'
import axios from 'axios';
import { useParams } from 'react-router';

export default function Profile() {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setuser] = useState({});
    const username=useParams().username;
    useEffect(()=>{
        try{
            const fetchUsers = async()=>{
                const res=await axios.get(`/users?username=${username}`);
                setuser(res.data);
            }
            fetchUsers();
        }
        catch(err){
            console.log(err);
        }
    },[username]);
    // console.log(user);
    return (
      <>
        <Topbar/>
        <div className="profile">
            <Sidebar/>
            <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src={`${PF}${user.coverPicture||"person/nocover.jpg"}`} alt="" className="profileCoverImg" />
                    <img src={`${PF}${user.profilePicture||"person/noavatar.webp"}`} alt="" className="profileUserImg" />
                </div>
                <div className="profileInfo">
                    <h4 className='profileInfoName'>{user.username}</h4>
                    <span className='profileInfoDesc'>{user.desc}</span>
                </div>
            </div>
            <div className="profileRightBottom">
                <Feed username={username}/>
                <Rightbar user={user}/>
            </div>
            </div>
        </div>
      </>
    )
}
