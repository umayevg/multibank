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
	const formatted = data.map((p) => ({
		price: p.price,
		time: new Date(p.time).toLocaleTimeString()
	}))

	return (
		<div className="h-[400px] w-full">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={formatted}>

					<CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

					<XAxis
						dataKey="time"
						tick={{ fill: "#94a3b8", fontSize: 12 }}
						interval={"preserveStartEnd"}
					/>

					<YAxis
						tick={{ fill: "#94a3b8", fontSize: 12 }}
						axisLine={false}
						tickLine={false}
					/>

					<Tooltip
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