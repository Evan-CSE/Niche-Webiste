import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';
import FirebaseInit from '../Firebase/FirebaseInit'

export default function PrivateRoute({ children, ...rest }) {
    const {  isLoading } = FirebaseInit();
    const [user] = useContext(UserContext);
    if(isLoading){
        return <div>loading</div>
    }
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user?.email? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
}
