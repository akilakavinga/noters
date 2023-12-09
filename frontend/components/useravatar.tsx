import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useCallback, useEffect, useState } from "react";

export default function UserAvatar({ }) {
    const supabase = createClientComponentClient()
    const [profile, setProfile] = useState()

    const getUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()

        return user
    }, [supabase])

    useEffect(() => {
        getUser()
    })
    return (
        <Link href='/dashboard'>
            <Avatar>
                <AvatarFallback>NT</AvatarFallback>
            </Avatar>
        </Link>
    )
}