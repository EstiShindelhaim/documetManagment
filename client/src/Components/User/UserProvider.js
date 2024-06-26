import { useState, useEffect } from "react";
import UserContext from './UserContext';

const UserProvider = ({ children, user1 }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        if(user1){
            setUser(user1);
        }
    }, [user1]);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;