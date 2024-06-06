import { createContext, ReactNode, useContext, useReducer } from "react";

type User = {
    name: string,
    email: string,
    password: string,
    avatar: string,
};

type State = {
    user: User | null
    isAuthenticated: boolean
    error: boolean
}

type LoginAction = {
    type: 'login'
    payload: User
}

type ErrorAction = {
    type: 'errorAuth'
}

type LogoutAction = {
    type: 'logout'
}

type AuthAction = LoginAction | LogoutAction | ErrorAction

const initialState: State = {
    user: null,
    isAuthenticated: false,
    error: false
}

const FAKE_USER: User = {
    name: "Alex",
    email: "alex@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

// const fakeAuthContext: FakeAuthContext = {
//     user: {} as User,
//     isAuthenticated: false,
//     login: () => {},
//     logout: () => {}
// }

type FakeAuthContext = {
    user: User | null
    isAuthenticated: boolean
    login: ( email: string, password: string ) => void
    logout: () => void
    error: boolean
}

const AuthContext = createContext<FakeAuthContext | null> ( null )

function reducer ( state: State, action: AuthAction ): State {
    switch ( action.type ) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case "errorAuth":
            return {
                ...state,
                error: true
            }
        case "logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            throw new Error ( "Unknown action" )
    }
}

function AuthProvider ( { children }: { children: ReactNode } ) {
    const [ { user, isAuthenticated, error }, dispatch ] = useReducer ( reducer, initialState )

    function login ( email: string, password: string ): void {
        if ( email === FAKE_USER.email && password === FAKE_USER.password ) {
            dispatch ( { type: 'login', payload: FAKE_USER } )
        }
        else dispatch ( { type: 'errorAuth' } )
    }

    function logout (): void {
        dispatch ( { type: 'logout' } )
    }

    return <AuthContext.Provider value={ {
        user,
        isAuthenticated,
        login,
        logout,
        error
    } }>
        { children }
    </AuthContext.Provider>
}

function useAuth () {
    const context = useContext ( AuthContext )
    if ( context === undefined )
        throw new Error ( "AuthContext was used outside AuthProvider" )
    else if ( context === null )
        throw new Error ( "Context has not been Provided!" )
    return context
}

export { AuthProvider, useAuth }