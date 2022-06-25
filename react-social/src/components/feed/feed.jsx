import React, { useContext, useEffect, useState } from 'react'
import './feed.css'
import Share from '../share/share';
import Post from '../post/post';
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext';

export default function Feed({username}) {
    const [Posts,setPosts] = useState([]);
    const {user} = useContext(AuthContext);
    // console.log(user._id,username);
    useEffect(()=>{
        try{
            const fetchPosts = async()=>{
                const res=(username)
                ? await axios.get("/posts/profile/"+username)
                : await axios.get("/posts/timeline/"+user._id);
                setPosts(res.data.sort((p1,p2)=>{
                    return new Date(p2.createdAt) -new Date(p1.createdAt);
                }));
                // console.log(res.data);
            }
            fetchPosts();
        }
        catch(err){
            console.log(err);
        }
    },[username]);
    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <Share/>
                {Posts.map((p)=>{
                    return <Post key={p._id} post={p}/>
                })}
            </div>
        </div>
    );
}
