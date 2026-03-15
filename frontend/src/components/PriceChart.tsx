import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid
} from "recharts"

type Point = {
	price: number
	time: number
}

type Props = {
	data: Point[]
}

export default function PriceChart({ data }: Props) {
	const axisFormatter = new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	})
	const thirtyMinutes = 30 * 60 * 1000

	const formatted = data.map((p) => ({
		price: p.price,
		time: p.time
	}))
	const startTime = formatted[0]?.time
	const endTime = formatted[formatted.length - 1]?.time
	const ticks =
		startTime && endTime
			? Array.from(
				{
					length:
						Math.floor(
							(endTime - Math.ceil(startTime / thirtyMinutes) * thirtyMinutes) /
							thirtyMinutes
						) + 1
				},
				(_, index) =>
					Math.ceil(startTime / thirtyMinutes) * thirtyMinutes + index * thirtyMinutes
			).filter((tick) => tick >= startTime && tick <= endTime)
			: []

	return (
		<div className="h-100 w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={formatted}>

					<CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

					<XAxis
						dataKey="time"
						type="number"
						scale="time"
						domain={["dataMin", "dataMax"]}
						ticks={ticks}
						tickFormatter={(value: number) => axisFormatter.format(new Date(value))}
						tick={{ fill: "#94a3b8", fontSize: 12 }}
						tickLine={false}
						axisLine={false}
						minTickGap={32}
					/>

					<YAxis
						tick={{ fill: "#94a3b8", fontSize: 12 }}
						axisLine={false}
						tickLine={false}
					/>

					<Tooltip
						labelFormatter={(value) => axisFormatter.format(new Date(Number(value)))}
						contentStyle={{
							background: "#0f172a",
							border: "1px solid #1e293b",
							borderRadius: "8px",
							color: "#fff"
						}}
					/>

					<Line
						type="monotone"
						dataKey="price"
						stroke="#3b82f6"
						strokeWidth={2}
						dot={false}
					/>

				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}
