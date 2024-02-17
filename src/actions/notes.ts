'use server'

import { generateImagePrompt } from "@/lib/openai"
import { auth } from "@clerk/nextjs"

export const createNote = async (name: string) => {
   const { userId } = auth()

   if (!userId) {
    return { error: 'Unauthorized' }
   }

   const image_description = await generateImagePrompt(name)
   console.log([image_description])

   return image_description
}