'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignUp() {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


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

    return (
        <Card className='w-3/12'>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <Input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </CardContent>
            <CardFooter className='flex-col gap-y-3'>
                <Button onClick={handleSignUp} className='w-full'>Sign Up</Button>
                <CardDescription>Already have an account? Login <Link href='/auth/login' className='underline hover:no-underline'>here</Link>.</CardDescription>
            </CardFooter>
        </Card>
    )
}