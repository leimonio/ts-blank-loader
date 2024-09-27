import { test, assert } from "vitest"
import tsBlankLoader from "../src"

test("ts-blank-loader", async () => {
  const result = await tsBlankLoader(`let x: string;`)
  assert.equal(result, "let x        ;")
})
