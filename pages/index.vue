<script setup lang="ts">
import { useContentDiff } from '~/composables/useContentDiff'

const htmlContent1 = ref<string>('<div><p>Sneakily readding a paragraph</p><div class="not-prose"  variant="0" static="true"><div class="flex space-x-2 rounded-lg shadow-sm p-3 items-center bg-white"><div class="bg-sky-100 w-12 h-12 rounded-full flex shrink-0 items-center justify-center"><svg height="26" width="26" class="text-sky-600"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Z"/></svg></div><div class="text-gray-700 w-full p-2"><p>icon</p></div></div></div><div class="not-prose"  variant="1" static="true"><div class="bg-white shadow-sm rounded-lg relative py-6 px-10 border border-sky-200"><div class="absolute text-5xl text-sky-600 font-serif left-4 -top-2 before:content-[&#39;&#39;] before:bg-white before:w-5 before:h-px before:absolute before:top-[7px] before:left-0 before:-z-10 z-0"> “ </div><div class="italic text-gray-700 text-center"><p>test</p></div><div class="text-sm text-sky-600 mt-4 text-center border-t pt-2"><span>Default Text</span><span> - </span><span>Default Text</span></div><div class="absolute text-5xl text-sky-600 font-serif right-6 -bottom-9 before:content-[&#39;&#39;] before:bg-white before:w-5 before:h-px before:absolute before:bottom-[35px] before:-z-10 z-0"> ” </div></div></div><div class="not-prose"  variant="0"><div class="w-full text-center font-medium text-xl mb-3">Default Title Text</div><div class="md:border md:rounded-lg md:bg-white md:border-sky-200"><table class="w-full block md:table"><thead class="hidden md:table-header-group"><tr><th class="border-r border-sky-200 w-40 bg-sky-100 rounded-tl-lg"><div class="font-medium text-sky-700 py-1 px-3 w-full">Name</div></th><th class="border-r border-sky-200 w-40 bg-sky-100"><div class="font-medium text-sky-700 py-1 px-3 w-full">Amount</div></th><th class="border-r border-sky-200 w-40 bg-sky-100"><div class="font-medium text-sky-700 py-1 px-3 w-full">Duration</div></th><th class="border-sky-200 w-40 bg-sky-100 rounded-tr-lg"><div class="font-medium text-sky-700 py-1 px-3 w-full">Rate</div></th></tr></thead></table></div></div><div class="not-prose"  variant="1" static="true"><div class="flex border space-x-2 rounded-lg p-6 items-center border-sky-200 shadow-sm"><div class="!text-gray-700 w-full"><p>hello </p></div></div></div><p>I added a bit for the article as well, changed again?</p></div>')
const htmlContent2 = ref<string>('<div><p>Sneakily readding a paragraph</p><div class="not-prose"  variant="0" static="true"><div class="flex space-x-2 rounded-lg shadow-sm p-3 items-center bg-white"><div class="bg-sky-100 w-12 h-12 rounded-full flex shrink-0 items-center justify-center"><svg height="26" width="26" class="text-sky-600"><path fill="currentColor" d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812Q2.775 11.5 2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.388 2.25t-1.362 2.412q-.975 1.313-2.625 2.963T13.45 19.7L12 21Z"/></svg></div><div class="text-gray-700 w-full p-2"><p>icon</p></div></div></div><div class="not-prose"  variant="1" static="true"><div class="bg-white shadow-sm rounded-lg relative py-6 px-10 border border-sky-200"><div class="absolute text-5xl text-sky-600 font-serif left-4 -top-2 before:content-[&#39;&#39;] before:bg-white before:w-5 before:h-px before:absolute before:top-[7px] before:left-0 before:-z-10 z-0"> “ </div><div class="italic text-gray-700 text-center"><p>test</p></div><div class="text-sm text-sky-600 mt-4 text-center border-t pt-2"><span>Default Text</span><span> - </span><span>Default Text</span></div><div class="absolute text-5xl text-sky-600 font-serif right-6 -bottom-9 before:content-[&#39;&#39;] before:bg-white before:w-5 before:h-px before:absolute before:bottom-[35px] before:-z-10 z-0"> ” </div></div></div><div class="not-prose"  variant="1" static="true"><div class="flex border space-x-2 rounded-lg p-6 items-center border-sky-200 shadow-sm"><div class="!text-gray-700 w-full"><p>hello </p></div></div></div><p>I added a bit for the article as well, changed again?</p></div>')

const outputHtml = ref<string>('')

const { getContentDiff } = useContentDiff()

watch([htmlContent1, htmlContent2], () => {
  outputHtml.value = getContentDiff(htmlContent1.value, htmlContent2.value)
}, { immediate: true })

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

/*del {
    background-color: red;
}
ins {
    background-color: green;
}*/
</style>
