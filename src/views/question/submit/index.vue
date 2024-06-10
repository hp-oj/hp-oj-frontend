<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { QuestionControllerService, type QuestionVO } from '@/openapi'
import { type FormInstance, message } from 'ant-design-vue'
import router from '@/router'
import IMdViewer from '@/components/bytemd/IMdViewer/IMdViewer.vue'
import IEditor from '@/components/IEditor/IEditor.vue'

const rid = ref()
const question = ref<any>()
const loadData = async (id: any) => {
  let res: any
  if (!id) {
    res = await QuestionControllerService.getRandQuestionVoUsingGet()
    rid.value = res.data.id
    message.info('随机一题')
  } else {
    res = await QuestionControllerService.getQuestionVoUsingGet(
      id,
    )
  }
  question.value = res.data
}
const formRef = ref<FormInstance>()
const questionForm = ref({
  code: undefined,
  language: undefined,
})

const rules = {
  language: [
    { required: true, message: '请选择编程语言', trigger: 'change' },
  ],
  code: [
    { required: true, message: '请输入代码', trigger: 'blur' },
  ],
}

async function doSubmit() {
  formRef.value?.validate().then(async () => {
    // @ts-ignore
    const res = await QuestionControllerService.submitQuestionUsingPost({
      ...questionForm.value,
      questionId: rid.value,
    })
    if (res.data) {
      message.success('提交成功')
    }
  })
}

nextTick(async () => {
  rid.value = router.currentRoute.value.query.id
  await loadData(rid.value)
})
</script>

<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs>
          <a-tab-pane key="1" tab="题目">
            <a-card v-if="question" :title="question.title">
              <i-md-viewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    color="green"
                  >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
              <a-card-meta title="判题条件">
                <template #description>
                  <a-space>
                    <a-space>
                      <Icon icon="InfoCircleOutlined" />
                      时间限制
                      <span>{{ question.judgeConfig.timeLimit ?? 0 }} ms</span>
                    </a-space>
                    <a-space>
                      <Icon icon="InfoCircleOutlined" />
                      内存限制
                      <span>{{ question.judgeConfig.memoryLimit ?? 0 }} KB</span>
                    </a-space>
                    <a-space>
                      <Icon icon="InfoCircleOutlined" />
                      堆栈限制
                      <span>{{ question.judgeConfig.stackLimit ?? 0 }} KB</span>
                    </a-space>
                  </a-space>
                </template>
              </a-card-meta>
            </a-card>
          </a-tab-pane>
          <a-tab-pane key="2" tab="评论" disabled> 评论区</a-tab-pane>
          <a-tab-pane key="3" tab="答案"> 暂时无法查看答案</a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form ref="formRef" :model="questionForm" :rules="rules">
          <a-form-item
            name="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              v-model:value="questionForm.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-select-option value="java">java</a-select-option>
              <a-select-option value="cpp">cpp</a-select-option>
              <a-select-option value="go">go</a-select-option>
              <a-select-option value="html">html</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item name="code">
            <i-editor
              v-model:code="questionForm.code"
              :language="questionForm.language"
            />
          </a-form-item>
        </a-form>
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped lang="scss">

</style>
