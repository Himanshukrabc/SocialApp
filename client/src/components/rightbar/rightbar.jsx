import React, { useContext, useEffect, useState } from 'react'
import './rightbar.css'
import {Users} from "../../dummydata"
import Online from '../online/online.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {Add,Remove} from "@mui/icons-material"

export default function Rightbar({user}) {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFirends] = useState([]);
    const {user:curuser,dispatch} = useContext(AuthContext);
    const [followed,setFollowed] = useState(curuser.following.includes(user?._id));
    useEffect(()=>{
        // Cant use async in useEffect(==>()<==) function   
        const getFriends=async ()=>{
            try{
                const friendList = await axios.get("/users/friends/"+user?._id);
                setFirends(friendList.data);
            }
            catch(err){
                console.log(err);
            }
        }
        getFriends();
    },[user]);
    useEffect(()=>{
        if(user)setFollowed(curuser.following.includes(user._id));
    },[user,curuser]);
    // console.log(friends);
    const HomeRightBar=()=>{
        return(
            <>
                <div className="birthdayContainer">
                    <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
                    <span className="birthdayText"><b>XYZ</b> and <b>3 others</b> have bithday today</span>
                </div>
                <img src={`${PF}ad.jpg`} alt="" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u)=>{
                        return <Online key={u.id} user={u}/>
                    })}
                </ul>
            </>
        );
    };
    const clickHandler=async()=>{
        try{
            if(followed){
                await axios.put("/users/"+user._id+"/unfollow",{userId:curuser._id});
                dispatch({type:"UNFOLLOW",payload:user._id});
            }
            else {
                await axios.put("/users/"+user._id+"/follow",{userId:curuser._id});
                dispatch({type:"FOLLOW",payload:user._id});
            }
            setFollowed(!followed);
        }
        catch(err){
            console.log(err);
        }
    }
    const ProfileRightBar=()=>{
        return(
            <>
                {user.username !== curuser.username &&
                    <button className='rightbarFollowButton' onClick={clickHandler}>
                        {followed?"Unfollow ":"Follow "}
                        {followed?<Remove/>:<Add/>}
                    </button>
                }
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{((user.relationship===1)?"Single":((user.relationship===2)?"Married":"Complicated"))}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                {   friends.map((friend,ind)=>{
                    return(
                        <Link key={`${ind}`} to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
                            <div className="FollowingWrapper">  
                                <div className="rightbarFollowing">
                                    <img src={`${PF}${friend.profilePicture||"person/noavatar.png"}`} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </div>
                        </Link>
                    );
                    })
                }
                </div> 
            </>
        );
    };
    const func=()=>{
        if(!user)return <HomeRightBar/>
        else return <ProfileRightBar/>
    }
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {func()}
            </div>
        </div>
    );
}
