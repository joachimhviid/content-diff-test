import { Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, diff_match_patch } from 'diff-match-patch'
export const useContentDiff = () => {
  const dmp = new diff_match_patch()

  const getContentDiff = (oldContent: string, newContent: string) => {
    const diff = dmp.diff_main(oldContent, newContent)
    dmp.diff_cleanupSemantic(diff)

    return wrapWithHTMLTags(mendHTMLTags(diff))
  }

  const mendHTMLTags = (diffList: Diff[]): Diff[] => {
    const resultArray: Diff[] = []
    let isOpenEnd = false

    diffList.forEach(([type, text]) => {
      console.log('Mending diff', { type, text })
      if (!text.startsWith('<') && isOpenEnd) {
        isOpenEnd = false
        console.log('Adding leftover bracket to', text)
        text = '<' + text
      }
      if (text.endsWith('<')) {
        console.log('Removing leftover bracket from', text)
        text = text.slice(0, -1)
        isOpenEnd = true
      }
      resultArray.push([type, text])
    })

    return resultArray
  }

  const wrapWithHTMLTags = (diffList: Diff[]) => {
    return diffList.map(([type, text]) => {
      console.log({ type, text })
      switch (type) {
        case DIFF_INSERT:
          return `<ins style="background-color: #4ade80">${text}</ins>`
        case DIFF_DELETE:
          return `<del style="background-color: #f43f5e">${text}</del>`
        case DIFF_EQUAL:
          return text
      }
    }).join('')
  }

  return {
    getContentDiff
  }
}