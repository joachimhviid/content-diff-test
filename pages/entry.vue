<script setup lang="ts">
import { useContentDiff } from '#imports'

const testEntryJson = ref(JSON.stringify({
  'page': {
    'meta': {
      'title': 'Hoho dolor sit amet, consectetur adipiscing elit. ',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in facilisis, sed fringilla dolor. Aliquam egestas dapibus mauris, quis varius. Hello :)',
      'noFollow': false,
      'noIndex': false
    }, 'pageType': 'About', 'path': '/blog'
  },
  'article': '<p>Sneakily readding a paragraph</p><big-icon-block content="JTdCJTIydGV4dCUyMiUzQSU3QiUyMnR5cGUlMjIlM0ElMjJyaWNoVGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTNDcCUzRWljb24lM0MlMkZwJTNFJTIyJTdEJTdE" variant="0" filter="dW5kZWZpbmVk"></big-icon-block><quote-block content="JTdCJTIydGV4dCUyMiUzQSU3QiUyMnR5cGUlMjIlM0ElMjJyaWNoVGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTNDcCUzRXRlc3QlM0MlMkZwJTNFJTIyJTdEJTJDJTIyYXV0aG9yJTIyJTNBJTdCJTIydHlwZSUyMiUzQSUyMnRleHQlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMkRlZmF1bHQlMjBUZXh0JTIyJTdEJTJDJTIyZGVzY3JpcHRpb24lMjIlM0ElN0IlMjJ0eXBlJTIyJTNBJTIydGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyRGVmYXVsdCUyMFRleHQlMjIlN0QlN0Q=" variant="1" filter="dW5kZWZpbmVk"></quote-block><basic-block content="JTdCJTIydGV4dCUyMiUzQSU3QiUyMnR5cGUlMjIlM0ElMjJyaWNoVGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTNDcCUzRWhlbGxvJTIwJTNDJTJGcCUzRSUyMiU3RCU3RA==" variant="1" filter="dW5kZWZpbmVk"></basic-block><p>I added a bit for the article as well, changed again?</p>',
  'textList': ['asdas']
}))

const testCompareEntryJson = ref(JSON.stringify({
  'page': {
    'meta': {
      'title': 'I changed the title',
      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in facilisis, sed fringilla dolor. Aliquam egestas dapibus mauris, quis varius.',
      'noFollow': false,
      'noIndex': true
    }, 'pageType': 'About', 'path': '/blog-page'
  },
  'article': '<p>Sneakily readding a paragraph</p><h3>Subtitle</h3><big-icon-block content="JTdCJTIydGV4dCUyMiUzQSU3QiUyMnR5cGUlMjIlM0ElMjJyaWNoVGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTNDcCUzRWljb24lM0MlMkZwJTNFJTIyJTdEJTdE" variant="0" filter="dW5kZWZpbmVk"></big-icon-block><quote-block content="JTdCJTIydGV4dCUyMiUzQSU3QiUyMnR5cGUlMjIlM0ElMjJyaWNoVGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTNDcCUzRXRlc3QlM0MlMkZwJTNFJTIyJTdEJTJDJTIyYXV0aG9yJTIyJTNBJTdCJTIydHlwZSUyMiUzQSUyMnRleHQlMjIlMkMlMjJ2YWx1ZSUyMiUzQSUyMkRlZmF1bHQlMjBUZXh0JTIyJTdEJTJDJTIyZGVzY3JpcHRpb24lMjIlM0ElN0IlMjJ0eXBlJTIyJTNBJTIydGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyRGVmYXVsdCUyMFRleHQlMjIlN0QlN0Q=" variant="1" filter="dW5kZWZpbmVk"></quote-block><basic-block content="JTdCJTIydGV4dCUyMiUzQSU3QiUyMnR5cGUlMjIlM0ElMjJyaWNoVGV4dCUyMiUyQyUyMnZhbHVlJTIyJTNBJTIyJTNDcCUzRWhlbGxvJTIwJTNDJTJGcCUzRSUyMiU3RCU3RA==" variant="1" filter="dW5kZWZpbmVk"></basic-block><p>I added a bit for the article as well, changed again?</p>',
  'textList': ['asdas', 'extra text']
}))

const { getModelDiff } = useContentDiff()

const resultEntryJson = ref(getModelDiff(JSON.parse(testEntryJson.value), JSON.parse(testCompareEntryJson.value)))
watch([testEntryJson, testCompareEntryJson], () => {
  resultEntryJson.value = getModelDiff(JSON.parse(testEntryJson.value), JSON.parse(testCompareEntryJson.value))
  console.log(resultEntryJson.value)
})

const test = ref({
  hello: undefined
})
</script>

<template>
  <div class="prose mx-auto my-8 overflow-x-hidden">
    <h1>Compare model structure</h1>
    <div class="flex flex-col gap-4">
      <div class="w-full">
        <h3>Original</h3>
        <textarea v-model="testEntryJson" class="w-full h-80 border border-gray-200 rounded"></textarea>
      </div>
      <div class="w-full">
        <h3>New</h3>
        <textarea v-model="testCompareEntryJson" class="w-full h-80 border border-gray-200 rounded"></textarea>
      </div>
    </div>
    <div>
      <h3>Added</h3>
      <div v-text="resultEntryJson.added"></div>
    </div>
    <div>
      <h3>Deleted</h3>
      <div v-for="(deleted, i) in Object.keys(resultEntryJson.deleted)" :key="i">{{ deleted }}</div>
    </div>
    <div>
      <h3>Updated</h3>
      <div v-text="resultEntryJson.updated"></div>
    </div>
    <div>
      <h3>Test</h3>
      <div v-text="test"></div>
    </div>
  </div>
</template>
