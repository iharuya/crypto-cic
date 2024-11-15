import type React from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

interface DataPoint {
	name: string;
	x: number;
	y: number;
}

const generateData = (
	start: number,
	end: number,
	step: number,
): DataPoint[] => {
	const data: DataPoint[] = [];
	for (let x = start; x <= end; x += step) {
		const y = 2 * x; // y = 2x の計算
		data.push({ name: `x=${x}`, x, y });
	}
	return data;
};

export const SimpleLineChart: React.FC = () => {
	const data = generateData(0, 10, 1); // x=0 から x=10 まで、1刻みでデータ生成

	return (
		<LineChart
			width={500}
			height={300}
			data={data}
			margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="x" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="y" stroke="#8884d8" />
		</LineChart>
	);
};
