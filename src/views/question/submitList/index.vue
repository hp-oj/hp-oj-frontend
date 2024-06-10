<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { QuestionControllerService } from '@/openapi'
import IEditor from '@/components/IEditor/IEditor.vue'

const modalState = ref({
  open: false,
  loading: true,
  data: { code: '', language: '' },
  onClose: () => {
    modalState.value.data = { code: '', language: '' }
    modalState.value.open = false
    modalState.value.loading = true
  },
})
const dataList = ref([])
const searchParams = ref({
  size: 5,
  current: 1,
  total: 100,
})
const columns = [
  {
    title: '题号',
    dataIndex: 'questionId',
  },
  {
    title: '用户',
    dataIndex: 'userId',
  },
  {
    title: '判题状态',
    slotName: 'status',
  },
  {
    title: '判题信息',
    slotName: 'judgeInfo',
  },
  {
    title: '使用语言',
    dataIndex: 'language',
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
  },
  {
    slotName: 'optional',
  },
]

async function loadData() {
  const res = await QuestionControllerService.listQuestionSubmitVoUsingPost(
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

async function showSubmitCode(id: any) {
  const res = (await QuestionControllerService.getSubmitAnswerUsingGet(id)).data
  if (res) {
    modalState.value.data = {
      code: res.code,
      language: res.language,
    }
    modalState.value.open = true
    modalState.value.loading = false
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
        <template v-if="column.slotName === 'status'">
          <a-tag v-if="record.status === 0" color="default">
            <template #icon>
              <Icon icon="minus-circle-outlined" />
            </template>
            待判题
          </a-tag>
          <a-tag v-else-if="record.status === 1" color="processing">
            <template #icon>
              <Icon icon="sync-outlined" :spin="true" />
            </template>
            判题中
          </a-tag>
          <a-tag v-else-if="record.status === 2" color="success">
            <template #icon>
              <Icon icon="check-circle-outlined" />
            </template>
            成功
          </a-tag>
          <a-tag v-else-if="record.status === 3" color="error">
            <template #icon>
              <Icon icon="close-circle-outlined" />
            </template>
            失败
          </a-tag>
        </template>
        <template v-if="column.slotName === 'judgeInfo'">
          <a-space>
            <a-space>
              <Icon icon="InfoCircleOutlined" />
              执行结果
              <span>{{ record.judgeInfo.message }}</span>
            </a-space>
            <a-space>
              <Icon icon="InfoCircleOutlined" />
              消耗时间
              <span>{{ record.judgeInfo.time ?? 0 }} ms</span>
            </a-space>
            <a-space>
              <Icon icon="InfoCircleOutlined" />
              消耗内存
              <span>{{ record.judgeInfo.memory ?? 0 }} KB</span>
            </a-space>
          </a-space>
        </template>
        <template v-if="column.slotName === 'optional'">
          <a-space>
            <a-button type="primary" @click="showSubmitCode(record.id)">
              查看代码
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <a-modal
      v-model:open="modalState.open"
      title="题目代码"
      :footer="null"
      style="border-radius: var(--border-radius); overflow: hidden"
      :bodyStyle="{ padding: 0, overflow: 'auto' }"
      @cancel="modalState.onClose"
      destroyOnClose
      centered
    >
      <i-editor :code="modalState.data.code" :language="modalState.data.language" :options="{readOnly: true}" />
    </a-modal>
  </div>
</template>

<style scoped lang="scss">

</style>
