<template>
  <div id="ykEditor">
    <ckeditor
    ref="editor"
      @ready="onReady"
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
    ></ckeditor>
  </div>
</template>

<script>
import MyUploadAdapter from './MyUploadAdapter.js'

import CKEditor from '@ckeditor/ckeditor5-vue2'
// ⚠️ NOTE: We don't use @ckeditor/ckeditor5-build-classic any more!
// Since we're building CKEditor from source, we use the source version of ClassicEditor.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import CloudServices from '@ckeditor/ckeditor5-cloud-services/src/cloudservices.js'
// import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter'
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat'
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
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage'
import Image from '@ckeditor/ckeditor5-image/src/image'
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption'
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle'
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar'
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload'
import List from '@ckeditor/ckeditor5-list/src/list'
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment' // <--- 添加在此处

export default {
  name: 'ykEditor',
  components: {
    // Use the <ckeditor> component in this view.
    ckeditor: CKEditor.component
  },
  data () {
    return {
      editor: ClassicEditor,
      editorEntity: null,
      editorData: '',
      editorConfig: {
        placeholder: '请填写内容',
        plugins: [
          EssentialsPlugin,
          CloudServices,
          // UploadAdapter,
          Autoformat,
          BoldPlugin,
          ItalicPlugin,
          LinkPlugin,
          ParagraphPlugin,
          Heading,
          FontColor,
          FontBackgroundColor,
          FontFamily,
          FontSize,
          List,
          EasyImage,
          Image,
          ImageToolbar,
          ImageUpload,
          ImageCaption,
          ImageStyle,
          Alignment
        ],
        toolbar: {
          items: [
            'heading',
            '|',
            'alignment',
            'bold',
            'italic',
            'link',
            'fontFamily',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
            'bulletedList',
            'numberedList',
            'imageUpload',
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
        },
        image: {
          toolbar: [
            'imageStyle:full',
            'imageStyle:side',
            'imageStyle:inline',
            'imageStyle:block',
            '|',
            'imageTextAlternative'
          ]
        }
      }
    }
  },
  methods: {
    onReady (editor) {
      this.editorEntity = editor
      // 自定义上传图片插件
      editor.plugins.get('FileRepository').createUploadAdapter = loader => {
        return new MyUploadAdapter(loader)
      }
    },
    getData () {
      return this.editorEntity.getData()
    },
    setData () {
      const context = '<p>This is editor!</p>'
      this.editorEntity.setData(context)
    }
  }
}
</script>

<style>
/*编辑框最低高度*/
.ck-editor__editable {
  min-height: 400px;
}
strong {
  font-weight: bold;
}
</style>
