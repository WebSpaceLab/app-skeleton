<script setup>
const props = defineProps( {
    editor: {
        type: Object,
        required: true,
    },
})

const  items = ref([
    {
        icon: 'ri:paragraph',
        dropdown: true,
        title: 'Paragraph',
        items: [
            {
                icon: 'tabler:h-1',
                title: 'Heading 1',
                action: () => props.editor.chain().focus().toggleHeading({ level: 1 }).run(),
                isActive: () => props.editor.isActive('heading', { level: 1 }),
            },
            {
                icon: 'tabler:h-2',
                title: 'Heading 2',
                action: () => props.editor.chain().focus().toggleHeading({ level: 2 }).run(),
                isActive: () => props.editor.isActive('heading', { level: 2 }),
            },
            {
                icon: 'tabler:h-3',
                title: 'Heading 3',
                action: () => props.editor.chain().focus().toggleHeading({ level: 3 }).run(),
                isActive: () => props.editor.isActive('heading', { level: 3 }),
            },
            {
                icon: 'ri:paragraph',
                title: 'Paragraph',
                action: () => props.editor.chain().focus().setParagraph().run(),
                isActive: () => props.editor.isActive('paragraph'),
            },
        ]
    },
    {
        type: 'divider',
    },
    {
        icon: 'material-symbols:format-bold',
        title: 'Bold',
        action: () => props.editor.chain().focus().toggleBold().run(),
        isActive: () => props.editor.isActive('bold'),
    },
    {
        icon: 'material-symbols:format-italic',
        title: 'Italic',
        action: () => props.editor.chain().focus().toggleItalic().run(),
        isActive: () => props.editor.isActive('italic'),
    },
    {
        icon: 'material-symbols:strikethrough-s',
        title: 'Strike',
        action: () => props.editor.chain().focus().toggleStrike().run(),
        isActive: () => props.editor.isActive('strike'),
    },

    {
        icon: 'material-symbols:format-color-text-rounded',
        title: 'Color',
        dropdown: true,
        action: () => props.editor.chain().focus().toggleTextColor().run(),
        isActive: () => props.editor.isActive('textColor'),
        items: [
            {
                icon: '',
                color: '#000000',
                title: 'Black',
                action: () => props.editor.chain().focus().setColor('#000000').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#000000' }),
            },
            {
                icon: '',
                color: '#ffffff',
                title: 'White',
                action: () => props.editor.chain().focus().setColor('#ffffff').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#ffffff' }),
            },
            {
                icon: '',
                color: '#ff0000',
                title: 'Red',
                action: () => props.editor.chain().focus().setColor('#ff0000').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#ff0000' }),
            },
            {
                icon: '',
                color: '#ff8000',
                title: 'Orange',
                action: () => props.editor.chain().focus().setColor('#ff8000').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#ff8000' }),
            },
            {
                icon: '',
                color: '#ffff00',
                title: 'Yellow',
                action: () => props.editor.chain().focus().setColor('#ffff00').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#ffff00' }),
            },
            {
                icon: '',
                color: '#00ff00',
                title: 'Green',
                action: () => props.editor.chain().focus().setColor('#00ff00').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#00ff00' }),
            },
            {
                icon: '',
                color: '#00ffff',
                title: 'Cyan',
                action: () => props.editor.chain().focus().setColor('#00ffff').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#00ffff' }),
            },
            {
                icon: '',
                color: '#0000ff',
                title: 'Blue',
                action: () => props.editor.chain().focus().setColor('#0000ff').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#0000ff' }),
            },
            {
                icon: '',
                color: '#ff00ff',
                title: 'Purple',
                action: () => props.editor.chain().focus().setColor('#ff00ff').run(),
                isActive: () => props.editor.isActive('textColor', { color: '#ff00ff' }),
            },
        ]
    },
    {
        icon: 'ri:mark-pen-fill',
        title: 'Highlight',
        dropdown: true,
        action: () => props.editor.chain().focus().toggleHighlight().run(),
        isActive: () => props.editor.isActive('highlight'),
        items: [
            {
                icon: '',
                backgroundColor: '#fff475',
                title: 'Yellow',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#fff475' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#fff475' }),
            },
            {
                icon: '',
                backgroundColor: '#ccff90',
                title: 'Green',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#ccff90' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#ccff90' }),
            },
            {
                icon: '',
                backgroundColor: '#a7ffeb',
                title: 'Pink',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#f28b82' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#f28b82' }),
            },
            {
                icon: '',
                backgroundColor: '#cbf0f8',
                title: 'Blue',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#cbf0f8' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#cbf0f8' }),
            },
            {
                icon: '',
                backgroundColor: '#d7aefb',
                title: 'Purple',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#d7aefb' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#d7aefb' }),
            },
            {
                icon: '',
                backgroundColor: '#fdcfe8',
                title: 'Red',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#fdcfe8' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#fdcfe8' }),
            },
            {
                icon: '',
                backgroundColor: '#e6c9a8',
                title: 'Gray',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#e6c9a8' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#e6c9a8' }),
            },
            {
                icon: '',
                backgroundColor: '#e8eaed',
                title: 'Orange',
                action: () => props.editor.chain().focus().toggleHighlight({ color: '#e8eaed' }).run(),
                isActive: () => props.editor.isActive('highlight', { color: '#e8eaed' }),
            },
        ]
    },
    {
        type: 'divider',
    },
    {
        icon: 'material-symbols:format-list-numbered-rounded',
        title: 'List',
        dropdown: true,
        action: () => props.editor.chain().focus().toggleBulletList().run(),
        isActive: () => props.editor.isActive('bulletList'),
        items: [
            {
                icon: 'ri:list-check',
                title: 'Check List',
                action: () => props.editor.chain().focus().toggleTaskList().run(),
                isActive: () => props.editor.isActive('taskList'),
            },
            {
                icon: 'ri:list-settings-line',
                title: 'Ordered List',
                action: () => props.editor.chain().focus().toggleOrderedList().run(),
                isActive: () => props.editor.isActive('orderedList'),
            },
            {
                icon: 'ri:list-unordered',
                title: 'Bullet List',
                action: () => props.editor.chain().focus().toggleBulletList().run(),
                isActive: () => props.editor.isActive('bulletList'),
            }
        ]

    },
    // {
    //     icon: 'ri:table-alt-line',
    //     title: 'Table',
    //     dropdown: true,
    //     action: () => props.editor.chain().focus().toggleTable().run(),
    //     isActive: () => props.editor.isActive('table'),
    //     items: [
    //         {
    //             icon: 'ri:table-alt-line',
    //             title: 'Insert Table',
    //             action: () => {
    //                 const rows = window.prompt('Rows');
    //                 const cols = window.prompt('Columns');
    //                 props.editor.chain().focus().insertTable({ rows, cols }).run();
    //             },
    //         },
    //     ]
    // },

    {
        icon: 'material-symbols:align-justify-space-around',
        title: 'Align',
        dropdown: true,
        items: [
            {
                icon: 'material-symbols:format-align-left',
                title: 'Text left',
                action: () => props.editor.chain().focus().setTextAlign('left').run(),
                isActive: () => props.editor.isActive({ textAlign: 'left' }),
            },
            {
                icon: 'material-symbols:format-align-center',
                title: 'Text center',
                action: () => props.editor.chain().focus().setTextAlign('center').run(),
                isActive: () => props.editor.isActive({ textAlign: 'center' }),
            },
            {
                icon: 'material-symbols:format-align-justify',
                title: 'Text justify',
                action: () => props.editor.chain().focus().setTextAlign('justify').run(),
                isActive: () => props.editor.isActive({ textAlign: 'justify' }),
            },
            {
                icon: 'material-symbols:format-align-right',
                title: 'Text right',
                action: () => props.editor.chain().focus().setTextAlign('right').run(),
                isActive: () => props.editor.isActive({ textAlign: 'right' }),
            },
        ]
    },
    {
        icon: 'ri:link',
        title: 'Link',
        dropdown: true,
        action: () => props.editor.chain().focus().toggleLink().run(),
        isActive: () => props.editor.isActive('link'),
        items: [
            {
                icon: 'ri:link',
                title: 'Insert Link',
                action: () => {
                    const url = window.prompt('URL');
                    props.editor.chain().focus().toggleLink({ href: url }).run();
                },
            },
            {
                icon: 'streamline:broken-link-2',
                title: 'Remove Link',
                action: () => props.editor.chain().focus().unsetLink().run(),
                isActive: () => props.editor.isActive('link'),
            },

            {
                icon: 'ri:attachment-line',
                title: 'Insert Image',
                action: () => {
                    const url = window.prompt('URL');
                    props.editor.chain().focus().setImage({ src: url }).run();
                },
            },
            {
                icon: 'ri:movie-2-line',
                title: 'Insert Video',
                action: () => {
                    const url = window.prompt('URL');
                    props.editor.chain().focus().setVideo({ src: url }).run();
                },
            },
        ]
    },
    {
        icon: 'ion:md-options',
        title: 'Next options',
        dropdown: true,
        items: [
            {
                icon: 'ri:code-box-line',
                title: 'Code Block',
                action: () => props.editor.chain().focus().toggleCodeBlock().run(),
                isActive: () => props.editor.isActive('codeBlock'),
            },
            

            {
                icon: 'ri:double-quotes-l',
                title: 'Blockquote',
                action: () => props.editor.chain().focus().toggleBlockquote().run(),
                isActive: () => props.editor.isActive('blockquote'),
            },
            {
                icon: 'tabler:separator-vertical',
                title: 'Horizontal Rule',
                action: () => props.editor.chain().focus().setHorizontalRule().run(),
            },

            {
                icon: 'material-symbols:format-text-wrap',
                title: 'Hard Break',
                action: () => props.editor.chain().focus().setHardBreak().run(),
            },
            {
                icon: 'material-symbols:format-clear',
                title: 'Clear Format',
                action: () => props.editor.chain()
                    .focus()
                    .clearNodes()
                    .unsetAllMarks()
                    .run(),
            },

            {
                icon: 'ri:code-view',
                title: 'Code',
                action: () => props.editor.chain().focus().toggleCode().run(),
                isActive: () => props.editor.isActive('code'),
            },
        ]
    },
    {
        type: 'divider',
    },
    {
        icon: 'ri:arrow-go-back-line',
        title: 'Undo',
        action: () => props.editor.chain().focus().undo().run(),
    },
    {
        icon: 'ri:arrow-go-forward-line',
        title: 'Redo',
        action: () => props.editor.chain().focus().redo().run(),
    },
])

// let isCloseDropdown = ref(false);
</script>

<template>
    <div>
        <template v-for="(item, index) in items">
            <div class="h-9 hidden  border-solid border-1  border-slate-700" v-if="item.type === 'divider'" :key="`divider${index}`" />
            <x-text-editor-menu-item v-else :key="index" v-bind="item" :editor="editor"/>
            <!--
                <x-text-editor-menu-item v-else :key="index" @closeDropdown="event => isCloseDropdown = event" :isCloseDropdown="isCloseDropdown" v-bind="item" :editor="editor"/>
            -->
        </template>
    </div>
  </template>