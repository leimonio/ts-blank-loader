import type TsBlankSpace from "ts-blank-space"

let tsBlankSpace: typeof TsBlankSpace

export default async function (content: any) {
  if (!tsBlankSpace) {
    const { default: tsBlankSpaceImport } = await import("ts-blank-space")
    tsBlankSpace = tsBlankSpaceImport
  }
  return tsBlankSpace(content)
}
