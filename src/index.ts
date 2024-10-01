import ts from "typescript"
import type { LoaderDefinitionFunction } from "@rspack/core"
import type TsBlankSpace from "ts-blank-space"
import { type blankSourceFile as TsBlankSourceFile } from "ts-blank-space"

let tsBlankSpace: typeof TsBlankSpace
let tsBlankSourceFile: typeof TsBlankSourceFile

class TsBlankLoaderError extends Error {
  name = "TsBlankLoaderError"

  constructor(n: any) {
    super()
    this.message = `An error occured when trying to parse ${n}`
  }
}

export default async function (this: LoaderDefinitionFunction, content: any) {
  const callback = this.async()

  if (!tsBlankSpace) {
    const {
      default: tsBlankSpaceImport,
      blankSourceFile: tsBlankSourceFileImport,
    } = await import("ts-blank-space")
    tsBlankSpace = tsBlankSpaceImport
    tsBlankSourceFile = tsBlankSourceFileImport
  }

  try {
    const onError = (n: any): void => {
      throw new TsBlankLoaderError(n)
    }

    if (this.resourcePath?.includes(".tsx")) {
      const tsxSource = ts.createSourceFile(
        this.resourcePath,
        content,
        ts.ScriptTarget.ESNext,
        false,
        ts.ScriptKind.TSX,
      )
      const jsxOutput = tsBlankSourceFile(tsxSource, onError)
      return callback(null, jsxOutput)
    }

    const output = tsBlankSpace(content, onError)
    return callback(null, output)
  } catch (err: any) {
    return callback(err, null)
  }
}
