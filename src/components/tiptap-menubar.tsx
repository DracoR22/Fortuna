'use client'

import { cn } from "@/lib/utils"
import { Editor } from "@tiptap/react"
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, CheckIcon, CheckSquareIcon, ChevronDown, CodeIcon, Heading1Icon, Heading2Icon, Heading3Icon, ItalicIcon, ListIcon, ListOrderedIcon, Redo2Icon, StrikethroughIcon, TextIcon, TextQuoteIcon, UnderlineIcon, Undo2Icon } from "lucide-react"
import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { HIGHLIGHT_COLORS, TEXT_COLORS } from "@/lib/colors"

interface Props {
    editor: Editor
}

const TiptapMenubar = ({ editor }: Props) => {

 const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive("textStyle", { color }))
 const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) => editor.isActive("highlight", { color }));

    return (
        <div className="flex flex-wrap">
            {/* BOLD */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleBold().run()}
             disabled={!editor.can().chain().focus().toggleBold().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("bold")})}>
                <BoldIcon className="w-4 h-4"/>
            </Button>

            {/* ITALIC */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleItalic().run()}
             disabled={!editor.can().chain().focus().toggleItalic().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("italic")})}>
                <ItalicIcon className="w-4 h-4"/>
            </Button>

            {/* UNDERLINE */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleUnderline().run()}
             disabled={!editor.can().chain().focus().toggleUnderline().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("underline")})}>
                <UnderlineIcon className="w-4 h-4"/>
            </Button>

             {/* STRIKE */}
             <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleStrike().run()}
             disabled={!editor.can().chain().focus().toggleStrike().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("strike")})}>
                <StrikethroughIcon className="w-4 h-4"/>
            </Button>

            {/* CODE */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleCode().run()}
             disabled={!editor.can().chain().focus().toggleCode().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("code")})}>
                <CodeIcon className="w-4 h-4"/>
            </Button>

            {/* TEXT */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleNode("paragraph", "paragraph").run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("paragraph") && !editor.isActive("bulletList") && !editor.isActive("orderedList"),})}>
                <TextIcon className="w-4 h-4"/>
            </Button>

            {/* HEADING 1 */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("heading", { level: 1 })})}>
                <Heading1Icon className="w-4 h-4"/>
            </Button>

            {/* HEADING 2 */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("heading", { level: 2 })})}>
                <Heading2Icon className="w-4 h-4"/>
            </Button>

            {/* HEADING 3 */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("heading", { level: 3 })})}>
                <Heading3Icon className="w-4 h-4"/>
            </Button>

            {/* TODO LIST */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleTaskList().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("taskItem")})}>
                <CheckSquareIcon className="w-4 h-4"/>
            </Button>

            {/* NUMBERED LIST */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleOrderedList().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("orderedList")})}>
                <ListOrderedIcon className="w-4 h-4"/>
            </Button>

            {/* BULLET LIST */}
            <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleBulletList().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("bulletList")})}>
                <ListIcon className="w-4 h-4"/>
            </Button>

           {/* QUOTE */}
           <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().toggleNode("paragraph", "paragraph").toggleBlockquote().run()}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive("blockquote")})}>
                <TextQuoteIcon className="w-4 h-4"/>
            </Button>

            {/* ALIGN LEFT */}
           <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.commands.setTextAlign('left')}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive({ textAlign: 'left' })})}>
                <AlignLeftIcon className="w-4 h-4"/>
            </Button>

            {/* ALIGN RIGHT */}
           <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.commands.setTextAlign('right')}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive({ textAlign: 'right' })})}>
                <AlignRightIcon className="w-4 h-4"/>
            </Button>

            {/* ALIGN CENTER */}
           <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.commands.setTextAlign('center')}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive({ textAlign: 'center' })})}>
                <AlignCenterIcon className="w-4 h-4"/>
            </Button>

             {/* ALIGN JUSTIFY */}
           <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.commands.setTextAlign('justify')}
             className={cn({'text-blue-500 hover:text-blue-500': editor.isActive({ textAlign: 'justify' })})}>
                <AlignJustifyIcon className="w-4 h-4"/>
            </Button>

            {/* UNDO */}
           <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().undo().run()}
             disabled={!editor.can().chain().focus().undo().run()}>
                <Undo2Icon className="w-4 h-4"/>
           </Button>

            {/* REDO */}
           <Button variant={'ghost'} size={'icon'}
             onClick={() => editor.chain().focus().redo().run()}
             disabled={!editor.can().chain().focus().redo().run()}>
                <Redo2Icon className="w-4 h-4"/>
           </Button>

            {/* COLORS */}
            <Popover>
            <PopoverTrigger asChild>
               <Button className="gap-2 rounded-none" variant="ghost">
                <span className="rounded-sm px-1" style={{color: activeColorItem?.color, backgroundColor: activeHighlightItem?.color}}>
                   A
               </span>
               <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={5} className="my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl " align="start">
               <div className="flex flex-col">
               <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
                 Color
               </div>
               {TEXT_COLORS.map(({ name, color }, index) => (
                <div onClick={() => {
                    editor.commands.unsetColor();
                    name !== "Default" &&
                      editor
                        .chain()
                        .focus()
                        .setColor(color || "")
                        .run();
                  }}
                className="flex items-center my-1 gap-2 hover:bg-neutral-100 transition cursor-pointer" key={index}>
                <div className="rounded-sm border px-2 py-px font-medium text-neutral-600"style={{ color }}>
                  A
                </div>
                  <span>{name}</span>
               </div>
               ))}
               <div>
               <div className="my-1 px-2 text-sm font-semibold text-muted-foreground">
                 Background
               </div>
               {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
                <div onClick={() => {
                    editor.commands.unsetHighlight();
                    name !== "Default" && editor.chain().focus().setHighlight({ color }).run()}}
                className="flex items-center my-1 gap-2 hover:bg-neutral-100 transition cursor-pointer" key={index}>
                <div  className="rounded-sm border px-2 py-px font-medium text-neutral-600" style={{ backgroundColor: color }}>
                  A
                </div>
                  <span>{name}</span>

                  {editor.isActive("highlight", { color }) && (
                <CheckIcon className="h-4 w-4" />
              )}
               </div>
               ))}
               </div>
               </div>
            </PopoverContent>
            </Popover>
        </div>
    )
}

export default TiptapMenubar
