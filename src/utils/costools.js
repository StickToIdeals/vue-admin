import { format } from 'date-fns'
const COS = require('cos-js-sdk-v5')
const gBucket = 'spoongsb-1253997188'
const gRegion = 'ap-chengdu'
const gSecretId = 'AKID42pSt9AHBvtkQuQtgJk05zpkT4Xso8A0'
const gSecretKey = 'RqW3Sgw6gASaWHwTr45kNo4C9vhOwISP'

const costools = {
  // 获取基本配置
  getConfig() {
    console.log('config cos ... ')
    return {
      bucket: gBucket,
      region: gRegion
    }
  },
  auth() {
    console.log('auth cos ... ')
    return new COS({
      SecretId: gSecretId,
      SecretKey: gSecretKey
    })
  },
  /*
        COS上传对象
        //基础配置
        let config = {
            bucket:'spoongsb-1253997188',
            region:'ap-chengdu'
        }
        //资源前缀
        let prefix = 'lecturer-files'
        //待上传对象
        let file = new file()
        //上传进度
        let progress = {"loaded":0,"total":49032,"speed":null,"percent":0}
        let progress = {"loaded":49032,"total":49032,"speed":75666.67,"percent":1}
        //回传结果
        callback
        data:
        {
            Location: "spoongsb-1253997188.cos.ap-chengdu.myqcloud.com/lecturer-files/2019-09-24/1569302205144_icon.png",
            statusCode: 200,
            headers:
            {
                content-length: "0"
            }
        }
        err:
        {error: "missing param Bucket"}
    */
  putObject(config, prefix, file, progress, callback) {
    const cos = costools.auth()
    const path = prefix + '/' + format(new Date(), 'yyyy-MM-dd') + '/' + new Date().getTime() + '_' + file.name
    console.log('上传路径 :', path)
    cos.putObject({
      Bucket: config.bucket,
      Region: config.region,
      Key: path,
      Body: file,
      onProgress: (progressData) => {
        progress(JSON.stringify(progressData))
      }
    }, (err, data) => {
      callback(data, err)
    })
  },
  /*
       COS实现文件的分块上传，适用于大文件上传
       //基础配置
       let config = {
           bucket:'spoongsb-1253997188',
           region:'ap-chengdu'
       }
       //资源前缀
       let prefix = 'lecturer-files'
       //待上传对象
       let file = new file()
       //上传进度
       let progress = {"loaded":0,"total":49032,"speed":null,"percent":0}
       let progress = {"loaded":49032,"total":49032,"speed":75666.67,"percent":1}
       //回传结果
       callback
       data:
       {
           Location: "spoongsb-1253997188.cos.ap-chengdu.myqcloud.com/lecturer-files/2019-09-24/1569302205144_icon.png",
           statusCode: 200,
           headers:
           {
               content-length: "0"
           }
       }
       err:
       {error: "missing param Bucket"}
   */
  sliceUploadFile(config, prefix, file, progress, callback) {
    const cos = costools.auth()
    const path = prefix + '/' + format(new Date(), 'yyyy-MM-dd') + '/' + new Date().getTime() + '_' + file.name
    console.log('上传路径 :', path)
    cos.sliceUploadFile({
      Bucket: config.bucket,
      Region: config.region,
      Key: path,
      Body: file,
      onTaskReady: (taskId) => {
        // 可回传任务号非必须
        console.log(taskId)
      },
      onHashProgress: (progressData) => {
        console.log(JSON.stringify(progressData))
      },
      onProgress: (progressData) => {
        // 回传进度
        progress(progressData)
      }
    }, (err, data) => {
      // 回传结果
      callback(data, err)
    })
  }
}
export default costools
