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
import { Textarea } from "./ui/textarea"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function EditNote({ note }: { note: Note }) {
    const supabase = createClientComponentClient()
    const [title, setTitle] = useState(note.title)
    const [content, setContent] = useState(note.content)
    const [userId, setUserId] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const getUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()

        setUserId(user?.id as string)
    }, [supabase])

    async function handleEdit() {
        const { error } = await supabase.from('notes').update(
            {
                title,
                content
            }
        ).eq('id', note.id)
        setOpen(false)
        router.refresh()
    }

    useEffect(() => {
        getUser()
        setTitle(note.title)
        setContent(note.content)
    }, [supabase])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size='sm'>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="">
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            name='content'
                            className="col-span-3"
                        />
                    </div>
                    <div className="">
                        <Textarea
                            placeholder="..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows={10}
                            name='content'
                            id="content"
                            className="col-span-3"
                        />
                    </div>
                </form>
                <DialogFooter>
                    <Button type="submit" onClick={handleEdit}>Edit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
