'use client'

import { Loader2, TrashIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
    noteId: number
}

const DeleteButton = ({ noteId }: Props) => {

    const router = useRouter()

    const { mutate: deleteMutation, isPending } = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/delete-note', { noteId })

            return response
        }
    })

    const handleDelete = () => {
       deleteMutation(undefined, {
        onSuccess: () => {
           toast.success('Project deleted.')
           router.push('/dashboard')
           router.refresh()
        },
        onError: (error) => {
            console.log(error)
            toast.error('Could not delete project. Please try again later.')
        }
       })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
              <Button variant={'outline'} className="border-red-500 hover:bg-red-100">
                 <TrashIcon className="text-red-500 w-4 h-4"/>
              </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete this project
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure? This action is irreversible
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-x-3">
                    <Button variant={'destructive'} disabled={isPending} onClick={handleDelete}>
                      {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2"/> }
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteButton
