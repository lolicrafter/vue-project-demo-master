<template>
  <div class="dom-to-excel">
    <el-button type="primary" @click="exData">导出</el-button>
    <!-- 这个table的id导出时需要用到 -->
    <el-table
      :data="tableDataLegacy"
      id="legacy"
      border
      height="800"
      class="tableListGrid"
      :span-method="objectSpanMethod"
      :row-style="TableRowStyleLegacy">
      <el-table-column
        v-for="(col, index) in fieldListLegacy"
        :key="index"
        :prop="col.field"
        :label="col.label"
        :width="col.width"
        align="center"
        show-overflow-tooltip>
        <el-table-column
          v-for="(childCol, childindex) in col.child"
          :key="childindex"
          :prop="childCol.field"
          :label="childCol.label"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'
import { data } from '@/views/funs/data'

export default {
  name: 'Dom2Excel',
  data () {
    return {
      mergeListLegacy: [],
      fieldListLegacy: [],
      tableDataLegacy: []
    }
  },
  methods: {
    // 处理合并数据
    parseTable (dataList) {
      if (this.mergeListLegacy.length === 0) {
        return dataList
      }
      for (let i = dataList.length - 1; i > 0; i--) {
        this.mergeListLegacy.forEach(v => {
          if (!dataList[i][v + 'rowspan']) {
            dataList[i][v + 'rowspan'] = 1
          }
          if (dataList[i][v] === dataList[i - 1][v]) {
            dataList[i - 1][v + 'rowspan'] = dataList[i][v + 'rowspan'] + 1
            dataList[i][v + 'rowspan'] = 0
          }
        })
      }
      return dataList
    },
    objectSpanMethod ({ row, column }) {
      const fieldname = column.property
      if (this.mergeListLegacy.indexOf(fieldname) !== -1) {
        if (typeof row[fieldname + 'rowspan'] === 'undefined') {
          return { rowspan: 1, colspan: 1 }
        }
        if (row[fieldname + 'rowspan'] > 1) {
          console.log(111)
          return { rowspan: row[fieldname + 'rowspan'], colspan: 1 }
        } else if (row[fieldname + 'rowspan'] === 0) {
          return { rowspan: 0, colspan: 0 }
        }
      }
    },
    TableRowStyleLegacy ({ row }) {
      const stylejson = {}
      if (row.changeColor === 1) {
        stylejson.backgroundColor = 'rgb(233,250,255)'
        stylejson.bordeBottom = '1px #eee solid'
        stylejson.color = '#606266'
      }
      return stylejson
    },
    exData () {
      var wb = XLSX.utils.table_to_book(document.querySelector('#legacy'), { raw: true })
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '统计报表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    },
    init () {
      this.mergeListLegacy = data.tableData.mergeList
      this.fieldListLegacy = data.tableData.fieldList
      this.tableDataLegacy = this.parseTable(data.tableData.list)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang="scss">
</style>
