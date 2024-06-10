<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { QuestionControllerService } from '@/openapi'

const dataList = ref([])
const searchParams = ref({
  size: 5,
  current: 1,
  total: 100,
})
const columns = [
  {
    title: '题目名称',
    dataIndex: 'title',
  },
  {
    title: '标签',
    slotName: 'tags',
  },
  {
    title: '点赞',
    dataIndex: 'thumbNum',
  },
  {
    title: '收藏量',
    dataIndex: 'favourNum',
  },
  {
    title: '通过率',
    slotName: 'acceptedRate',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
  },
  {
    slotName: 'optional',
  },
]

async function loadData() {
  const res = await QuestionControllerService.listQuestionVoUsingPost(
    searchParams.value,
  )
  dataList.value = res.data.records
  searchParams.value.total = Number(res.data.total)
  searchParams.value.current = Number(res.data.current)
  searchParams.value.size = Number(res.data.size)
}

watchEffect(() => loadData())

async function handlePageChange(pag: { pageSize: number; current: number }, filters: any, sorter: any) {
  searchParams.value = {
    ...searchParams.value,
    size: pag.pageSize,
    current: pag.current,
  }
}

</script>

<template>
  <div>
    <a-table :columns="columns" :data-source="dataList" @change="handlePageChange" :pagination="{
      current: searchParams.current,
      pageSize: searchParams.size,
      total: searchParams.total,
    }">
      <template #bodyCell="{ column, record }">
        <template v-if="column.slotName === 'tags'">
          <a-tag v-for="tag in record.tags" :key="tag" color="green">{{ tag }}</a-tag>
        </template>
        <template v-if="column.slotName === 'acceptedRate'">
          {{
            `${
              record.submitNum ? record.acceptedNum / record.submitNum : '0'
            }% (${record.acceptedNum}/${record.submitNum})`
          }}
        </template>
        <template v-if="column.slotName === 'optional'">
          <a-space>
            <a-button type="primary" @click="$router.push({name:'提交题目',query:{id:record.id}})">
              做题
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<style scoped lang="scss">

</style>
