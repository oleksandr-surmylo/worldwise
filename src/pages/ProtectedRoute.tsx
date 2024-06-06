import { ReactNode, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";

type ProtectedRouteProps = {
    children: ReactNode
}

const ProtectedRoute = ( { children }: ProtectedRouteProps ) => {
    const { isAuthenticated } = useAuth ()
    const navigate = useNavigate ()

    useEffect ( () => {
        if ( !isAuthenticated ) navigate ( '/' )
    }, [ isAuthenticated, navigate ] )

    return isAuthenticated ? <>{ children }</> : null
};

export default ProtectedRoute;