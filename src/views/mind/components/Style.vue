<template>
  <Sidebar ref="sidebar" title="节点样式">
    <div class="styleBox">
      <el-tabs class="tab" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="常态" name="normal"></el-tab-pane>
        <el-tab-pane label="选中状态" name="active"></el-tab-pane>
      </el-tabs>
      <div class="sidebarContent" v-if="activeNodes.length > 0">
        <!-- 文字 -->
        <div class="title noTop">文字</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">字体</span>
            <el-select
              size="mini"
              v-model="style.fontFamily"
              placeholder=""
              @change="update('fontFamily')"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in fontFamilyList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                :style="{ fontFamily: item.value }"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">字号</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.fontSize"
              placeholder=""
              @change="update('fontSize')"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in fontSizeList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="rowItem">
            <span class="name">行高</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.lineHeight"
              placeholder=""
              @change="update('lineHeight')"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in lineHeightList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="btnGroup">
            <el-tooltip content="颜色" placement="bottom">
              <div class="styleBtn" v-popover:popover>
                A
                <span
                  class="colorShow"
                  :style="{ backgroundColor: style.color || '#eee' }"
                ></span>
              </div>
            </el-tooltip>
            <el-tooltip content="加粗" placement="bottom">
              <div
                class="styleBtn"
                :class="{ actived: style.fontWeight === 'bold' }"
                @click="toggleFontWeight"
              >
                B
              </div>
            </el-tooltip>
            <el-tooltip content="斜体" placement="bottom">
              <div
                class="styleBtn i"
                :class="{ actived: style.fontStyle === 'italic' }"
                @click="toggleFontStyle"
              >
                I
              </div>
            </el-tooltip>
            <el-tooltip content="划线" placement="bottom">
              <div
                class="styleBtn u"
                :style="{ textDecoration: style.textDecoration || 'none' }"
                v-popover:popover2
              >
                U
              </div>
            </el-tooltip>
          </div>
          <el-popover ref="popover" placement="bottom" trigger="click" :append-to-body="false">
            <Color :color="style.color" @change="changeFontColor"></Color>
          </el-popover>
          <el-popover ref="popover2" placement="bottom" trigger="click" :append-to-body="false">
            <el-radio-group
              size="mini"
              v-model="style.textDecoration"
              @change="update('textDecoration')"
            >
              <el-radio-button label="underline">下划线</el-radio-button>
              <el-radio-button label="line-through">中划线</el-radio-button>
              <el-radio-button label="overline">上划线</el-radio-button>
            </el-radio-group>
          </el-popover>
        </div>
        <!-- 边框 -->
        <div class="title">边框</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">颜色</span>
            <span
              class="block"
              v-popover:popover3
              :style="{ width: '80px', backgroundColor: style.borderColor }"
            ></span>
            <el-popover ref="popover3" placement="bottom" trigger="click" :append-to-body="false">
              <Color
                :color="style.borderColor"
                @change="changeBorderColor"
              ></Color>
            </el-popover>
          </div>
          <div class="rowItem">
            <span class="name" v-popover:popover5>样式</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderDasharray"
              placeholder=""
              @change="update('borderDasharray')"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in borderDasharrayList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">宽度</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderWidth"
              placeholder=""
              @change="update('borderWidth')"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in borderWidthList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
          <div class="rowItem">
            <span class="name">圆角</span>
            <el-select
              size="mini"
              style="width: 80px"
              v-model="style.borderRadius"
              placeholder=""
              @change="update('borderRadius')"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in borderRadiusList"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 背景 -->
        <div class="title">背景</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">颜色</span>
            <span
              class="block"
              v-popover:popover4
              :style="{ backgroundColor: style.fillColor }"
            ></span>
            <el-popover ref="popover4" placement="bottom" trigger="click" :append-to-body="false">
              <Color :color="style.fillColor" @change="changeFillColor"></Color>
            </el-popover>
          </div>
        </div>
        <!-- 节点内边距 -->
        <div class="title noTop">节点内边距</div>
        <div class="row">
          <div class="rowItem">
            <span class="name">水平</span>
            <el-slider
              style="width: 200px"
              v-model="style.paddingX"
              @change="update('paddingX')"
            ></el-slider>
          </div>
        </div>
        <div class="row">
          <div class="rowItem">
            <span class="name">垂直</span>
            <el-slider
              style="width: 200px"
              v-model="style.paddingY"
              @change="update('paddingY')"
            ></el-slider>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import Color from './Color'
import {
  fontFamilyList,
  fontSizeList,
  borderWidthList,
  borderDasharrayList,
  borderRadiusList,
  lineHeightList
} from '@/config'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:47
 * @Desc: 节点样式设置
 */
export default {
  name: 'Style',
  components: {
    Sidebar,
    Color
  },
  data () {
    return {
      fontFamilyList,
      fontSizeList,
      borderWidthList,
      borderDasharrayList,
      borderRadiusList,
      lineHeightList,
      activeNodes: [],
      activeTab: 'normal',
      style: {
        paddingX: 0,
        paddingY: 0,
        color: '',
        fontFamily: '',
        fontSize: '',
        lineHeight: '',
        textDecoration: '',
        fontWeight: '',
        fontStyle: '',
        borderWidth: '',
        borderColor: '',
        fillColor: '',
        borderDasharray: '',
        borderRadius: ''
      }
    }
  },
  created () {
    console.log('fontSizeList结果😀😀😀===>', fontSizeList)
    this.$bus.$on('node_active', (...args) => {
      this.$refs.sidebar.show = false
      this.$nextTick(() => {
        this.activeTab = 'normal'
        this.activeNodes = args[1]
        this.$refs.sidebar.show = this.activeNodes.length > 0
        this.initNodeStyle()
      })
    })
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-05-05 11:42:32
     * @Desc: tab切换
     */
    handleTabClick () {
      console.log('tab切换结果😀😀😀===>')
      this.initNodeStyle()
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 09:48:52
     * @Desc: 初始节点样式
     */
    initNodeStyle () {
      if (this.activeNodes.length <= 0) {
        this.activeTab = 'normal'
        return
      }
      [
        'paddingX',
        'paddingY',
        'color',
        'fontFamily',
        'fontSize',
        'lineHeight',
        'textDecoration',
        'fontWeight',
        'fontStyle',
        'borderWidth',
        'borderColor',
        'fillColor',
        'borderDasharray',
        'borderRadius'
      ].forEach((item) => {
        this.style[item] = this.activeNodes[0].getStyle(
          item,
          false,
          this.activeTab === 'active'
        )
      })
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-04 22:08:16
     * @Desc: 修改样式
     */
    update (prop) {
      this.activeNodes.forEach((node) => {
        node.setStyle(prop, this.style[prop], this.activeTab === 'active')
      })
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 09:41:34
     * @Desc: 切换加粗样式
     */
    toggleFontWeight () {
      if (this.style.fontWeight === 'bold') {
        this.style.fontWeight = 'normal'
      } else {
        this.style.fontWeight = 'bold'
      }
      this.update('fontWeight')
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 09:46:39
     * @Desc: 切换字体样式
     */
    toggleFontStyle () {
      if (this.style.fontStyle === 'italic') {
        this.style.fontStyle = 'normal'
      } else {
        this.style.fontStyle = 'italic'
      }
      this.update('fontStyle')
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 10:18:59
     * @Desc: 修改字体颜色
     */
    changeFontColor (color) {
      this.style.color = color
      this.update('color')
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 10:18:59
     * @Desc: 修改边框颜色
     */
    changeBorderColor (color) {
      this.style.borderColor = color
      this.update('borderColor')
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 10:18:59
     * @Desc: 修改背景颜色
     */
    changeFillColor (color) {
      this.style.fillColor = color
      this.update('fillColor')
    }
  }
}
</script>

<style lang="scss" scoped>
.styleBox {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .tab {
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 20px;
  }
}

.sidebarContent {
  padding: 20px;
  padding-top: 10px;

  .title {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(26, 26, 26, 0.9);
    margin-bottom: 10px;
    margin-top: 20px;

    &.noTop {
      margin-top: 0;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    .btnGroup {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    .rowItem {
      display: flex;
      align-items: center;

      .name {
        font-size: 12px;
        margin-right: 10px;
      }

      .block {
        display: inline-block;
        width: 30px;
        height: 30px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        cursor: pointer;
      }
    }

    .styleBtn {
      position: relative;
      width: 50px;
      height: 30px;
      background: #fff;
      border: 1px solid #eee;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      cursor: pointer;
      border-radius: 4px;

      &.actived {
        background-color: #eee;
      }

      &.i {
        font-style: italic;
      }

      &.u {
      }

      .colorShow {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 2px;
      }
    }
  }
}
</style>
