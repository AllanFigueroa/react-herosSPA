import React, { useReducer } from 'react'
import { types } from '../types/types';
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer';

export const AuthProvider = ({ children }) => {


    const init = () => {
        const user = JSON.parse(localStorage.getItem('user'));

        return {
            logged: !!user,
            user: user,
        }
    }
    
    const [authState, dispatch] = useReducer(authReducer, {}, init);

    const login = (name = '') =>{
        const user = {id: 'ABC', name};
        const action = {type: types.login,payload: user}
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action);
    }

    const logout = () =>{
        localStorage.removeItem('user');
        const action = {type: types.logout, payload: {}};
        dispatch(action);
    }
    return (
        <AuthContext.Provider value = {{ 
            ...authState,
            login: login,
            logout:logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}
