import http from "http"
import { tickers, getHistorical } from "./tickers"
import { WebSocketServer } from 'ws'

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



const wsServer = new WebSocketServer({ server })

wsServer.on('connection', ws => {
	console.log('Client connected...')
})


function updatePrices() {
	tickers.forEach(ticker => {
		const change = (Math.random() - 0.5) * 2
		ticker.price = Math.round((ticker.price + change) * 100) / 100
	})

	const text = JSON.stringify({
		type: 'update',
		data: tickers
	})


	wsServer.clients.forEach(client => {
		if (client.readyState === 1) {
			client.send(text)
		}
	})
}

setInterval(updatePrices, 1500)

server.listen(port, () => {
	console.log("server running on port", port)
})