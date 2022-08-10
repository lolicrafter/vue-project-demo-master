<template>
  <el-dialog
    class="nodeDialog"
    title="图标"
    :visible.sync="dialogVisible"
    width="500"
  >
    <div class="item" v-for="item in nodeIconList" :key="item.name">
      <div class="title">{{ item.name }}</div>
      <div class="list">
        <div
          class="icon"
          v-for="icon in item.list"
          :key="icon.name"
          v-html="icon.icon"
          :class="{
            selected: iconList.includes(item.type + '_' + icon.name)
          }"
          @click="setIcon(item.type, icon.name)"
        ></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { nodeIconList } from 'simple-mind-map/src/svg/icons'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:33
 * @Desc: 节点图标内容设置
 */
export default {
  name: 'NodeIcon',
  data () {
    return {
      nodeIconList,
      dialogVisible: false,
      iconList: [],
      activeNodes: []
    }
  },
  created () {
    this.$bus.$on('node_active', (...args) => {
      this.activeNodes = args[1]
      if (this.activeNodes.length > 0) {
        const firstNode = this.activeNodes[0]
        this.iconList = firstNode.getData('icon') || []
      } else {
        this.iconList = []
      }
      // console.log(this.iconList, nodeIconList)
    })
    this.$bus.$on('showNodeIcon', () => {
      this.dialogVisible = true
    })
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-06-23 23:16:56
     * @Desc: 设置icon
     */
    setIcon (type, name) {
      console.log('this.activeNodes结果😀😀😀===>', this.activeNodes)
      const key = type + '_' + name
      const index = this.iconList.findIndex((item) => {
        return item === key
      })
      // 删除icon
      if (index !== -1) {
        this.iconList.splice(index, 1)
      } else {
        const typeIndex = this.iconList.findIndex((item) => {
          return item.split('_')[0] === type
        })
        // 替换icon
        if (typeIndex !== -1) {
          this.iconList.splice(typeIndex, 1, key)
        } else {
          // 增加icon
          this.iconList.push(key)
        }
      }
      this.activeNodes.forEach((node) => {
        node.setIcon([...this.iconList])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nodeDialog {
  ::v-deep .el-dialog__body {
    padding: 0 20px;
  }

  .deleteBtn {
    margin-bottom: 20px;
  }

  .item {
    margin-bottom: 20px;
    font-weight: bold;

    .title {
      margin-bottom: 10px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;

      .icon {
        width: 24px;
        height: 24px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;

        &.selected {
          &::after {
            content: '';
            position: absolute;
            left: -4px;
            top: -4px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2px solid #409EFF;
          }
        }
      }
    }
  }
}
</style>
