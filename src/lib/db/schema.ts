import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable('notes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    imageUrl: text('imageUrl'),
    userId: text('user_id').notNull(),
    editorState: text('editor_state')
})

// CREATE SCHEMA TYPES
export type NoteType = typeof $notes.$inferInsert
