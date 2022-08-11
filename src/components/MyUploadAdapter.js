// eslint-disable-next-line no-unused-vars
import axios from 'axios'

/**
 * 自定义上传图片插件
 */
class MyUploadAdapter {
  constructor (loader) {
    this.loader = loader
  }

  async upload () {
    const data = new FormData()
    data.append('file', await this.loader.file)
    console.log('data结果😀😀😀===>', data)
    // eslint-disable-next-line no-unused-vars
    const res = { data: {} }
    // await axios({
    //   url: process.env.VUE_APP_BASE_URL + '/upload',
    //   method: 'POST',
    //   data,
    //   dataType: 'json',
    //   processData: false,
    //   contentType: false,
    //   withCredentials: true // true 为不允许带 token, false 为允许
    // }).then(resu => {
    //   console.log('res结果😀😀😀===>', resu)
    // })

    // console.log(res.data)
    console.log('data==>', await this.loader.file)
    // 后台返回数据：
    // {"code":0,"msg":"success","data":{"url":"/upload/struts2.jpeg"}}

    // 方法返回数据格式： {default: "url"}
    return {
      // default: process.env.VUE_APP_TARGET_URL + res.data.data.url
      default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      // default: await this.loader.file
    }
  }
}

export default MyUploadAdapter
