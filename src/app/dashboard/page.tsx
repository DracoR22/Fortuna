import CreateNoteDialog from "@/components/create-note-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { UserButton, auth } from "@clerk/nextjs"
import { eq } from "drizzle-orm"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const DashboardPage = async () => {

   const { userId } = auth()

   if (!userId) {
      return redirect('/')
   }

   const notes = await db.select().from($notes).where(eq($notes.userId, userId))

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto p-10">
           <div className="h-14"/>
           <div className="flex justify-between items-center md:flex-row flex-col">
              <div className="flex items-center">
                <Link href={'/'}>
                   <Button>
                     <ArrowLeft className="mr-1 w-4 h-4"/>
                      Back
                   </Button>
                </Link>
                <div className="w-4"/>
                <h1 className="text-2xl font-bold text-gray-900">
                   My Projects
                </h1>
                <div className="w-4"/>
                <UserButton afterSignOutUrl="/"/>
              </div>
           </div>
           <div className="h-8"/>
           <Separator/>
           <div className="h-8"/>
           {/* IF NO PROJECTS */}
            {notes.length === 0 && (
             <div className="text-center">
               <h2 className="text-lg text-gray-500">You have no projects yet.</h2>
             </div>
            )}
 
           {/* DISPLAY ALL PROJECTS */}
           <div className="grid sm:grid-cols-3 md:grid-cols-5 grod-cols-1">
              <CreateNoteDialog/>
              {notes.map((note) => {
               return (
                  <a href={`/notebook/${note.id}`} key={note.id}>
                     <div className="overflow-hidden mx-2 flex flex-col border border-neutral-400 rounded-md hover:-translate-y-1 transition">
                        <Image width={400} height={230} src={note.imageUrl || ''} alt={note.name}/>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                             {note.name}
                          </h3>
                          <div className="h-1"/>
                          <p className="text-xs text-gray-500">
                             {new Date(note.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                     </div>
                  </a>
               )
              })}
           </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage