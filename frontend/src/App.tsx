import { useEffect, useState } from "react"
import PriceChart from "./components/PriceChart"

type Ticker = {
  symbol: string
  price: number
}

type Point = {
  price: number
  time: number
}

function App() {
  const [tickers, setTickers] = useState<Ticker[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [history, setHistory] = useState<Point[]>([])
  const [prevPrices, setPrevPrices] = useState<Record<string, number>>({})

  // load tickers
  useEffect(() => {
    fetch("http://localhost:4000/tickers")
      .then((res) => res.json())
      .then((data) => {
        setTickers(data)
        if (data.length) setSelected(data[0].symbol)
      })
  }, [])

  // load historical data
  useEffect(() => {
    if (!selected) return

    fetch(`http://localhost:4000/historical/${selected}`)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data)
      })
  }, [selected])

  // websocket realtime prices
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4000")

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)

      if (message.type === "update") {
        setTickers((old) => {
          const prev: Record<string, number> = {}
          old.forEach((t) => (prev[t.symbol] = t.price))
          setPrevPrices(prev)
          return message.data
        })

        if (selected) {
          const ticker = message.data.find((t: Ticker) => t.symbol === selected)

          if (ticker) {
            setHistory((old) => {
              const next = [
                ...old,
                {
                  price: ticker.price,
                  time: Date.now()
                }
              ]

              if (next.length > 120) next.shift()

              return next
            })
          }
        }
      }
    }

    return () => ws.close()
  }, [selected])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-10">
      <h1 className="text-3xl font-semibold mb-8">Trading Dashboard</h1>

      <div className="grid grid-cols-[260px_1fr] gap-8">

        {/* ticker list */}
        <div className="space-y-3">
          {tickers.map((ticker) => {
            const prev = prevPrices[ticker.symbol]
            const isUp = prev !== undefined && ticker.price > prev
            const isDown = prev !== undefined && ticker.price < prev

            return (
              <div
                key={ticker.symbol}
                onClick={() => setSelected(ticker.symbol)}
                className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition
                ${selected === ticker.symbol
                    ? "bg-slate-800 border border-blue-500"
                    : "bg-slate-900 hover:bg-slate-800 border border-slate-800"
                  }`}
              >
                <span className="font-medium">{ticker.symbol}</span>

                <span
                  className={`font-semibold transition-colors duration-300 ${isUp
                    ? "text-green-400"
                    : isDown
                      ? "text-red-400"
                      : "text-slate-300"
                    }`}
                >
                  ${ticker.price.toFixed(2)}
                </span>
              </div>
            )
          })}
        </div>

        {/* chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <PriceChart data={history} />
        </div>

      </div>
    </div>
  )
}

export default App