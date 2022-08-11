<template>
  <div class="editContainer">
    <div class="mindMapContainer" ref="mindMapContainer"></div>
    <Count></Count>
    <NavigatorToolbar :mindMap="mindMap"></NavigatorToolbar>
     <Outline></Outline>
    <Style></Style>
    <BaseStyle :data="mindMapData" :mindMap="mindMap"></BaseStyle>
    <Theme :mindMap="mindMap"></Theme>
    <Structure :mindMap="mindMap"></Structure>
    <ShortcutKey></ShortcutKey>
    <Contextmenu :mindMap="mindMap"></Contextmenu>
    <!-- <HoverNode :mindMap="mindMap"></HoverNode> -->
    <NodeNoteContentShow></NodeNoteContentShow>
  </div>
</template>

<script>

import MindMap from 'simple-mind-map'
import Outline from './Outline'
import Style from './Style'
import BaseStyle from './BaseStyle'
import Theme from './Theme'
import Structure from './Structure'
import Count from './Count'
import NavigatorToolbar from './NavigatorToolbar'
import ShortcutKey from './ShortcutKey'
import Contextmenu from './Contextmenu'
// import HoverNode from './hoverNode'
import NodeNoteContentShow from './NodeNoteContentShow.vue'
import { getData, storeData, storeConfig } from '@/api'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:56:17
 * @Desc: 编辑区域
 */
export default {
  name: 'Edit',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Outline,
    // eslint-disable-next-line vue/no-unused-components
    Style,
    // eslint-disable-next-line vue/no-unused-components
    BaseStyle,
    // eslint-disable-next-line vue/no-unused-components
    Theme,
    // eslint-disable-next-line vue/no-unused-components
    Structure,
    // eslint-disable-next-line vue/no-unused-components
    Count,
    // eslint-disable-next-line vue/no-unused-components
    NavigatorToolbar,
    // eslint-disable-next-line vue/no-unused-components
    ShortcutKey,
    // eslint-disable-next-line vue/no-unused-components
    Contextmenu,
    // HoverNode,
    // eslint-disable-next-line vue/no-unused-components
    NodeNoteContentShow
  },
  data () {
    return {
      directoryId: '',
      timeDiffer: 0,
      mindMap: null,
      mindMapData: null,
      prevImg: '',
      openTest: false
    }
  },
  watch: {
    timeDiffer (newVal, oldVal) {
      if (newVal - oldVal <= 500) {
        console.log('😀😀timeDiffer-----双击😀😀😀===>')
        this.$bus.$emit('handleNodeClick', this.directoryId)
      }
    }
  },
  mounted () {
    this.getData()
    this.init()
    this.$bus.$on('execCommand', this.execCommand)
    this.$bus.$on('export', this.export)
    this.$bus.$on('setData', this.setData)
    this.$bus.$on('node_click', this.nodeClick)
    this.$bus.$on('node_dblclick', this.nodeDbClick)
    this.$bus.$on('mouseover', this.mouseEvent('mouseover'))
    this.$bus.$on('mouseout', this.mouseEvent('mouseout'))
    this.$bus.$on('startTextEdit', () => {
      this.mindMap.renderer.startTextEdit()
    })
    this.$bus.$on('endTextEdit', () => {
      this.mindMap.renderer.endTextEdit()
    })
    if (this.openTest) {
      setTimeout(() => {
        this.test()
      }, 5000)
    }
    this.getNode()
  },
  methods: {
    mouseEvent (event) {
      // console.log('鼠标事件结果😀😀😀===>', event)
    },
    getNode () {
      // console.log('this.mindMap.renderer结果😀😀😀===>', this.mindMap.renderer)
    },
    /**
     * @Author: 王林25
     * @Date: 2021-11-22 19:39:28
     * @Desc: 数据更改测试
     */
    test () {
      const nodeData = {
        data: { text: '根节点', expand: true, isActive: false },
        children: []
      }
      setTimeout(() => {
        nodeData.data.text = '理想青年实验室'
        this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

        setTimeout(() => {
          nodeData.children.push({
            data: { text: '网站', expand: true, isActive: false },
            children: []
          })
          this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

          setTimeout(() => {
            nodeData.children.push({
              data: { text: '博客', expand: true, isActive: false },
              children: []
            })
            this.mindMap.setData(JSON.parse(JSON.stringify(nodeData)))

            setTimeout(() => {
              const viewData = { transform: { scaleX: 1, scaleY: 1, shear: 0, rotate: 0, translateX: 179, translateY: 0, originX: 0, originY: 0, a: 1, b: 0, c: 0, d: 1, e: 179, f: 0 }, state: { scale: 1, x: 179, y: 0, sx: 0, sy: 0 } }
              this.mindMap.view.setTransformData(viewData)

              setTimeout(() => {
                const viewData = { transform: { scaleX: 1.6000000000000005, scaleY: 1.6000000000000005, shear: 0, rotate: 0, translateX: -373.3000000000004, translateY: -281.10000000000025, originX: 0, originY: 0, a: 1.6000000000000005, b: 0, c: 0, d: 1.6000000000000005, e: -373.3000000000004, f: -281.10000000000025 }, state: { scale: 1.6000000000000005, x: 179, y: 0, sx: 0, sy: 0 } }
                this.mindMap.view.setTransformData(viewData)
              }, 1000)
            }, 1000)
          }, 1000)
        }, 1000)
      }, 1000)
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-03 22:11:37
     * @Desc: 获取思维导图数据，实际应该调接口获取
     */
    getData () {
      const storeData = getData()
      this.mindMapData = storeData
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-01 10:19:07
     * @Desc: 存储数据当数据有变时
     */
    bindSaveEvent () {
      if (this.openTest) {
        return
      }
      this.$bus.$on('data_change', (data) => {
        storeData(data)
      })
      this.$bus.$on('view_data_change', (data) => {
        storeConfig({
          view: data
        })
      })
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-02 23:19:52
     * @Desc: 手动保存
     */
    manualSave () {
      if (this.openTest) {
        return
      }
      const data = this.mindMap.command.getCopyData()
      storeData(data)
      const viewData = this.mindMap.view.getTransformData()
      storeConfig({
        view: viewData
      })
    },

    /**
     * @Author: 王林
     * @Date: 2021-04-10 15:01:01
     * @Desc: 初始化
     */
    init () {
      const { root, layout, theme, view } = this.mindMapData
      // console.log('theme结果😀😀😀===>', theme)
      this.mindMap = new MindMap({
        el: this.$refs.mindMapContainer,
        data: root,
        layout: layout,
        theme: theme.template,
        themeConfig: theme.config,
        viewData: view,
        customNoteContentShow: {
          show: (content, left, top) => {
            this.$bus.$emit('showNoteContent', content, left, top)
          },
          hide: () => {
            this.$bus.$emit('hideNoteContent')
          }
        }
      })
      // this.mindMap.setMode('readonly')
      this.mindMap.keyCommand.addShortcut('Control+s', () => {
        this.manualSave()
      })
      // 转发事件
      ;[
        'node_active',
        'data_change',
        'view_data_change',
        'back_forward',
        'node_contextmenu',
        'node_click',
        'node_dblclick',
        'draw_click',
        'expand_btn_click',
        'svg_mousedown',
        'mouseup',
        'mode_change'
        // 'mouseover',
        // 'mouseout'
      ].forEach((event) => {
        this.mindMap.on(event, (...args) => {
          // console.log('event结果😀😀😀===>', event)
          // console.log('...args结果😀😀😀===>', ...args)
          this.$bus.$emit(event, ...args)
        })
      })
      this.bindSaveEvent()
      this.mindMap.keyCommand.removeShortcut('Del|Backspace')
    },

    /**
     * @Author: 王林
     * @Date: 2021-08-03 23:01:13
     * @Desc: 动态设置思维导图数据
     */
    setData (data) {
      this.mindMap.setData(data)
      this.manualSave()
      this.$bus.$emit('showTheme')
    },
    nodeClick (node, e) {
      // this.mindMap.setData(data)
      // this.manualSave()
      // this.timeDiffer = new Date().getTime()
      this.directoryId = node.nodeData.data.directoryId
      console.log('nodeClick结果😀😀😀===>', node.nodeData.data)
      // this.$bus.$emit('handleNodeClick', node.nodeData.data.directoryId)
      // console.log('nodeClick  e结果😀😀😀===>', e)
    },
    nodeDbClick (node, e) {
      // this.mindMap.setData(data)
      // this.manualSave()
      // this.timeDiffer = new Date().getTime()
      // this.directoryId = node.nodeData.data.directoryId
      console.log('nodeDbClick结果😀😀😀===>', node.nodeData.data)
      this.$bus.$emit('handleNodeClick', node.nodeData.data.directoryId)
      // console.log('nodeClick  e结果😀😀😀===>', e)
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 13:32:11
     * @Desc: 重新渲染
     */
    reRender () {
      this.mindMap.reRender()
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-04 13:08:28
     * @Desc: 执行命令
     */
    execCommand (...args) {
      this.mindMap.execCommand(...args)
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-01 22:33:02
     * @Desc: 导出
     */
    async export (...args) {
      try {
        this.mindMap.export(...args)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editContainer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .mindMapContainer {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
  }
}
</style>
