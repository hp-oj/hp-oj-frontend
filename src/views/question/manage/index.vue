<script setup lang="ts">
// @ts-nocheck
import { ref, watchEffect } from 'vue'
import IMdEditor from '@/components/bytemd/IMdEditor/IMdEditor.vue'
import Icon from '@/components/Icon/Icon.vue'
import { type FormInstance, message } from 'ant-design-vue'
import { QuestionControllerService } from '@/openapi'

const activeKey = ref('1')
const editDisable = ref(true)
const formRef = ref<FormInstance>()
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
}
const formState = ref({
  title: '',
  content: '',
  tags: [],
  answer: '',
  judgeCase: [
    {
      input: '',
      output: '',
    },
  ],
  judgeConfig: {
    timeLimit: null,
    memoryLimit: null,
    stackLimit: null,
  },
})
const rules = ref({
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
  ],
  tags: [
    { required: true, message: '请选择标签', type: 'array', trigger: 'change' },
  ],
  answer: [
    { required: true, message: '请输入答案', trigger: 'blur' },
  ],
  judgeCase: [
    { required: true, message: '请输入判题用例', type: 'array', trigger: 'change' },
    {
      validator: (rule, value) => {
        if (value.every(item => item.input && item.output)) {
          return Promise.resolve()
        }
        return Promise.reject('每个判题用例都需要输入和输出')
      }, trigger: 'change',
    },
  ],
  judgeConfig: [
    { required: true, message: '请输入判题配置', type: 'object', trigger: 'change' },
    {
      validator: (rule, value) => {
        if (value.timeLimit !== null && value.memoryLimit !== null && value.stackLimit !== null) {
          return Promise.resolve()
        }
        return Promise.reject('时间限制、内存限制和堆栈限制都需要输入')
      }, trigger: 'change',
    },
  ],
})
const submitForm = () => {
  formRef.value.validate()
    .then(async () => {
      const res = (await QuestionControllerService.updateQuestionUsingPost(formState.value)).data
      if (res) {
        message.success('更新成功')
        await loadData()
      } else {
        message.error('更新失败')
      }
    })
}
const removeJudgeCase = (item: any) => {
  const index = formState.value.judgeCase.indexOf(item)
  if (index !== -1) {
    formState.value.judgeCase.splice(index, 1)
  }
}
const addJudgeCase = () => {
  formState.value.judgeCase.push({
    value: '',
  })
}

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

async function editQuestion(id: any) {
  const res = await QuestionControllerService.getQuestionUsingGet(id)
  formState.value = res.data
  activeKey.value = '2'
  editDisable.value = false
}

async function deleteQuestion(id: any) {
  const res = (await QuestionControllerService.deleteQuestionUsingPost(id)).data
  if (res) {
    message.success('删除成功')
    await loadData()
  } else {
    message.error('删除失败')
  }
}
</script>

<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="题目管理">
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
              <a-button type="primary" @click="editQuestion(record.id)">
                修改
              </a-button>
              <a-button type="primary" danger @click="deleteQuestion(record.id)">
                删除
              </a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="修改题目" :disabled="editDisable">
      <div>
        <h2>修改题目</h2>
        <a-form ref="formRef" :model="formState" :rules="rules" v-bind="formItemLayout" label-align="left">
          <a-form-item name="title" label="标题">
            <a-input v-model:value="formState.title" placeholder="请输入标题" />
          </a-form-item>
          <a-form-item name="tags" label="标签">
            <a-select mode="tags" v-model:value="formState.tags" placeholder="请选择标签" />
          </a-form-item>
          <a-form-item name="content" label="题目内容">
            <i-md-editor v-model:value="formState.content" />
          </a-form-item>
          <a-form-item name="answer" label="答案">
            <i-md-editor v-model:value="formState.answer" />
          </a-form-item>
          <a-form-item name="judgeConfig" label="判题配置">
            <a-form-item name="judgeConfig.timeLimit" label="时间限制">
              <a-input-number
                v-model:value="formState.judgeConfig.timeLimit"
                placeholder="请输入时间限制"
                min="0"
                style="width: 100%;"
              />
            </a-form-item>
            <a-form-item name="judgeConfig.memoryLimit" label="内存限制">
              <a-input-number
                v-model:value="formState.judgeConfig.memoryLimit"
                placeholder="请输入内存限制"
                min="0"
                style="width: 100%;"
              />
            </a-form-item>
            <a-form-item name="judgeConfig.stackLimit" label="堆栈限制">
              <a-input-number
                v-model:value="formState.judgeConfig.stackLimit"
                placeholder="请输入堆栈限制"
                min="0"
                style="width: 100%;"
              />
            </a-form-item>
          </a-form-item>
          <a-form-item name="judgeCase" label="测试用例配置">
            <a-form-item
              v-for="(judgeCase, index) in formState.judgeCase"
              :key="judgeCase"
              :label="`测试用例-${index+1}`"
              :name="['judgeCase', index, 'value']"
            >
              <div style="display: flex">
                <a-input
                  v-model:value="judgeCase.input"
                  placeholder="请输入测试输入用例"
                  style="width: 40%; margin-right: 8px"
                />
                <a-input
                  v-model:value="judgeCase.output"
                  placeholder="请输入测试输出用例"
                  style="width: 40%; margin-right: 8px"
                />
                <Icon icon="MinusCircleOutlined"
                      v-if="formState.judgeCase.length > 1"
                      class="dynamic-delete-button"
                      @click="removeJudgeCase(judgeCase)"
                />
              </div>
            </a-form-item>
          </a-form-item>
          <a-form-item v-bind="{  wrapperCol: { xs: { span: 24, offset: 0 },sm: { span: 20, offset: 4 },}}">
            <a-button type="dashed" style="width: 60%" @click="addJudgeCase">
              <Icon icon="PlusOutlined" />
              添加用例
            </a-button>
          </a-form-item>
          <a-form-item v-bind="{  wrapperCol: { xs: { span: 24, offset: 0 },sm: { span: 20, offset: 4 },}}">
            <a-button type="primary" html-type="submit" @click="submitForm">修改</a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<style scoped lang="scss">

</style>
