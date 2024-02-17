import CreateNoteDialog from "@/components/create-note-dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { UserButton } from "@clerk/nextjs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const DashboardPage = () => {
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
           {/* LIST OF ALL PROJECTS */}
           <div className="text-center">
              <h2 className="text-lg text-gray-500">You have no projects yet.</h2>
           </div>

           {/* DISPLAY ALL PROJECTS */}
           <div className="grid sm:grid-cols-3 md:grid-cols-5 grod-cols-1">
              <CreateNoteDialog/>
           </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage