<template>
  <!--右键菜单-->
  <div
    id="rightMenuDom"
    class="right-menu"
    :style="{
      display: rightMenuStatus,
      top: rightMenuTop,
      left: rightMenuLeft,
    }"
  >
    <ul>
      <!--分为2组渲染-->
      <li>
        <div
          v-for="item in rightMenuList"
          :key="item.id"
          v-show="item.id <= 5"
          @mouseover="mouseoverEvent(item.text)"
        >
          <!--status为true时, 代表禁用-->
          <span
            v-if="item.text.status && item.text.status === true"
            class="disable"
            >{{ item.text.content }}
          </span>
          <!--status为false时, 参数为对象, 取content中的值-->
          <span
            v-else-if="item.text.status && item.text.status === false"
            @click="item.handler(item.parameter && item.parameter)"
          >
            {{ item.text.content }}
          </span>
          <span v-else @click="item.handler(item.parameter && item.parameter)"
            >{{ item.text }}
          </span>
        </div>
      </li>
      <!-- <li>
        <div v-for="item in rightMenuList" :key="item.id" v-show="item.id > 3" @mouseover="mouseoverEvent(item.text)">
          <span
            v-if="item.text.status && item.text.status === true"
            class="disable"
            >{{ item.text.content }}
          </span>
          <span
            v-else-if="item.text.status && item.text.status === false"
            @click="item.handler(item.parameter && item.parameter)"
          >
            {{ item.text.content }}
          </span>
          <span v-else @click="item.handler(item.parameter && item.parameter)"
            >{{ item.text }}
          </span>
        </div>
      </li> -->
      <div class="newDataClass" v-if="text === '新建'">
        <div
          v-for="item in rightMenuList"
          :key="item.id"
          v-show="item.id > 5"
          @mouseover="mouseoverEvent('新建')"
        >
          <span
            v-if="item.text.status && item.text.status === true"
            class="disable"
            >{{ item.text.content }}
          </span>
          <span
            v-else-if="item.text.status && item.text.status === false"
            @click="item.handler(item.parameter && item.parameter)"
          >
            {{ item.text.content }}
          </span>
          <span v-else @click="item.handler(item.parameter && item.parameter)"
            >{{ item.text }}
          </span>
        </div>
      </div>
      <!-- <template v-if="text === '新建'" >
        <div class="newDataClass" @mouseover="mouseoverEvent('新建')">
          <div>文件夹</div>
          <div>文档</div>
          <div>上传图片</div>
          <div>表单</div>
          <div>上传表单</div>
        </div>
      </template> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'right-menu',
  props: {
    rightMenuStatus: String,
    rightMenuTop: String,
    rightMenuLeft: String,
    rightMenuList: Array
  },
  data () {
    return {
      hover: false,
      text: ''
    }
  },
  watch: {
    hover () {
      console.log('hover结果😀😀😀===>', this.hover)
    }
  },
  methods: {
    mouseoverEvent (text) {
      console.log('结果😀😀😀===>', this.rightMenuList)
      this.text = text
      console.log('结果😀😀😀===>', text)
    }
  }
}
</script>

<style scoped lang="scss">
// 右键菜单样式
.right-menu {
  position: fixed;
  left: 0;
  top: 0;
  width: 166px;
  height: auto;
  background-color: rgb(242, 242, 242);
  border: solid 1px #c2c1c2;
  box-shadow: 0 10px 10px #c2c1c2;
  display: none;
  border-radius: 5px;

  ul {
    padding: 0;
    margin: 0;
    font-size: 15px;

    li {
      list-style: none;
      box-sizing: border-box;
      padding: 6px 0;
      // border-bottom: 1px solid rgb(216, 216, 217);

      &:nth-child(1) {
        padding-top: 2px;
      }

      &:nth-last-child(1) {
        border-bottom: none;
      }

      div {
        height: 25px;
        span {
          display: block;
          height: 100%;
          line-height: 25px;
          padding-left: 16px;

          &:hover {
            background-color: #0070f5;
            cursor: pointer;
            color: #ffffff;
          }
        }

        // 禁止点击样式
        .disable {
          color: #666666;

          &:hover {
            cursor: not-allowed;
            background-color: #f2f2f2;
            color: #666666;
          }
        }
      }
    }
    .newDataClass {
      position: absolute;
      top: 0;
      left: 160px;
      width: 100px;
      background-color: rgb(242, 242, 242);
      border: solid 1px #c2c1c2;
      box-shadow: 0 10px 10px #c2c1c2;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      div {
        width: 100%;
        height: 25px;
        span {
          display: block;
          height: 100%;
          line-height: 25px;
          padding-left: 16px;

          &:hover {
            background-color: #0070f5;
            cursor: pointer;
            color: #ffffff;
          }
        }

        // 禁止点击样式
        .disable {
          color: #666666;

          &:hover {
            cursor: not-allowed;
            background-color: #f2f2f2;
            color: #666666;
          }
        }
      }
      // display: none;
    }
  }
}
</style>
