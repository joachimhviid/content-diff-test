import { Diff, DIFF_DELETE, DIFF_EQUAL, DIFF_INSERT, diff_match_patch } from 'diff-match-patch'
import { detailedDiff } from 'deep-object-diff'
// import diff from 'node-htmldiff'
export const useContentDiff = () => {
  const dmp = new diff_match_patch()

  const getContentDiff = (oldContent: string, newContent: string) => {
    const diffs = dmp.diff_main(oldContent, newContent)
    dmp.diff_cleanupSemantic(diffs)

    return wrapWithHTMLTags(mendHTMLTags(diffs))
    // return diff(oldContent, newContent)
  }

  const mendHTMLTags = (diffList: Diff[]): Diff[] => {
    const resultArray: Diff[] = []
    const incompleteTagRegex = /<[^>]*>?$/m
    let shouldAddToNext: [boolean, string] = [false, diffList[0][1].match(incompleteTagRegex)?.[0] ?? '']

    diffList.forEach(([type, text]) => {
      const match = text.match(incompleteTagRegex)
      console.log('Mending diff', { type, text })
      if (shouldAddToNext[0]) {
        console.log(`Adding ${shouldAddToNext[1]} to start of`, text)
        text = shouldAddToNext[1] + text
        shouldAddToNext = [false, '']
      }
      if (match && match[0] && !match[0].endsWith('>')) {
        console.log(`Removing ${match[0]} from end of`, text)
        text = text.slice(0, -match[0].length)
        shouldAddToNext = [true, match[0]]
      }
      console.log(`%cResult: ${text}`, 'color: green')
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

  const getModelDiff = (oldModel: object, newModel: object) => {
    return detailedDiff(oldModel, newModel)
  }

  return {
    getContentDiff,
    getModelDiff,
  }
}