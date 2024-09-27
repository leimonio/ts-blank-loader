import type TsBlankSpace from "ts-blank-space"

let tsBlankSpace: typeof TsBlankSpace

class TsBlankLoaderError extends Error {
  name = "TsBlankLoaderError"

  constructor(n: any) {
    super()
    this.message = `An error occured when trying to parse ${n}`
  }
}

export default async function (content: any) {
  // @ts-ignore
  const callback = this.async()

  if (!tsBlankSpace) {
    const { default: tsBlankSpaceImport } = await import("ts-blank-space")
    tsBlankSpace = tsBlankSpaceImport
  }

  try {
    const onError = (n: any): void => {
      throw new TsBlankLoaderError(n)
    }

    const output = tsBlankSpace(content, onError)
    return callback(null, output)
  } catch (err: any) {
    return callback(err, null)
  }
}
