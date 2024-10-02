import { afterEach, describe, expect, it, vi } from "vitest"
import tsBlankLoaderOriginal from "../src"

function setupModule({ mockedThis } = { mockedThis: {} }) {
  const mockCallback = vi.fn()
  const mockThis = {
    async: vi.fn().mockImplementation(() => mockCallback),
    ...mockedThis,
  }
  const tsBlankLoader = tsBlankLoaderOriginal.bind(mockThis)
  return { mockCallback, mockThis, tsBlankLoader }
}

describe("ts-blank-loader", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should call callback with transpiled content", async () => {
    const { mockCallback, mockThis, tsBlankLoader } = setupModule()

    await tsBlankLoader(`let x: string;`)

    expect(mockThis.async).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith(null, "let x        ;")
  })

  it("should call callback with preserved tsx", async () => {
    const { mockCallback, mockThis, tsBlankLoader } = setupModule({
      mockedThis: {
        resourcePath: "App.tsx",
      },
    })

    const tsxContent = `
const App = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, World!</h1>
    </div>
  )
}
`

    await tsBlankLoader(tsxContent)

    expect(mockThis.async).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    expect(mockCallback).toHaveBeenCalledWith(null, tsxContent)
  })
})
