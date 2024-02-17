'use client'

import { Loader2, Plus } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface Props {
    
}

const CreateNoteDialog = (props: Props) => {

    const router = useRouter()

    const [input, setInput] = useState<string>('')
    
    const { mutate: uploadToFirebaseMutation } = useMutation({
        mutationFn: async (noteId: string) => {
            const response = await axios.post('/api/upload-to-firebase', { noteId })

            return response.data
        }
    })

    const { mutate: createNotebookMutation, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/create-notebook', { name: input })
            return response.data
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (input === '') {
            toast.error('Please name your project')
            return
        }

        createNotebookMutation(undefined, {
            onSuccess: ({ note_id }) => {
                toast.success('Project created!')

                // Upload the image to firebase
                uploadToFirebaseMutation(note_id)
                router.push(`/notebook/${note_id}`)
                router.refresh()
            },
            onError: (error) => {
                toast.error('Something went wrong. Please try again later.')
                console.log(error)
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div className="border-dashed border-2 flex border-blue-500 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:translate-y-1 flex-row p-4">
                    <Plus className="w-6 h-6 text-blue-500" strokeWidth={3}/>
                  <h2 className="font-semibold text-blue-500 sm:mt-2">
                      New Project
                  </h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                   <DialogTitle>
                      New Project
                   </DialogTitle>
                   <DialogDescription>
                     You can create a new project by clicking the button below.
                   </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Name..."/>
                    <div className="h-4"/>
                    <div className="flex items-center gap-x-3">
                       <Button type="reset" variant={'secondary'}>Cancel</Button>
                       <Button type="submit" disabled={isPending}>
                         {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2"/> }
                         Create
                       </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNoteDialog
