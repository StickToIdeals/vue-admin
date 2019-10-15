<template>
  <div class="app-container">
    <!--版本查询框-->
    <el-form :inline="true"
             :model="queryFormData"
             class="demo-form-inline">
      <el-form-item label="版本类型">
        <el-select v-model="queryFormData.version_type"
                   placeholder="请选择版本类型">
          <el-option label="安卓"
                     value="1"></el-option>
          <el-option label="公共文件"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="版本号">
        <el-input-number v-model="queryFormData.version_num"
                         :precision="1"
                         :step="0.1"
                         :max="50"></el-input-number>
      </el-form-item>
      <el-form-item label="发布环境">
        <el-select v-model="queryFormData.env"
                   placeholder="请选择发布环境">
          <el-option label="SIT环境"
                     value="1"></el-option>
          <el-option label="UAT环境"
                     value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布渠道">
        <el-select v-model="queryFormData.channel"
                   placeholder="请选择发布渠道">
          <el-option label="全渠道"
                     value="1"></el-option>
          <el-option label="个险渠道"
                     value="2"></el-option>
          <el-option label="银保渠道"
                     value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="onQuery()">查询</el-button>
      </el-form-item>
    </el-form>
    <!--显示查询到的版本数据-->
    <el-table :data="list"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="create_date"
                       label="发布日期"
                       width="180">
      </el-table-column>
      <el-table-column prop="env.name"
                       label="环境"
                       width="60">
      </el-table-column>
      <el-table-column prop="channel.name"
                       label="渠道"
                       width="100">
      </el-table-column>
      <el-table-column prop="version_type.name"
                       label="版本类型"
                       width="120">
      </el-table-column>
      <el-table-column prop="version_name"
                       label="版本名称"
                       width="120">
      </el-table-column>
      <el-table-column prop="version_num"
                       label="版本号"
                       width="120">
      </el-table-column>
      <el-table-column prop="version_desc"
                       label="版本描述">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button type="text"
                     size="small"
                     @click="handleViewClick(scope.row)">查看</el-button>
          <el-button type="text"
                     size="small"
                     @click="handleDownClick(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--二维码显示组件-->
    <el-dialog title="请扫描二维码下载"
               center
               :visible.sync="dialogShowQRCode"
               width="260px"
               @opened="showQRCode()">
      <QRCodeBox :info="infoQRCodeInfo"></QRCodeBox>
    </el-dialog>
  </div>
</template>

<script>
import { getVersionList } from '@/api/version'
import QRCode from 'qrcodejs2'
import QRCodeBox from '@/components/QRCodeBox/index'

export default {
  components: { QRCodeBox },
  data () {
    return {
      list: [],
      queryFormData: {
        version_type: '1',
        version_num: '1.0',
        env: '1',
        channel: '1'
      },
      dialogShowQRCode: false,
      currentSelect: {},
      infoQRCodeInfo: {
        name: "默认",
        id: "默认"
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.list = []
      this.listLoading = true
      getVersionList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    onQuery () {
      console.log(this.queryFormData)
      this.fetchData()
    },
    handleViewClick (row) {
      this.currentSelect = row
      this.infoQRCodeInfo.item = {
        name: "http://n22.online/",
        id: "http://n22.online/"
      }
      this.dialogShowQRCode = true
    },
    handleDownClick (row) {
      window.open(row.down_url)
    },
    showQRCode () {
      
      //   document.getElementById('qrcode').innerHTML = ''
      //   this.qrcode = new QRCode('qrcode', {
      //     width: 210,
      //     height: 210,
      //     text: this.currentSelect.down_url
      //   })
    }
  }
}
</script>
