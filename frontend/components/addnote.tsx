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
import { Plus } from "lucide-react"
import { Textarea } from "./ui/textarea"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function AddNote() {
    const supabase = createClientComponentClient()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const getUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()

        setUserId(user?.id as string)
    }, [supabase])

    async function handleAdd() {
        const { error } = await supabase.from('notes').insert(
            {
                user_id: userId,
                title,
                content
            }
        )
        setOpen(false)
        router.refresh()
    }

    useEffect(() => {
        getUser()
        setTitle('')
        setContent('')
    }, [supabase])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default"><Plus /></Button>
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
                    <Button type="submit" onClick={handleAdd}>Add Note</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
