<script setup lang="ts">
import { useContentDiff } from '~/composables/useContentDiff'

const htmlContent1 = ref<string>('')
const htmlContent2 = ref<string>('')

const outputHtml = ref<string>('')

const { getContentDiff } = useContentDiff()

watch([htmlContent1, htmlContent2], () => {
  outputHtml.value = getContentDiff(htmlContent1.value, htmlContent2.value)
})
console.log("hello")
</script>

<template>
  <div class="max-w-2xl mx-auto my-8">
    <h1 class="font-bold mb-4">Input HTML and find differences</h1>

    <div class="flex flex-col gap-4 mb-4 pb-4 border-b border-gray-200">
      <div>
        <label for="html1">Content 1:</label>
        <textarea
          id="html1"
          class="w-full h-32 p-2 border border-gray-300 rounded"
          v-model="htmlContent1"
        ></textarea>
      </div>
      <div>
        <label for="html2">Content 2:</label>
        <textarea
            id="html2"
            class="w-full h-32 p-2 border border-gray-300 rounded"
            v-model="htmlContent2"
        ></textarea>
      </div>
    </div>
    <div class="prose">
      <h2 class="font-bold">Output:</h2>
      <div v-html="outputHtml"></div>
    </div>
  </div>
</template>

<style>
del > *, ins > * {
    background-color: inherit;
}
</style>
