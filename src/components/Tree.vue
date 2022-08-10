<template>
  <div class="app-container">
    <div class="tree-container">
      <div class="tree-header">
        <div class="tree-btn">
          <!-- <el-button
            type="primary"
            size="small"
            plain
            :disabled="isMultipleDownload"
            @click="handleDownload(null, 1)"
          >
            批量下载</el-button
          >
          <el-button
            type="primary"
            size="small"
            plain
            :disabled="isMultipleShare"
            @click="handleShare(null, 1)"
            >批量分享</el-button
          > -->
          <el-button
            type="primary"
            size="small"
            plain
            @click="handleNodeClick(52)"
            >选中节点</el-button
          >
          <el-button
            type="primary"
            size="small"
            plain
            @click="getNodeChild(treeData)"
            >获取子节点</el-button
          >
          <el-button
            type="primary"
            size="small"
            plain
            @click="getNodeByKeyWord()"
            >遍历多叉树</el-button
          >
          <el-button type="primary" size="small" plain @click="getNodes()"
            >获取选中节点</el-button
          >
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            clearable
          />
        </div>
        <div class="total-num" v-if="false">共 {{ totalNum }} 个文件</div>
      </div>
      <div class="tree-flex">
        <el-table :data="treeData" border style="width: 99.9%" :fit="true">
          <el-table-column label="文件目录">
            <!-- eslint-disable-next-line vue/no-unused-vars -->
            <template slot-scope="{ row }">
              <!-- {{row}} -->
              <div class="tree-box">
                <div v-loading="loading" class="tree-content">
                  <el-tree
                    ref="tree"
                    class="tree"
                    :data="row"
                    node-key="directoryId"
                    :props="props"
                    :show-checkbox="true"
                    :default-expand-all="false"
                    @node-click="handleNodeClickTree"
                    @check="handleCheckChange"
                    @check-change="handleCurChange"
                    :filter-node-method="filterNode"
                  >
                    <div
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
                          <!-- <span class="secret-box">
                    {{ data.secretType | secretType }}
                  </span>
                  <span class="download-box">
                    {{ data.downloadType | downloadStatus }}
                  </span>
                  <span class="operate-box">
                    <el-button
                      type="text"
                      size="small"
                      @click.stop="() => handleShare(data, 2)"
                      >分享</el-button
                    >
                  </span> -->
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
                          <!-- <span class="size-box">
                    {{ data.size | renderSize }}
                  </span>
                  <span class="time-box">
                    {{ $DayTime(data.gmtUpdate).format("YYYY-MM-DD HH:mm") }}
                  </span>
                  <span class="upload-box">
                    {{ $DayTime(data.gmtUpload).format("YYYY-MM-DD HH:mm") }}
                  </span>
                  <span class="secret-box">
                    {{ data.secretType | secretType }}
                  </span>
                  <span class="download-box">
                    {{ data.downloadType | downloadStatus }}
                  </span>
                  <span class="operate-box">
                    <el-button
                      v-if="data.downloadType === 1"
                      type="text"
                      size="small"
                      @click="() => handleDownload(data, 2)"
                      >下载</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="() => handleShare(data, 2)"
                      >分享</el-button
                    >
                  </span> -->
                        </div>
                        <div class="node_div code-time">
                          <div class="code">文件编码:{{ data.gmtUpdate }}</div>
                          <div class="time">
                            {{ data.gmtUpdate | timerFilter }}
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-tree>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          :data="treeChildArray"
          border
          style="width: 100%"
          v-if="treeChildArray.length > 0"
        >
          <el-table-column label="文件目录2">
            <!-- eslint-disable-next-line vue/no-unused-vars -->
            <template slot-scope="{ row }">
              <!-- {{row}} -->
              <div class="tree-box">
                <div v-loading="loading" class="tree-content">
                  <el-tree
                    ref="treeChild"
                    class="tree"
                    :data="row"
                    node-key="directoryId"
                    :props="props"
                    :show-checkbox="true"
                    :default-expand-all="false"
                    @node-click="handleNodeClickChildTree"
                    @check-change="handleCurChangeChild"
                    :filter-node-method="filterNode"
                  >
                    <div
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
                          <!-- <span class="secret-box">
                    {{ data.secretType | secretType }}
                  </span>
                  <span class="download-box">
                    {{ data.downloadType | downloadStatus }}
                  </span>
                  <span class="operate-box">
                    <el-button
                      type="text"
                      size="small"
                      @click.stop="() => handleShare(data, 2)"
                      >分享</el-button
                    >
                  </span> -->
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
                          <!-- <span class="size-box">
                    {{ data.size | renderSize }}
                  </span>
                  <span class="time-box">
                    {{ $DayTime(data.gmtUpdate).format("YYYY-MM-DD HH:mm") }}
                  </span>
                  <span class="upload-box">
                    {{ $DayTime(data.gmtUpload).format("YYYY-MM-DD HH:mm") }}
                  </span>
                  <span class="secret-box">
                    {{ data.secretType | secretType }}
                  </span>
                  <span class="download-box">
                    {{ data.downloadType | downloadStatus }}
                  </span>
                  <span class="operate-box">
                    <el-button
                      v-if="data.downloadType === 1"
                      type="text"
                      size="small"
                      @click="() => handleDownload(data, 2)"
                      >下载</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="() => handleShare(data, 2)"
                      >分享</el-button
                    >
                  </span> -->
                        </div>
                        <div class="node_div code-time">
                          <div class="code">文件编码:{{ data.gmtUpdate }}</div>
                          <div class="time">
                            {{ data.gmtUpdate | timerFilter }}
                          </div>
                        </div>
                      </template>
                    </div>
                  </el-tree>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    activeName: {
      type: String
    }
  },
  name: 'Tree',
  filters: {
    timerFilter (v) {
      const date = new Date(v)
      const Y = date.getFullYear() + '-'
      const M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      const D = date.getDate() + ' '
      const h = date.getHours() + ':'
      const m = date.getMinutes() + ':'
      const s = date.getSeconds()
      // console.log(Y + M + D + h + m + s) // 呀麻碟,
      return Y + M + D + h + m + s
    }
  },
  components: {
    // 'el-table': table
    // treeChild
    // 'el-checkbox-button': elCheckboxButton
  },
  data () {
    return {
      checkboxGroup1: ['上海'],
      cityOptions: [
        { name: '上海', color: '#0f0f0f' },
        { name: '上海2', color: '#0f9f0f' },
        { name: '上海3', color: '#5f2f0f' }
      ],
      treeChildArray: [],
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
      },
      treeData: [
        [
          // 初始化目录树数据
          {
            directoryId: 1,
            level: 1,
            directoryType: 2, // 1:目录 2:文件
            downloadType: 1,
            secretType: 0,
            size: 12367,
            name: '前端大厂面试宝典.pdf',
            gmtUpdate: 1630825270483,
            gmtUpload: 1630825248029,
            children: []
          },
          {
            directoryId: 2,
            directoryType: 2,
            downloadType: 1,
            secretType: 1,
            size: 5236700,
            level: 1,
            name: '前端高级工程师内功秘籍.docx',
            gmtUpdate: 1630825270483,
            gmtUpload: 1630825248029,
            children: []
          },
          {
            directoryId: 3,
            directoryType: 2,
            downloadType: 0,
            secretType: 1,
            size: 2267,
            level: 1,
            name: '前端学习路线图.png',
            gmtUpdate: 1630834889072,
            gmtUpload: 1630825248029,
            children: []
          },
          {
            directoryId: 4,
            directoryType: 1,
            downloadType: 1,
            secretType: 0,
            name: '前端开源项目汇总',
            level: 1,
            gmtUpdate: 1630825270483,
            gmtUpload: 1630825248029,
            children: [
              {
                pid: 4,
                directoryId: 41,
                directoryType: 2,
                downloadType: 1,
                secretType: 0,
                size: 13200,
                level: 2,
                name: '小程序个性简历源码.zip',
                gmtUpdate: 1630825270483,
                gmtUpload: 1630825248029,
                children: []
              },
              {
                pid: 4,
                directoryId: 42,
                directoryType: 1,
                downloadType: 1,
                secretType: 0,
                name: '电商网站项目',
                level: 2,
                gmtUpdate: 1630825270483,
                gmtUpload: 1630825248029,
                children: [
                  {
                    pid: 42,
                    directoryId: 421,
                    directoryType: 2,
                    downloadType: 1,
                    secretType: 0,
                    size: 132008,
                    level: 3,
                    name: '饿了么H5移动端源码.zip',
                    gmtUpdate: 1630825270483,
                    gmtUpload: 1630825248029,
                    children: []
                  }
                ]
              }
            ]
          },
          {
            directoryId: 5,
            directoryType: 1,
            downloadType: 0,
            secretType: 1,
            level: 1,
            name: '前端工程化知识体系',
            gmtUpdate: 1630834889072,
            gmtUpload: 1630834889072,
            children: [
              {
                pid: 5,
                directoryId: 51,
                directoryType: 2,
                downloadType: 0,
                secretType: 1,
                size: 13200,
                level: 2,
                name: 'CI/CD项目部署.doc',
                gmtUpdate: 1630834889072,
                gmtUpload: 1630834889072,
                children: []
              },
              {
                pid: 5,
                directoryId: 52,
                directoryType: 2,
                downloadType: 0,
                secretType: 1,
                size: 335200,
                level: 2,
                name: '前端开发规范秘籍.xlsx',
                gmtUpdate: 1630834889072,
                gmtUpload: 1630834889072,
                children: []
              }
            ]
          }
        ]
      ]
    }
  },
  watch: {
    activeName () {
      console.log('结果😀😀😀===>', this.activeName)
      this.$bus.$off('handleNodeClick', this.handleNodeClick)
      this.$bus.$on('handleNodeClick', this.handleNodeClick)
    },
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
    this.$bus.$on('handleNodeClick', this.handleNodeClick)
    // this.getTotalNum(this.treeData)
  },
  beforeDestroy () {
    console.log('beforeDestroy结果😀😀😀===>')
    this.$bus.$off('handleNodeClick', this.handleNodeClick)
  },
  methods: {
    getNodeChild (treeData, directoryId, isChild) {
      // console.log('getNodeChild获取子节点结果😀😀😀===>')
      let node = {
        children: []
      }
      // if (this.treeData.length > 1) this.treeData.splice(1, 1)

      // 找到对应的node
      treeData.map((item) => {
        if (item.directoryId === directoryId) {
          if (item.children.length > 0) {
            node = item
          } else if (!isChild) {
            this.treeChildArray = []
          }
        } else if (item.children) {
          this.getNodeChild(item.children, directoryId)
        }
      })
      // console.log('获取子节点node结果😀😀😀===>', node)

      if (Object.keys(node).length > 0 && node.children.length > 0) {
        // console.log('node结果😀😀😀===>', node)
        // this.treeData.push([node])
        this.treeChildArray = [node.children]
      }
      return node
    },
    changeInput ($event) {
      this.$forceUpdate()
    },
    handleNodeClickTree (a) {
      console.log('handleNodeClickTree结果😀😀😀===>', a)
      this.getNodeChild(this.treeData[0], a.directoryId, false)
    },
    handleNodeClickChildTree (a) {
      console.log('handleNodeClickChildTree结果😀😀😀===>', a)
      // this.handleNodeClick(a.directoryId)
    },
    // 脑图点击联动目录树
    handleNodeClick (id) {
      // this.$bus.$emit('export', 'json', true, '思维导图')
      console.log('handleNodeClick结果😀😀😀===>', id)
      this.$emit('switchActive')
      this.$nextTick(() => {
        //   节点的id 传进来
        // this.$refs.tree.setCurrentKey([id])
        this.$refs.tree.setCheckedKeys([id])
        // this.$refs.tree.store.nodesMap[id].expanded = true
        this.handleNodeClickTree({ directoryId: id })
        this.$nextTick(() => {
          this.getNodes()
        })
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
      // console.log(data, checked, indeterminate)
      if (!checked) {
        if (indeterminate) {
          data.isChecked = true
        } else {
          data.isChecked = false
          // console.log(checked)
          await this.findParent(data, this.treeData, checked)
        }
        // data.isChecked = false;
      } else {
        await this.findParent(data, this.treeData, checked)
      }
    },
    async handleCurChangeChild (data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
      if (!checked) {
        if (indeterminate) {
          data.isChecked = true
        } else {
          data.isChecked = false
          console.log(checked)
          await this.findParent(data, this.treeChildArray, checked)
        }
        // data.isChecked = false;
      } else {
        await this.findParent(data, this.treeChildArray, checked)
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
          // console.log(treeData[i])
          // 同级子节点是否有一条被选中
          let isBoolean = false
          // console.log('treeData[i].children结果😀😀😀===>', treeData[i].children)
          if (treeData[i].children && treeData[i].children.length > 0) {
            isBoolean = treeData[i].children.some((item) => {
              return item.isChecked === true
            })
          }
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
.el-tree-node{
  // padding: 18px 0;
}
.el-tree-node__content {
  // padding: 18px 0;
  height: auto !important;
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
