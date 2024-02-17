'use client'

import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { useEffect, useMemo, useRef, useState } from "react"
import TiptapMenubar from "./tiptap-menubar"
import { Button } from "./ui/button"
import { PlaceholderExtension, SimpleExtensions } from "./tiptap-extensions"
import { useDebounce } from "@/lib/use-debounce"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { NoteType } from "@/lib/db/schema"
import { toast } from "sonner"
import { RefreshCwIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Text from "@tiptap/extension-text"
import { useCompletion } from "ai/react"

interface Props {
    note: NoteType
}

const TiptapEditor = ({ note }: Props) => {

    const [editorState, setEditorState] = useState(note.editorState || '')

    const lastCompletion = useRef('')

    // AI AUTO COMPLETION EXTENTION
    const { complete, completion } = useCompletion({
        api: '/api/completion'
    })

    const CustomText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Shift-a': () => {
                    // Take the last 30 chars
                    const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
                    console.log(prompt)
                    complete(prompt)
                    return true
                }
            }
        },
    })

    // SAVE CONTENT TO DB QUERY
    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/save-note', { noteId: note.id, editorState })

            return response.data
        }
    })

    // INITIALIZE EDITOR
    const editor = useEditor({
        autofocus: true,
        extensions: [...SimpleExtensions, StarterKit, PlaceholderExtension, CustomText],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML())
        }
    })

    const debounce = useDebounce(editorState, 1000)

    // SAVE CHANGES TO DB
    useEffect(() => {
        if (debounce === '') return

        saveNote.mutate(undefined, {
            onSuccess: (data) => {
                console.log('State updated', data)
            },
            onError: (err) => {
                console.log(err)
                toast.error('Failed to update the file. Please try again later')
            }
        })
    }, [debounce])


    useEffect(() => {
        if (!editor || !completion) return
       // Get individual word to insert to the editor
        const diff = completion.slice(lastCompletion.current.length)
        lastCompletion.current = completion

        editor.commands.insertContent(diff)
    }, [completion, editor])

    return (
        <>
         <div className="flex justify-end -mt-[20px] -mr-[40px]">
            <Button disabled variant={'outline'} size={'sm'}>
                <RefreshCwIcon className={cn('w-4 h-4', saveNote.isPending && 'animate-spin')}/>
            </Button>
         </div>
          <div className="flex">
             {editor && <TiptapMenubar editor={editor}/>}
          </div>
          <div className="mt-8 prose">
             <EditorContent editor={editor} className="h-[500px]"/>
          </div>
        </>
    )
}

export default TiptapEditor
