<template>
  <div class="ov-container">
    <el-tree :data="data" :props="defaultProps">
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        @click="showInfo(node, data)"
      >
        <i v-if="node.level == 1" class="province" />
        <i v-else-if="node.level == 2" class="city" />
        <i v-else-if="node.level == 3" class="data" />
        <i
          v-if="data.children.length !== 0"
          :class="node.expanded ? 'el-icon-remove' : 'el-icon-circle-plus'"
        />
        <i v-else class="el-icon-user-solid" />
        {{ data.label }}
      </span>
    </el-tree>
    <div
      class="test"
      @dblclick="dbClickEvent()"
      @click.right="rightEvent(friend)"
    >
      测试
    </div>
    <div class="right" v-right-click:[{id:19,bookid:1024}]="rightMenuObj">
      <h1>测试右箭</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1'
                }
              ]
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1'
                }
              ]
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1'
                }
              ]
            }
          ]
        },
        {
          label: '一级 4',
          children: [
            {
              label: '三级 3-2-1'
            }
          ]
        },
        {
          label: '一级 4'
        }
      ]
    }
  },
  computed: {
    rightMenuObj () {
      // 右键菜单对象，菜单内容和处理事件
      const obj = {
        this: this,
        text: [
          '查看资料',
          // { content: '复制用户id', status: false },
          '复制用户id',
          '移除该会话',
          '在联系人中查看',
          '在单聊窗口中打开',
          '会话置顶'
        ],
        handler: {
          checkingData (parameter) {
            console.log(parameter)
            console.log('查看资料点击事件')
          },
          copyId (parameter) {
            console.log('复制用户id点击事件', parameter)
          },
          // copyId2 (parameter) {
          //   console.log('2复制用户id点击事件', parameter)
          // },
          removeItem () {
            console.log('移除会话点击事件')
          },
          showContact () {
            console.log('在联系人中查看')
          },
          showSingleChat () {
            console.log('在单聊窗口中打开')
          },
          topConversation () {
            console.log('会话置顶')
          }
        }
      }
      return obj
    }
  },
  methods: {
    // 鼠标右键
    rightEvent (friend) {
      console.log('点击右键')
      this.$message({
        message: '恭喜你，这是一条点击右键',
        type: 'success'
      })
    },
    dbClickEvent () {
      this.$message({
        message: '恭喜你，这是一条dbClickEvent',
        type: 'success'
      })
    },
    showInfo (node, data) {
      console.log('node结果😀😀😀===>', node)
      console.log('data结果😀😀😀===>', data)
    }
  }
}
</script>

<style scoped lang="scss">
.ov-container {
  height: calc(100vh - 80px);
  background: #ffffff;
  border-radius: 5px;
  margin: 10px;
}

.province {
  background: url("https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/default.640d9a7.png");
  width: 17px;
  height: 14px;
  display: inline-block;
  background-size: 100% 100%;
}

.city {
  background: url("https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg")
    no-repeat;
  width: 17px;
  height: 14px;
  display: inline-block;
  background-size: 100% 100%;
}

.line {
  background: url("https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg")
    no-repeat;
  background-size: 100%;

  width: 17px;
  height: 14px;
  display: inline-block;
}

.data {
  background: url("https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg")
    no-repeat;
  background-size: 100%;

  width: 17px;
  height: 14px;
  display: inline-block;
}

.el-tree ::v-deep .el-tree-node__expand-icon.expanded {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
//有子节点 且未展开
.el-tree ::v-deep .el-icon-caret-right:before {
  //   background: url("../../assets/logo.png") no-repeat 0 0;
  content: "√";
  display: block;
  width: 12px;
  height: 12px;
  font-size: 16px;
  background-size: 100% 100%;
}
//有子节点 且已展开
.el-tree
  ::v-deep
  .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
  //   background: url("../../assets/logo.png") no-repeat 0 0;
  content: "x";
  display: block;
  width: 12px;
  height: 12px;
  font-size: 12px;
  background-size: 100% 100%;
}
//没有子节点
.el-tree ::v-deep .el-tree-node__expand-icon.is-leaf::before {
  //    background: url("../../assets/logo.png") no-repeat 0 0;
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  font-size: 16px;
  background-size: 100% 100%;
}
</style>
