'use client'

import { EditorContent, useEditor } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { useEffect, useState } from "react"
import TiptapMenubar from "./tiptap-menubar"
import { Button } from "./ui/button"
import { PlaceholderExtension, SimpleExtensions } from "./tiptap-extensions"

interface Props {
    
}

const TiptapEditor = (props: Props) => {

    const [editorState, setEditorState] = useState<string>('')

    // INITIALIZE EDITOR
    const editor = useEditor({
        autofocus: true,
        extensions: [...SimpleExtensions, StarterKit, PlaceholderExtension],
        content: editorState,
        onUpdate: ({ editor }) => {
            setEditorState(editor.getHTML())
        }
    })

    useEffect(() => {
        
    }, [])

    return (
        <>
          <div className="flex">
             {editor && <TiptapMenubar editor={editor}/>}
             <Button variant={'outline'}>Saved</Button>
          </div>
          <div className="mt-8 prose">
             <EditorContent editor={editor}/>
          </div>
        </>
    )
}

export default TiptapEditor
