<template>
  <el-skeleton style="width: 240px" :loading="true">
    <template #template>
      <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
      <div style="padding: 14px">
        <el-skeleton-item variant="p" style="width: 50%" />
        <div
          style="
            display: flex;
            align-items: center;
            justify-items: space-between;
          "
        >
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ref, reactive} from 'vue'
import { axios } from '@/server/axios'

interface Data {
  data: {
    name: string,
    age: number,
    url: string,
    desc: string
  }
}

const { data } = await axios.get<Data>('./skeletonTestData.json')
// console.log(data, 'data------');

</script>
