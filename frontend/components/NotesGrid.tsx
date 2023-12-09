'use client'
import { useEffect, useState } from "react";
import { AddNote } from "./addnote";
import Note from "./note";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback } from "./ui/avatar";
import UserAvatar from "./useravatar";

export default function NotesGrid(
    { data }: { data: Note[] }
) {
    const [message, setMessage] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [favFilter, setFavFilter] = useState(false)
    const [filteredNotes, setFilteredNotes] = useState<Note[]>([])

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL as string)
            .then(res => res.json())
            .then(data => setMessage(data?.message))
    }, [])
    useEffect(() => {
        const newFilteredNotes = data.filter((note) =>
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!favFilter || note.favourited))

        setFilteredNotes(newFilteredNotes)
    }, [searchTerm, data, favFilter])

    return (
        <div className="h-full mx-32 rounded-xl p-10">

            <div className="flex items-center justify-between">

                <div className="flex gap-4 items-center">
                    <h1 className="text-4xl font-bold">Notes</h1>
                    <AddNote />
                </div>
                <div className="flex items-center w-6/12 gap-x-6">
                    <Input value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} className="" placeholder="Search note..." />
                    <div className="flex items-center gap-x-2">
                        <Checkbox checked={favFilter} onClick={() => { setFavFilter(!favFilter) }} id='favourited' />
                        <Label htmlFor="id">Favourited</Label>
                    </div>
                    <UserAvatar />
                </div>
            </div>
            <div className="my-5 border border-black w-full" />
            <p>{JSON.stringify(message)}</p>
            <div className=" w-full grid grid-flow-row grid-cols-3 p-5 gap-x-20 gap-y-8">
                {filteredNotes?.map((note: Note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </div>
    )
}