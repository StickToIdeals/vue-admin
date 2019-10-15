<template>
  <div class="QRCodeBox">
    <div id="QRCodeBoxId"
         style="width:220px;text-align: center;padding: 10px;background: aliceblue;">
      <div style="font-weight: bold;margin: 5px;">{{QRCodeInfo.name}}</div>
      <qrcode :wid=200
              :hei=200
              :imgwid=50
              :imghei=50
              :url=QRCodeInfo.id
              :colorLight="colorLight"
              :colorDark="colorDark"
              :iconurl=logoSrc></qrcode>
    </div>
    <el-tag size="medium"
            style="margin-top: 5px;"
            @click="createPoster('QRCodeBoxId')">下载二维码</el-tag>
  </div>
</template>

<script>
import qrcode from 'vue_qrcodes'
import domtoimage from 'dom-to-image'

export default {
  name: "QRCodeBox",
  components: { qrcode },
  props: [
    'info'
  ],
  watch: {
    info: {
      handler (val) {
        this.init(val)
      },
      deep: true
    }
  },
  data () {
    return {
      logoSrc: require('@/assets/logo.png'),
      colorDark: "#EE9A00",
      colorLight: "#FFFFFF",
      QRCodeInfo: {
        name: '',
        id: ''
      }
    }
  },
  mounted () {
    this.init(this.info)
  },
  methods: {
    init (val) {
      console.log('初始化数据', val)
      this.QRCodeInfo = val.item
      console.log(this.QRCodeInfo)
      let colors = ['#FF8247', '#FF00FF', '#FFA500', '#90EE90', '#912CEE', '#DDA0DD', '#006400', '#53868B']
      this.colorDark = colors[Math.floor(Math.random() * colors.length + 1) - 1];
    },
    createPoster (domId) {
      domtoimage.toPng(document.getElementById(domId))
        .then((dataUrl) => {
          let link = document.createElement('a');
          link.download = this.QRCodeBoxId.name + '_二维码.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('oops, something went wrong!', error);
        });
    },
  }
}
</script>
<style lang="scss">
.QRCodeBox {
  text-align: center;
}
.QRCodeBox .qrcodeDialog .el-dialog {
  min-width: 260px !important;
}
.QRCodeBox .qrcodeDialog .el-dialog--center .el-dialog__body {
  text-align: center;
  padding: 25px 25px 30px;
}
</style>