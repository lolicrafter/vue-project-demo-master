<!--  -->
<template>
  <div class="app-container">
    <ykeditor  ref="editorRef" />
    <button @click="setContent">设置内容</button>
    <button @click="getContent">获取内容</button>
  </div>
</template>
<script>
import ykeditor from '../components/ykeditor'
// import ykeditor from '../components/ckeditor'
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  name: 'About',
  // import引入的组件需要注入到对象中才能使用
  components: { ykeditor },
  data () {
    // 这里存放数据
    return {}
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    setContent () {
      this.$refs.editorRef.setContent('<h1>这是ykEditor</h1>')
    },

    getContent () {
      console.log(this.$refs.editorRef)
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {},
  activated () {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang='scss'>
</style>
