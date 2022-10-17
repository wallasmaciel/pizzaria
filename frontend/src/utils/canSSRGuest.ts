import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

// FUncoes para paginas que sao acessadas por visitantes
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async(context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(context);
        // Se tentar acessa a pagina com login salvo, redirecionamos 
        if(cookies['@nextauth.token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false
                }
            }
        }
        // 
        return await fn(context)
    }
}