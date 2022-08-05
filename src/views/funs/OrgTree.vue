<template>
  <div class="org-tree">
    <vue2-org-tree
      horizontal
      :data="data"
      :label-class-name="labelClassName"
      />
  </div>
</template>

<script>
import { data } from '@/views/funs/data'

export default {
  name: 'OrgTree',
  data () {
    return {
      data: {},
      labelClassName: 'bg-color-blue'
    }
  },
  methods: {

  },
  mounted () {
    this.data = data.orgTreeData
  }
}
</script>

<style lang="scss">
.bg-color-blue {
  color: #FFFFFF;
  background-color: skyblue;
}
</style>
