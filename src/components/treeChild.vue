<!--  -->
<template>
  <div v-loading="loading" class="tree-content">
    <el-tree
      ref="tree"
      class="tree"
      :data="treeData"
      node-key="directoryId"
      :props="props"
      :show-checkbox="true"
      :default-expand-all="false"
      @check="handleCheckChange"
      @check-change="handleCurChange"
      @node-click="handleNodeClickTree"
      :filter-node-method="filterNode"
    >
      <span
        slot-scope="{ node, data }"
        class="custom-tree-node"
        v-right-click:[{data}]="rightMenuObj"
      >
        <template>
          <div v-if="data.directoryType === 1" class="node_div">
            <span class="name-box">
              <el-tooltip effect="dark" placement="left">
                <div slot="content">
                  {{ node.label }}
                </div>
                <i class="file-icon icon-folder"></i>
              </el-tooltip>
              {{ node.label }}
            </span>
          </div>
          <div v-if="data.directoryType === 2" class="node_div">
            <span class="name-box" :title="node.label">
              <el-tooltip effect="dark" placement="left">
                <div slot="content">
                  {{ node.label }}
                </div>
                <i :class="node.label | getIcon"></i>
              </el-tooltip>
              {{ node.label }}
            </span>
          </div>
        </template>
      </span>
    </el-tree>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data () {
    // 这里存放数据
    return {
      targetId: '',
      nodeIds: [],
      filterText: '',
      loading: false, // 页面预加载
      isCheckedAll: false, // 是否全选状态
      isIndeterminate: false, // 是否半选状态
      isMultipleDownload: true, // 批量下载按钮是否禁用
      isMultipleShare: true, // 批量分享按钮是否禁用
      newTreeArray: [], // 过滤新数组
      totalNum: 0, // 统计文件数
      selectTotalNum: 0, // 选中文件数
      props: {
        // 配置选项
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      }
    }
  },
  props: {
    treeData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  watch: {
    filterText (val) {
      this.$nextTick(() => {
        this.$refs.tree.filter(val)
      })
    }
  },
  computed: {
    rightMenuObj () {
      // 右键菜单对象，菜单内容和处理事件
      const obj = {
        this: this,
        text: [
          '新建',
          // { content: '复制用户id', status: false },
          '编辑',
          '移动',
          '删除',
          '详情',
          '文件夹',
          '文档',
          '上传图片',
          '表单',
          '上传表单'
        ],
        handler: {
          checkingData (parameter) {
            console.log(parameter)
            console.log('查看资料点击事件')
          },
          copyId (parameter) {
            console.log('复制用户id点击事件', parameter)
          },
          removeItem () {
            console.log('移除会话点击事件')
          },
          showContact () {
            console.log('在联系人中查看')
          },
          showSingleChat () {
            console.log('在单聊窗口中打开')
          },
          //
          newFolder () {
            console.log('newFolder')
          },
          newFile () {
            console.log('newFile')
          },
          uploadImage () {
            console.log('uploadImage')
          },
          forms () {
            console.log('forms')
          },
          uploadForm () {
            console.log('uploadForm')
          }
        }
      }
      return obj
    }
  },
  mounted () {
    this.getTotalNum(this.treeData)
  },
  methods: {
    handleNodeClickTree (a) {
      console.log('a结果😀😀😀===>', a)
      // this.handleNodeClick(a.directoryId)
      //   this.getNodeChild(this.treeData, a.directoryId)
      this.$emit('handleNodeClick', a.directoryId)
      // console.log('b结果😀😀😀===>', b)
      // console.log('c结果😀😀😀===>', c)
    },
    getNodeChild (treeData) {
      const childArray = []
      treeData.map((item) => {
        if (item.name === '前端开源项目汇总') childArray.push(item)
      })
      return childArray
    },
    changeInput ($event) {
      this.$forceUpdate()
    },
    // 脑图点击联动目录树
    handleNodeClick (id) {
      this.$bus.$emit('export', 'json', true, '思维导图')
      console.log('handleNodeClick结果😀😀😀===>', id)
      this.$nextTick(() => {
        //   节点的id 传进来
        // this.$refs.tree.setCurrentKey([id])
        this.$refs.tree.setCheckedKeys([id])
        // this.$refs.tree.store.nodesMap[id].expanded = true
        this.getNodes()
      })
    },
    // 根据关键词获取id
    getNodeByKeyWord () {
      this.targetId = ''
      this.parseTreeJson(this.treeData)
      console.log('根据关键词获取id结果😀😀😀===>', this.targetId)
    },
    // 递归实现
    parseTreeJson (treeNodes) {
      if (!treeNodes || !treeNodes.length) return
      for (var i = 0, len = treeNodes.length; i < len; i++) {
        const element = treeNodes[i]
        var children = treeNodes[i].children
        console.log('treeNodes[i].id==>', element.name)
        if (element.name.includes(this.filterText)) {
          console.log('keyword结果😀😀😀===>', this.filterText)
          this.targetId = element.directoryId
          break
        }
        if (children && children.length > 0) {
          this.parseTreeJson(children)
        }
      }
    },
    getNodes () {
      this.$nextTick(() => {
        const getCurrentKey = this.$refs.tree.getCheckedKeys()[0]
        if (!getCurrentKey) return
        this.$refs.tree.setCurrentKey(getCurrentKey)
        const data = this.$refs.tree.getNode(getCurrentKey)
        this.nodeIds = []
        this.filterNodeAndParentId(data)
        this.nodeIds.map((id) => {
          this.$refs.tree.store.nodesMap[id].expanded = true
        })
      })
    },
    // 递归检测获取父元素ID
    filterNodeAndParentId (node) {
      // console.log('递归检测父元素或自己是否符合条件结果😀😀😀===>', node.label)
      this.nodeIds.push(node.data.directoryId)
      if (node.level === 1) {
        return node.data.directoryId
      } else {
        return this.filterNodeAndParentId(node.parent)
      }
    },
    filterNode (value, data, node) {
      return this.filterNodeAndParent(value, data, node)
    },
    // 递归检测父元素或自己是否符合条件
    filterNodeAndParent (value, data, node) {
      // console.log('递归检测父元素或自己是否符合条件结果😀😀😀===>', node.data.name)
      if (node.level === 1) {
        return node.data.name.indexOf(value) !== -1
      } else if (node.level !== 1) {
        // 判断自己是否符合条件
        if (node.data.name.indexOf(value) !== -1) {
          return true
        } else {
          // 否则查找父级
          return this.filterNodeAndParent(value, node.data, node.parent)
        }
      }
    },
    // 目录树是否全选
    async handleCheckAllChange (val) {
      console.log('是否全选===', val)
      const tree = this.treeData
      this.isMultipleShare = !val
      this.isIndeterminate = false
      if (val) {
        // 全选
        this.$refs.tree.setCheckedNodes(tree)
      } else {
        // 取消全选
        this.$refs.tree.setCheckedNodes([])
      }
      await this.selectCheckedAll(tree, val)
      this.selectTotalNum = 0
      await this.getRecursion(tree)
      this.newTreeArray = await this.getFilterFile(tree)
      const downloadTypeArr = await this.getDownloadFile(this.newTreeArray)
      this.isMultipleDownload =
        downloadTypeArr.includes(0) > 0 ? true : this.newTreeArray.length === 0

      setTimeout(() => {
        console.log('旧数组===', tree)
        console.log('downloadTypeArr===', downloadTypeArr)
        console.log('新数组===', this.newTreeArray, this.selectTotalNum)
      })
    },
    // 递归全选反选
    async selectCheckedAll (tree, checked) {
      for (const item of tree) {
        item.isChecked = checked
        if (item.children) {
          await this.selectCheckedAll(item.children, checked)
        }
      }
    },
    // 当复选框被点击的时候触发
    async handleCheckChange (data, node) {
      // console.log(data, node)
      const tree = this.treeData
      if (node.checkedNodes.length > 0) {
        await this.selectCheckedAll(node.checkedNodes, true)
        this.isMultipleShare = false
      } else {
        this.isCheckedAll = false
        this.isIndeterminate = false
        this.isMultipleDownload = true
        this.isMultipleShare = true
        this.newTreeArray = []
      }
      this.selectTotalNum = 0
      await this.getRecursion(tree)
      this.newTreeArray = await this.getFilterFile(tree)
      this.isCheckedAll = this.newTreeArray.length === tree.length
      this.isIndeterminate =
        this.newTreeArray.length > 0 && this.newTreeArray.length < tree.length

      const downloadTypeArr = await this.getDownloadFile(this.newTreeArray)
      this.isMultipleDownload =
        downloadTypeArr.includes(0) > 0 ? true : this.newTreeArray.length === 0

      setTimeout(() => {
        console.log('treeData===', tree, downloadTypeArr)
        console.log(
          '新数组newTreeArray===',
          this.newTreeArray,
          this.selectTotalNum
        )
      }, 500)
    },
    // 节点选中状态发生变化时的回调
    async handleCurChange (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      if (!checked) {
        if (indeterminate) {
          data.isChecked = true
        } else {
          data.isChecked = false
          console.log(checked)
          await this.findParent(data, this.treeData, checked)
        }
        // data.isChecked = false;
      } else {
        await this.findParent(data, this.treeData, checked)
      }
    },

    // 递归所有子集设置选中状态isChecked
    async getCheckedChild (data, flag) {
      return data.map(async (item) => {
        if (flag) {
          item.isChecked = true
        } else {
          item.isChecked = false
        }
        if (item.children) {
          await this.getCheckedChild(item.children, flag)
        }
      })
    },
    // 选中子节点获取所有父节点
    async findParent (childNode, treeData, checked) {
      if (!treeData) return
      for (let i = 0; i < treeData.length; i++) {
        // 父节点查询条件
        if (treeData[i].directoryId === childNode.pid) {
          console.log(treeData[i])
          // 同级子节点是否有一条被选中
          const isBoolean = treeData[i].children.some((item) => {
            return item.isChecked === true
          })
          treeData[i].isChecked = isBoolean
          console.log('isBoolean===', isBoolean)
          // 如果找到结果,保存当前节点
          // 用当前节点再去原数据查找当前节点的父节点
          await this.findParent(treeData[i], this.tableData, checked)
          // break;
        } else {
          if (treeData[i].children) {
            // 没找到，遍历该节点的子节点
            await this.findParent(childNode, treeData[i].children, checked)
          }
        }
      }
    },
    // 统计列表总文件数（也可以直接后端返回总文件个数）
    getTotalNum (tree) {
      for (const item of tree) {
        if (item.directoryType === 2) {
          this.totalNum += 1
        }
        if (item.children) {
          this.getTotalNum(item.children)
        }
      }
    },
    // 统计选中所有文件数
    async getRecursion (tree) {
      for (const item of tree) {
        if (item.directoryType === 2 && item.isChecked) {
          this.selectTotalNum += 1
        }
        if (item.children) {
          await this.getRecursion(item.children)
        }
      }
    },
    // 递归过滤保留被选中的目录树数组
    getFilterFile (tree) {
      return tree
        .filter((item) => item.isChecked === true)
        .map((item) => {
          item = Object.assign({}, item)
          if (item.children) {
            item.children = this.getFilterFile(item.children)
          }
          return item
        })
    },
    // 递归统计被选中的文件是否包含不可下载文件
    async getDownloadFile (tree, arrList = []) {
      for (const item of tree) {
        if (item.directoryType === 2) {
          arrList.push(item.downloadType)
        }
        if (item.children) {
          await this.getDownloadFile(item.children, arrList)
        }
      }
      return arrList
    },
    // 批量或单个下载
    async handleDownload (row, type) {
      console.log('下载===', row)
      if (type === 1) {
        this.$message.success(`已选中${this.selectTotalNum}个文件，下载成功`)
      } else {
        if (row.directoryType === 1) {
          this.$message.success('目录下载成功')
        } else {
          this.$message.success('文件下载成功')
        }
      }
    },
    // 批量或单个分享
    handleShare (row, type) {
      console.log('分享===', row)
      if (type === 1) {
        this.$message.success(`已选中${this.selectTotalNum}个文件，分享成功`)
      } else {
        if (row.directoryType === 1) {
          this.$message.success('目录分享成功')
        } else {
          this.$message.success('文件分享成功')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
