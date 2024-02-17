import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        let { noteId, editorState } = await req.json()

        if (!editorState || !noteId) {
            return new NextResponse('Missing editor state or noteId', { status: 400 })
        }

        noteId = parseInt(noteId)

        const notes = await db.select().from($notes).where(eq($notes.id, noteId)).limit(1)

        if (notes.length != 1) {
            return new NextResponse('Note not found', { status: 400 })
        }

        const note = notes[0]

        if (note.editorState !== editorState) {
            await db.update($notes).set({ editorState }).where(eq($notes.id, noteId))
        }

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}