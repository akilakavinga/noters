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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function DeleteNote({ note }: { note: Note }) {
    const supabase = createClientComponentClient()
    const [userId, setUserId] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const getUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()

        setUserId(user?.id as string)
    }, [supabase])

    async function handleDelete() {
        const { error } = await supabase.from('notes').delete().eq('id', note.id)
        setOpen(false)
        router.refresh()
    }

    useEffect(() => {
        getUser()
    }, [supabase])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size='sm' className="text-red-500">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Note</DialogTitle>
                </DialogHeader>
                <DialogDescription>Are you sure want to delete this note?</DialogDescription>
                <DialogFooter>
                    <Button type="submit" onClick={handleDelete}>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
