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

export function AddNote() {
    const supabase = createClientComponentClient()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const user = ''

    const getUser = useCallback(async () => {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user)

    }, [user, supabase])

    async function handleAdd() {
        console.log(title, content)
        getUser()
    }

    useEffect(() => {
        getUser()
    }, [user, getUser])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default"><Plus /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            name='content'
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">
                            Content
                        </Label>
                        <Textarea
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
                    <Button onClick={handleAdd}>Add Note</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
