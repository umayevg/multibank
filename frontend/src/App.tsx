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
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-10 py-6">

      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">
        Trading Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">

        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">

          {tickers.map((ticker) => {
            const prev = prevPrices[ticker.symbol]
            const isUp = prev !== undefined && ticker.price > prev
            const isDown = prev !== undefined && ticker.price < prev

            return (
              <div
                key={ticker.symbol}
                onClick={() => setSelected(ticker.symbol)}
                className={`shrink-0 lg:shrink flex justify-between items-center 
                min-w-35 lg:min-w-0 
                p-3 sm:p-4 rounded-xl cursor-pointer transition
                ${selected === ticker.symbol
                    ? "bg-slate-800 border border-blue-500"
                    : "bg-slate-900 hover:bg-slate-800 border border-slate-800"
                  }`}
              >
                <span className="font-medium text-sm sm:text-base">
                  {ticker.symbol}
                </span>

                <span
                  className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${isUp
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
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-6 h-80 sm:h-100 lg:h-125">
          <PriceChart data={history} />
        </div>

      </div>
    </div>
  )
}

export default App