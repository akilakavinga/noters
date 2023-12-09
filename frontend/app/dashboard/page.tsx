
import NotesGrid from "@/components/NotesGrid";
import { AddNote } from "@/components/addnote";
import Note from "@/components/note";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export default async function Home() {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('notes').select()


    return (
        <NotesGrid data={data as Note[]} />
    )
}