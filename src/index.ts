import type TsBlankSpace from "ts-blank-space"

let tsBlankSpace: typeof TsBlankSpace

export default async function (content: any) {
  // @ts-ignore
  const callback = this.async()

  if (!tsBlankSpace) {
    const { default: tsBlankSpaceImport } = await import("ts-blank-space")
    tsBlankSpace = tsBlankSpaceImport
  }

  try {
    const output = tsBlankSpace(content, callback)
    return callback(null, output)
  } catch (err: any) {
    return callback(err, null)
  }
}
