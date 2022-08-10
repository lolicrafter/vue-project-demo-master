<template>
  <div id="ykEditor">
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue2'
// ⚠️ NOTE: We don't use @ckeditor/ckeditor5-build-classic any more!
// Since we're building CKEditor from source, we use the source version of ClassicEditor.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'

import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials'
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold'
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic'
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link'
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
import FontBackgroundColor from '@ckeditor/ckeditor5-font/src/fontbackgroundcolor'
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily'
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'

export default {
  name: 'ykEditor',
  components: {
    // Use the <ckeditor> component in this view.
    ckeditor: CKEditor.component
  },
  data () {
    return {
      editor: ClassicEditor,
      editorData: '',
      editorConfig: {
        placeholder: '请填写内容',
        plugins: [
          EssentialsPlugin,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          Heading,
          FontColor,
          FontBackgroundColor,
          FontFamily,
          FontSize
        ],

        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'undo',
            'redo'
          ]
        },

        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            }
          ]
        },
        fontFamily: {
          options: [
            'default',
            'Ubuntu, Arial, sans-serif',
            'Ubuntu Mono, Courier New, Courier, monospace'
          ]
        },

        fontSize: {
          options: [9, 11, 13, 'default', 17, 19, 21],
          supportAllValues: true
        }
      }
    }
  }
}
</script>

<style>
/*编辑框最低高度*/
.ck-editor__editable {
  min-height: 400px;
}
</style>
