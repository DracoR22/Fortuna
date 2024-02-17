import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align"

export const SimpleExtensions = [
   TiptapUnderline,
   TaskList,
   TaskItem.configure({ nested: true }),
   Color,
   TextStyle,
   Highlight.configure({ multicolor: true }),
   TextAlign.configure({ types: ['heading', 'paragraph'], alignments: ['left', 'right', 'center', 'justify'], defaultAlignment: 'left' })
]

export const PlaceholderExtension = Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return `Heading ${node.attrs.level}`;
      }
      return "Start writting here, press ++ for AI completion";
    },
    includeChildren: true,
  });