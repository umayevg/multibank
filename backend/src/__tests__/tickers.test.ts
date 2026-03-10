import { tickers, getHistorical, getHistoricalCached, _clearHistoryCache } from "../tickers"

describe("tickers module", () => {
	test("tickers contains expected symbols", () => {
		const symbols = tickers.map(t => t.symbol)
		expect(symbols).toEqual(expect.arrayContaining(["AAPL", "TSLA", "BTC-USD", "ETH-USD"]))
	})

	test("generateHistorical returns correct length", () => {
		const data = getHistorical("AAPL", 50)
		expect(Array.isArray(data)).toBe(true)
		expect(data.length).toBe(50)
		expect(typeof data[0].price).toBe("number")
		expect(typeof data[0].time).toBe("number")
	})

	test("getHistoricalCached returns same object within TTL", () => {
		_clearHistoryCache()
		const a = getHistoricalCached("TSLA", 20)
		const b = getHistoricalCached("TSLA", 20)
		expect(a).toBe(b)
	})
})