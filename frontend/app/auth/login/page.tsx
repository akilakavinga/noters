'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        console.log(data, error)
        if (!error) {
            router.push('/dashboard')
        }
        router.refresh()
    }

    const handleSignOut = async () => {
        const data = await supabase.auth.signOut()
        console.log(data)
        router.refresh()
    }

    return (
        <Card className='w-3/12'>
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </CardContent>
            <CardFooter className='flex-col gap-y-3'>
                <Button onClick={handleSignIn} className='w-full'>Login</Button>
                <CardDescription>New to Noters? Create an account <Link href='/auth/sign-up' className='underline hover:no-underline'>here</Link>.</CardDescription>

            </CardFooter>
        </Card>
    )
}