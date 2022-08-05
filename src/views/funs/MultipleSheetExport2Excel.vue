<template>
  <!-- 本页面仅为多sheet到导出参考案例 -->
  <div class="multiple-sheet-export-to-excel">
    <el-button type="primary" @click="onDownload">多sheet点击导出案例</el-button>
  </div>
</template>

<script>
import { data } from '@/views/funs/data'
import { multipleSheetExport } from '@/utils/multipleSheetExport'

const excelDatas = [
  {
    // sheet表一头部
    tHeader: ['ID', '标题', '作者', '页面浏览量', '时间'],
    // 表一的数据字段
    filterVal: ['id', 'title', 'author', 'pageviews', 'display_time'],
    // 表一的整体json数据
    tableDatas: data.LIST,
    // 表一的sheet名字
    sheetName: 'sheetName1'
  },
  {
    tHeader: ['序号', '标题', '作者', '服务'],
    filterVal: ['id', 'title', 'author', 'reviewer'],
    tableDatas: data.LIST,
    sheetName: 'sheetName2'
  },
  {
    tHeader: ['序号', '名字', '描述'],
    filterVal: ['userId', 'userName', 'userDescription'],
    tableDatas: data.ROLESlIST,
    sheetName: 'sheetName3'
  }
]

export default {
  name: 'MultipleSheetExport2Excel',
  methods: {
    onDownload () {
      multipleSheetExport(excelDatas, '数据表格', true, 'xlsx')
    }
  }
}
</script>

<style scoped lang="scss">
</style>
