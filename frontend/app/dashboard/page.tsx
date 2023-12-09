import { AddNote } from "@/components/addnote";
import Login from "@/components/login";
import Note from "@/components/note";
import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
    const supabase = createServerComponentClient({ cookies })
    // const { data: { session } } = await supabase.auth.getSession()

    // if (!session) {
    //     redirect("/")
    // }

    const { data } = await supabase.from('notes').select()

    return (
        <div className="h-full mx-32 my-20 rounded-xl p-10">

            <div className="flex gap-4 items-center">
                <h1 className="text-4xl font-bold">Notes</h1>
                <AddNote />
            </div>
            <div className="my-5 border border-black w-full" />
            <div className="border w-full grid grid-flow-row grid-cols-3 p-5 gap-x-20 gap-y-8">
                <Note />
                <Note />
                <Note />
                <Note />
            </div>
        </div>
    )
}