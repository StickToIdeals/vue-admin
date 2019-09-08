<template>
  <div class="app-container">
    
  </div>
</template>

<script>

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
      
    }
  },
  created() {
  },
  methods: {
    
  }
}
</script>
