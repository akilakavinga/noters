'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Star } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function FavBtn({ note }: { note: Note }) {
    const supabase = createClientComponentClient()
    const [fav, setFav] = useState(note.favourited)
    const router = useRouter()

    const getUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()

    }, [supabase])

    async function handleFavClick(favourited: boolean) {
        const { error } = await supabase.from('notes').update({ favourited: favourited }).eq('id', note.id)
        console.log(error)
        setFav(!fav)
        router.refresh()
    }


    useEffect(() => {
        getUser()
    }, [supabase])

    return (
        <Button onClick={() => {
            handleFavClick(!fav)
        }} className="absolute bottom-0 right-2 bg-white rounded-full" size='icon' variant='ghost'>
            <Star style={
                { fill: fav ? 'yellow' : '' }
            } />
        </Button>
    )
}
