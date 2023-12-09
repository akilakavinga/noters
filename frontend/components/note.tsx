import { Star } from "lucide-react";
import { DeleteNote } from "./deletenote";
import { EditNote } from "./editnote";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { FavBtn } from "./favbutton";

export default function Note({ note }: { note: Note }) {


    function formatDate(dateString: string) {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short' }).format(date)
    }


    return (
        <div className="shrink-0 w-full h-full flex flex-col gap-3">
            <div className=" relative h-52 rounded-lg border-2 border-black overflow-hidden p-4">
                <FavBtn note={note} />
                <p className="">{note.content}</p>
            </div>
            <div className="text-center">

                <h1 className="text-3xl font-bold text-center">{note.title} </h1>
                <h2 className="text-md">{formatDate(note.created_at)}</h2>
                <div className="">
                    <EditNote note={note} />
                    <DeleteNote note={note} />
                </div>
            </div>
        </div>
    )
}