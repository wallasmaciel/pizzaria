import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'
import { api } from '../services/apiClient'
import { toast } from 'react-toastify'

type UserProps = {
    id: string,
    name: string,
    email: string
}

type SignInProps = {
    email: string,
    password: string
}

type SignUpProps = {
    name: string,
    email: string,
    password: string
}

type AuthContextData = {
    user: UserProps | undefined,
    isAuthenticated: boolean,
    signIn: (credentials: SignInProps) => Promise<void>,
    signOut: () => void,
    signUp: (credentials: SignUpProps) => Promise<void>
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch {
        console.log('Erro ao deslogar.')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    // "!!"" converte o elemento em boolean, caso não exista ele vai ser falso
    const isAuthenticated = !!user

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies(undefined)
        // 
        if(token) {
            api.get('/me').then(response => {
                const { id, name, email } = response.data
                // 
                setUser({
                    id, 
                    name, 
                    email
                })
            }).catch(err => {
                signOut()
            })
        }
    }, [])

    const signIn = async({ email, password }: SignInProps) => { 
        try {
            const response = await api.post('/session', {
                email, 
                password
            })

            const { id, name, token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                // Exipira em um mês
                maxAge: 60 * 60 * 24 * 30, 
                // Quais caminhos terao acesos ao cookie 
                path: "/" // no caso tudo abaixo de '/'
            })

            // 
            setUser({
                id, 
                name, 
                email
            })

            // Passar para proximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Seja bem-vindo(a)')

            // Redirecionar o user para o '/dashboard'
            Router.push('/dashboard')
        }catch(err) {
            toast.error('Erro ao realizar login')
            console.log("ERRO AO ACESSAR: " + err)
        }
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name, 
                email, 
                password
            })

            toast.success('Conta criada com sucesso!')

            Router.push("/")
        }catch(err) {
            toast.error('Erro ao cadastrar')
            console.log("erro ao cadastrar: " + err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            { children }
        </AuthContext.Provider>
    )
}