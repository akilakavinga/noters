'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default async function Login() {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const email = '1234@email.com'
    const email2 = '4321@email.com'
    const password = '123456'
    const password2 = '123456'


    const handleSignUp = async () => {
        const data = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        console.log(data)
        router.refresh()
    }

    const handleSignUp2 = async () => {
        const data = await supabase.auth.signUp({
            email: email2,
            password: password2,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        console.log(data)
        router.refresh()
    }


    const handleSignIn = async () => {
        const data = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        console.log(data)
        router.refresh()
    }
    const handleSignIn2 = async () => {
        const data = await supabase.auth.signInWithPassword({
            email: email2,
            password: password2,
        })
        console.log(data)
        router.refresh()
    }

    const handleSignOut = async () => {
        const data = await supabase.auth.signOut()
        console.log(data)
        router.refresh()
    }

    return (
        <div className='flex gap-4'>
            {/* <button onClick={handleSignIn}>sign in</button>
            <button onClick={handleSignIn2}>sign in 2</button>
            <button onClick={handleSignUp}>sign up </button>
            <button onClick={handleSignUp2}>sign up 2 </button> */}
            <button onClick={handleSignOut}>sign out</button>
        </div>
    )
}
