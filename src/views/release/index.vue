<template>
  <div class="app-container">
    <el-form :inline="true" ref="form" :rules="rules" label-position="right" :model="form" label-width="120px">
      <el-form-item label="版本文件" style="width:100%">
        <el-upload
          class="upload-demo"
          drag
          action="http://127.0.0.1:5000/api/v1/tools/upload"
          :on-success="onSuccess"
          :on-error="onError"
          :limit=1>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将待发布拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传ZIP,APK文件，且不超过1000MB</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="版本类型" style="width:30%" prop="version_type">
          <el-select v-model="form.version_type" placeholder="请选择版本类型">
            <el-option label="安卓" value="1"></el-option>
            <el-option label="公共文件" value="2"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="版本名称" style="width:30%" prop="version_name">
          <el-input v-model="form.version_name" style="width:195px"></el-input>
      </el-form-item>
      <el-form-item label="版本号" style="width:30%" prop="version_num">
          <el-input-number v-model="form.version_num" :precision="1" :step="0.1" :max="50" style="width:195px"></el-input-number>
      </el-form-item>
      <el-form-item label="文件签名" style="width:30%" prop="version_sign">
          <el-input v-model="form.version_sign" style="width:195px"></el-input>
      </el-form-item>
      <el-form-item label="请求地址" style="width:30%" prop="version_url">
          <el-input v-model="form.version_url" style="width:195px"></el-input>
      </el-form-item>
      <el-form-item label="发布环境" style="width:30%" prop="version_env">
        <el-select v-model="form.version_env" placeholder="请选择发布环境">
          <el-option label="SIT环境" value="1"></el-option>
          <el-option label="UAT环境" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布渠道" style="width:30%" prop="version_channel">
        <el-select v-model="form.version_channel" placeholder="请选择发布渠道">
          <el-option label="全渠道" value="1"></el-option>
          <el-option label="个险渠道" value="2"></el-option>
          <el-option label="银保渠道" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否强制更新" style="width:30%" prop="update_must">
        <el-select v-model="form.update_must" placeholder="请选择是否强制更新">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否全量更新" style="width:30%" prop="update_all_or_half">
        <el-select v-model="form.update_all_or_half" placeholder="请选择是否全量更新">
          <el-option label="全量更新" value="1"></el-option>
          <el-option label="增量更新" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width:100%">
        <el-button type="primary" @click="onSubmit">立即发布</el-button>
        <el-button @click="onReset">重置所有</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      form: {
        version_type: '1',
        version_name: '',
        version_num: '1.0',
        version_sign: '',
        version_url: '',
        version_env: '1',
        version_channel: '1',
        update_must: '1',
        update_all_or_half: '1',
      },
      rules: {
        version_type: [
          { required: true, message: '请选择版本类型', trigger: 'blur' }
        ],
        version_name: [
          { required: true, message: '请确认版本名称', trigger: 'blur' }
        ],
        version_num: [
          { required: true, message: '请输入版本号', trigger: 'blur' }
        ],
        version_sign: [
          { required: true, message: '请确认文件签名', trigger: 'blur' }
        ],
        version_url: [
          { required: true, message: '请确认请求地址', trigger: 'blur' }
        ],
        version_env: [
          { required: true, message: '请选择发布环境', trigger: 'blur' }
        ],
        version_channel: [
          { required: true, message: '请选择发布渠道', trigger: 'blur' }
        ],
        update_must: [
          { required: true, message: '请选择是否强制更新', trigger: 'blur' }
        ],
        update_all_or_half: [
          { required: true, message: '请选择是否全量更新', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit() {
      
      this.$refs['form'].validate((valid) => {
        if (valid) {
          alert(JSON.stringify(this.form));
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onReset() {
      this.$refs['form'].resetFields();
      this.form = {
        version_type: '1',
        version_name: '',
        version_num: '1.0',
        version_sign: '',
        version_url: '',
        version_env: '1',
        version_channel: '1',
        update_must: '1',
        update_all_or_half: '1',
      }
    },
    onSuccess(response, file, fileList) {
      console.log(response,file,fileList)
    },
    onError(err, file, fileList) {
      console.log(err,file,fileList)
    }
  }
}
</script>
