import http from "http"
import { tickers, getHistorical } from "./tickers"

const port = 4000

const server = http.createServer((req, res) => {
	const url = req.url || ""

	res.setHeader("Content-Type", "application/json")
	res.setHeader("Access-Control-Allow-Origin", "*")

	if (url === "/tickers") {
		res.end(JSON.stringify(tickers))
		return
	}

	if (url.startsWith("/historical/")) {
		const symbol = url.split("/")[2]

		const data = getHistorical(symbol)

		res.end(JSON.stringify({
			symbol,
			data
		}))
		return
	}

	res.statusCode = 404
	res.end(JSON.stringify({ error: "Not found" }))
})

server.listen(port, () => {
	console.log("server running on port", port)
})