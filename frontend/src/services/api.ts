import { AuthTokenError } from './errors/AuthTokenError';
import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';

import { signOut } from './../contexts/AuthContext'

export function setupAPIClient(context = undefined) {
    let cookies = parseCookies(context)

    const api = axios.create({
        baseURL: 'http://localhost:3333', 
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    // 
    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        // Qualquer erro 401 devemos deslogar o usuario 
        if(error.response?.status === 401) {
            // Chamar a função para deslogar o usuario 
            if(typeof window !== undefined) {
                signOut()
            }
            // Ele se encontra no serve side
            else {
                return Promise.reject(new AuthTokenError())
            }
        }
        // 
        return Promise.reject(error)
    })
    // 
    return api;
}