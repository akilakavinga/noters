'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'

export default function SignUp() {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')


    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })
        if (!error) {
            const error2 = await supabase.from('profiles').insert({ first_name: firstName, last_name: lastName, user_id: data.user?.id })
            router.push('/dashboard')
        }
        console.log(data)
        router.refresh()
    }

    return (
        <Card className='w-3/12'>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
            </CardHeader>
            <form onSubmit={(e) => { handleSignUp(e) }}>
                <CardContent className='flex flex-col gap-4'>
                    <Input required placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <Input required placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <Input required placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input required placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </CardContent>
                <CardFooter className='flex-col gap-y-3'>
                    <Button type='submit' className='w-full'>Sign Up</Button>
                    <CardDescription>Already have an account? Login <Link href='/auth/login' className='underline hover:no-underline'>here</Link>.</CardDescription>
                </CardFooter>

            </form>
        </Card>
    )
}