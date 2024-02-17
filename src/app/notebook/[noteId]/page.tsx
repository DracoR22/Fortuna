import TiptapEditor from "@/components/tiptap-editor"
import { Button } from "@/components/ui/button"
import { clerk } from "@/lib/clerk-server"
import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

interface Props {
    params: { noteId: string }
}

const NoteBookIdPage = async ({ params: { noteId } }: Props) => {

   const { userId } = await auth()

   if (!userId) return redirect('/dashboard')

   const user = await clerk.users.getUser(userId)

   const notes = await db.select().from($notes).where(
    and(
        eq($notes.id, parseInt(noteId)),
        eq($notes.userId, userId)
    )
   ).limit(1)

   if (notes.length != 1) {
    return redirect('/dashboard')
   }

   const note = notes[0]

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border border-stone-200 rounded-lg p-4 flex items-center">
         <Link href="/dashboard">
            <Button size="sm">
             <ArrowLeft className="mr-1 w-4 h-4"/>
              Back
            </Button>
          </Link>
          <div className="w-3"/>
          <span className="font-semibold text-neutral-600 text-sm ml-3">
            {user.firstName} {user.lastName}
          </span>
          <span className="inline-block mx-1 text-sm">/</span>
          <span className="text-stone-500 text-sm font-semibold">{note.name}</span>
          <div className="ml-auto">
            Delete
          </div>
        </div>

        <div className="h-4"/>
        {/* EDITOR */}
        <div className="border-stone-200 border rounded-lg px-16 py-8 w-full">
          <TiptapEditor/>
        </div>
      </div>
    </div>
  )
}

export default NoteBookIdPage