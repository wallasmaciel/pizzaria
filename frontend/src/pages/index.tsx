import { FormEvent, useContext, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from './../../styles/home.module.scss'

import logoImg from './../../public/logo.svg'
import Image from 'next/image'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

import { AuthContext } from '../contexts/AuthContext'

import Link from 'next/link'
import { toast } from 'react-toastify'
import { canSSRGuest } from '../utils/canSSRGuest'

const Home: NextPage = () => {
  const { signIn } = useContext(AuthContext)
  
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const [ loading, setLoading ] = useState(false)

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    if(email === '' || password === '') {
      toast.warning('Preencha todos os campos')
      return
    }

    setLoading(true)

    await signIn({
      email, 
      password
    })

    setLoading(false)
  }
  // 
  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={ styles.containerCenter }>
        <Image src={ logoImg } alt="Logo Sujeito Pizzaria" />

        <div className={ styles.login }>
          <form onSubmit={ handleLogin }>
            <Input 
              placeholder="Digite o seu email" 
              type="text"
              value={ email }
              onChange={ e => setEmail(e.target.value) }
              />

            <Input 
              placeholder="Sua senha" 
              type="password"
              value={ password }
              onChange={ e => setPassword(e.target.value) }
              />

              <Button 
                type="submit"
                loading={ loading }>
                  Acessar
              </Button>
          </form>

          <Link href='/signup'>
            <a className={ styles.text }>Não possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home

export const getServerSideProps = canSSRGuest(async(context) => {
  return {
    props: {}
  }
})