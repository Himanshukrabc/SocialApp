import {createContext,useReducer} from 'react';
import AuthReducer from './AuthReducer'

const INITIAL_STATE={
    user:{
        "_id": "626e62e0a46874fe35d70b11",
        "username": "Amy",
        "email": "KoiNa@gmail.com",
        "profilePicture": "person/8.avif",
        "followers": [
            "626e62eba46874fe35d70b13"
        ],
        "following": [
        ],
        "isAdmin": false,
        "createdAt": "2022-05-01T10:37:20.179Z",
        "__v": 0,
        "coverPicture": "posts/11.jpg",
        "city": "New York",
        "desc": "Hey I am Amy!",
        "from": "Porto Rico",
        "relationship": 2
    },
    isFetching:false,
    error:false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    );
}