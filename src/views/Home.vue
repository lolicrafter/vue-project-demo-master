<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="列表模式" name="first">
        <tree ref="treeRef" @switchActive="switchActive" />
      </el-tab-pane>
      <el-tab-pane label="导图模式" name="second">
        <div class="mind-container">
          <mind-map />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- <el-checkbox-group v-model="checkboxGroup1">
      <el-checkbox-button v-for="city in cityOptions" :label="city" :key="city.name" :bgColor="city.color">{{city.name}}</el-checkbox-button>
    </el-checkbox-group> -->
  </div>
</template>
<script>
import mindMap from '@/views/mind'
import tree from '../components/Tree.vue'

export default {
  name: 'Home',
  components: {
    mindMap,
    tree
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  watch: {

  },
  computed: {

  },
  mounted () {

  },
  beforeDestroy () {

  },
  methods: {
    switchActive () {
      this.activeName = 'first'
    }
  }
}
</script>
<style scoped lang="less">
.app-container {
  display: flex;
  position: relative;
  z-index: 9999;
  .tree-container {
    position: relative;
    z-index: 9999;
    top: 0;
    left: 0;
  }
  .mind-container {
    // position: relative;
    // flex: 1;
    // z-index: 1;
    // overflow: hidden;
  }
}
.tree-flex {
  display: flex;
  // overflow: auto;
  // width: 300px;
}
.tree-container {
  // min-width: 300px;
  text-align: left;
  .header {
    display: flex;
  }
  .tree-box {
    position: relative;
    height: 100%;
    .tree-nav {
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      padding: 12px 0;
      .item {
        font-size: 14px;
        color: #666;
        text-align: center;
        .checkbox-style {
          &.el-checkbox:last-of-type {
            margin-right: 12px;
            margin-left: 8px;
          }
        }
        &:nth-child(1) {
          flex: 1;
          text-align: left;
          padding-left: 16px;
        }
        &:nth-child(2),
        &:nth-child(5),
        &:nth-child(6) {
          flex: 0 0 100px;
        }
        &:nth-child(3),
        &:nth-child(4),
        &:nth-child(7) {
          flex: 0 0 200px;
        }
      }
    }
    .tree-content {
      .custom-tree-node {
        width: 100%;
        font-size: 14px;
        padding: 18px 0;

        .node_div {
          display: flex;
          align-items: center;
          span {
            text-align: center;
            &.name-box {
              flex: 1;
              text-align: left;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .size-box,
          .secret-box,
          .download-box {
            flex: 0 0 100px;
          }
          .time-box,
          .upload-box,
          .operate-box {
            flex: 0 0 200px;
          }
        }
        .code-time {
          justify-content: space-between;
          font-size: 12px;
          color: #000;
          padding: 5px 0;
        }
      }
    }
  }
  .tree-child {
  }
}
</style>
<style lang="less">
.el-tree-node__content {
  // padding: 18px 0;
  height: auto;
}
.el-button--small {
  font-size: 14px;
}
.tree-container {
  .is-current {
    background-color: #f5f7fa;
  }
  .el-checkbox {
    display: none;
  }
}
</style>
