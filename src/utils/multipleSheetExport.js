
/**
 * multipleSheetExport
 * tableJson 导出数据
 * filenames 导出表的名字
 * autowidth 表格宽度自动
 * bookTypes Xlsx & csv & txt
 * @param {(Object)} tableJson
 * @param {string} filenames
 * @param {boolean} autowidth
 * @param {string} bookTypes
 */
export function multipleSheetExport (tableJson, filenames, autowidth, bookTypes) {
  import('@/vendor/Export2MultipleSheetExcel').then(excel => {
    var tHeader = []
    var dataArr = []
    var sheetnames = []
    for (var i in tableJson) {
      tHeader.push(tableJson[i].tHeader)
      dataArr.push(formatJson(tableJson[i].filterVal, tableJson[i].tableDatas))
      sheetnames.push(tableJson[i].sheetName)
    }
    excel.export_json_to_excel({
      header: tHeader,
      data: dataArr,
      sheetname: sheetnames,
      filename: filenames,
      autoWidth: autowidth,
      bookType: bookTypes
    })
  })
}

function formatJson (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
