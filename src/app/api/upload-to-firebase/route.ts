import { db } from "@/lib/db"
import { $notes } from "@/lib/db/schema"
import { uploadFileToFirebase } from "@/lib/firebase"
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { noteId } = await req.json()

        // Extract dalle url
        const notes = await db.select().from($notes).where(eq($notes.id, parseInt(noteId))).limit(1)

        if (!notes[0].imageUrl) {
            return new NextResponse('No image URL found', { status: 400 })
        }

        // Upload the file to firebase
        const firebase_url = await uploadFileToFirebase(notes[0].imageUrl, notes[0].name)

        // Save the new firebase url in the databse
        await db.update($notes).set({
            imageUrl: firebase_url
        }).where(eq($notes.id, noteId))

        return new NextResponse('Ok', { status: 200 })
    } catch (error) {
        return new NextResponse('Error', { status: 500 })
    }
}