<!-- eslint-disable eqeqeq -->
<template>
  <div class="hello">
    <div style="position: absolute;top:0;">

        <input style="font-size:16px;" type="file" @change="uploadExcel" />

        <span>Or Load remote xlsx file: </span>

        <select v-model="selected" @change="selectExcel">
          <option disabled value="">Choose</option>
          <option v-for="option in options" :key="option.text" :value="option.value">
            {{ option.text }}
          </option>
        </select>

        <a href="javascript:void(0)" @click="downloadExcel">Download source xlsx file</a>
    </div>

    <div
      id="luckysheet"
      style="margin:0px;padding:0px;position:absolute;width:100%;left: 0px;top: 30px;bottom:0px;"
    ></div>

    <div v-show="isMaskShow" style="position: absolute;z-index: 1000000;left: 0px;top: 0px;bottom: 0px;right: 0px; background: rgba(255, 255, 255, 0.8); text-align: center;font-size: 40px;align-items:center;justify-content: center;display:flex;">Downloading</div>

  </div>
</template>

<script>
import LuckyExcel from 'luckyexcel'
import { exportExcel } from './export'
// const luckysheet = null
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      selected: '',
      options: [
        { text: 'Money Manager.xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/money-manager-2.xlsx' },
        { text: 'Activity costs tracker.xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/Activity%20costs%20tracker.xlsx' },
        { text: 'House cleaning checklist.xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/House%20cleaning%20checklist.xlsx' },
        { text: 'Student assignment planner.xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/Student%20assignment%20planner.xlsx' },
        { text: 'Credit card tracker.xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/Credit%20card%20tracker.xlsx' },
        { text: 'Blue timesheet.xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/Blue%20timesheet.xlsx' },
        { text: 'Student calendar (Mon).xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/Student%20calendar%20%28Mon%29.xlsx' },
        { text: 'Blue mileage and expense report.xlsx', value: 'https://minio.cnbabylon.com/public/luckysheet/Blue%20mileage%20and%20expense%20report.xlsx' }
      ],
      isMaskShow: false
    }
  },
  mounted () {
    // In some cases, you need to use $nextTick
    this.$nextTick(() => {
      const flag = localStorage.getItem('sheet')
      console.log('flag结果😀😀😀===>', flag)
      if (flag) {
        // eslint-disable-next-line no-undef
        luckysheet.create(JSON.parse(flag))
      } else {
        this.init()
      }
    })
  },
  created () {

  },
  methods: {
    init () {
      // eslint-disable-next-line no-undef
      luckysheet.create({
        container: 'luckysheet', // 设定DOM容器的id
        title: 'Luckysheet Demo', // 设定表格名称
        lang: 'zh', // 设定表格语言
        plugins: ['chart'],
        data: [
          {
            name: 'Cell', // 工作表名称
            color: '', // 工作表颜色
            index: 0, // 工作表索引
            status: 1, // 激活状态
            order: 0, // 工作表的下标
            hide: 0, // 是否隐藏
            row: 36, // 行数
            column: 18, // 列数
            defaultRowHeight: 19, // 自定义行高
            defaultColWidth: 73, // 自定义列宽
            celldata: [], // 初始化使用的单元格数据
            config: {
              merge: {}, // 合并单元格
              rowlen: {}, // 表格行高
              columnlen: {}, // 表格列宽
              rowhidden: {}, // 隐藏行
              colhidden: {}, // 隐藏列
              borderInfo: {}, // 边框
              authority: {} // 工作表保护

            },
            scrollLeft: 0, // 左右滚动条位置
            scrollTop: 315, // 上下滚动条位置
            luckysheet_select_save: [], // 选中的区域
            calcChain: [], // 公式链
            isPivotTable: false, // 是否数据透视表
            pivotTable: {}, // 数据透视表设置
            filter_select: {}, // 筛选范围
            filter: null, // 筛选配置
            luckysheet_alternateformat_save: [], // 交替颜色
            luckysheet_alternateformat_save_modelCustom: [], // 自定义交替颜色
            luckysheet_conditionformat_save: {}, // 条件格式
            frozen: {}, // 冻结行列配置
            chart: [], // 图表配置
            zoomRatio: 1, // 缩放比例
            image: [], // 图片
            showGridLines: 1, // 是否显示网格线
            dataVerification: {} // 数据验证配置
          },
          {
            name: 'Sheet2',
            color: '',
            index: 1,
            status: 0,
            order: 1,
            celldata: [],
            config: {}
          },
          {
            name: 'Sheet3',
            color: '',
            index: 2,
            status: 0,
            order: 2,
            celldata: [],
            config: {}
          }
        ]
      })
    },
    uploadExcel (evt) {
      const files = evt.target.files
      if (files === null || files.length === 0) {
        alert('No files wait for import')
        return
      }

      const name = files[0].name
      const suffixArr = name.split('.'); const suffix = suffixArr[suffixArr.length - 1]
      if (suffix !== 'xlsx') {
        alert('Currently only supports the import of xlsx files')
        return
      }
      LuckyExcel.transformExcelToLucky(files[0], function (exportJson, luckysheetfile) {
        if (exportJson.sheets === null || exportJson.sheets.length === 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!')
          return
        }
        window.luckysheet.destroy()

        window.luckysheet.create({
          container: 'luckysheet', // luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator
        })
      })
    },
    selectExcel (evt) {
      const value = this.selected
      const name = evt.target.options[evt.target.selectedIndex].innerText

      if (value === '') {
        return
      }
      this.isMaskShow = true

      LuckyExcel.transformExcelToLuckyByUrl(value, name, (exportJson, luckysheetfile) => {
        if (exportJson.sheets === null || exportJson.sheets.length === 0) {
          alert('Failed to read the content of the excel file, currently does not support xls files!')
          return
        }

        this.isMaskShow = false
        window.luckysheet.destroy()

        window.luckysheet.create({
          container: 'luckysheet', // luckysheet is the container id
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator
        })
      })
    },
    downloadExcel () {
    //   const res = luckysheet.getAllSheets()
    //   console.log('getAllSheets结果😀😀😀===>', res)
      //   const res2 = luckysheet.getAllSheets()
      //   console.log('getAllSheets toJson结果😀😀😀===>', res.toJson())
      // eslint-disable-next-line no-undef
      console.log('luckysheet.toJson()结果😀😀😀===>', luckysheet.toJson())
      // eslint-disable-next-line no-undef
      localStorage.setItem('sheet', JSON.stringify(luckysheet.toJson()))
      // eslint-disable-next-line no-undef
      exportExcel(luckysheet.getluckysheetfile(), luckysheet.toJson().title)
      //   const value = this.selected
      //   if (value.length === 0) {
      //     alert('Please select a demo file')
      //     return
      //   }

    //   var elemIF = document.getElementById('Lucky-download-frame')
    //   if (elemIF === null) {
    //     elemIF = document.createElement('iframe')
    //     elemIF.style.display = 'none'
    //     elemIF.id = 'Lucky-download-frame'
    //     document.body.appendChild(elemIF)
    //   }
    //   elemIF.src = value
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
