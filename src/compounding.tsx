import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { type FC, useMemo, useState } from "react";
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { PeriodInput } from "./components/period";
import { Label } from "./components/ui/label";
import { Period } from "./lib/period";

type DataPoint = {
	day: number;
	totalAssets: number;
};

export const CompoundingChart: FC = () => {
	const [principal, setPrincipal] = useState(1000);
	const [APY, setAPY] = useState(1);
	const [period, setPeriod] = useState<Period>(new Period("year", 1));
	const [compoundingFrequency, setCompoundingFrequency] = useState<Period>(
		new Period("day", 1),
	);
	const [gas, setGas] = useState(0.1);

	const dailyRate = useMemo(() => (1 + APY) ** (1 / 365) - 1, [APY]);

	const data: DataPoint[] = useMemo(() => {
		const result: DataPoint[] = [];
		let totalAssets = principal;
		for (let day = 0; day <= period.days; day++) {
			if (day % compoundingFrequency.days === 0 && day !== 0) {
				totalAssets *= 1 + dailyRate * compoundingFrequency.days;
				totalAssets -= gas;
			}
			result.push({ day, totalAssets });
		}
		return result;
	}, [principal, dailyRate, period, compoundingFrequency, gas]);

	const yDomain = useMemo(() => {
		if (data.length === 0) return [0, 1000];

		const totalAssetsValues = data.map((d) => d.totalAssets);
		const minValue = Math.min(...totalAssetsValues);
		const maxValue = Math.max(...totalAssetsValues);
		return [Math.floor(minValue), Math.ceil(maxValue)];
	}, [data]);

	return (
		<div className="flex flex-col lg:flex-row gap-4">
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<Label htmlFor="principal" className="whitespace-nowrap">
						初期値
					</Label>
					<Input
						type="number"
						id="principal"
						placeholder="1000"
						value={principal}
						onChange={(e) => setPrincipal(Number(e.target.value))}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Label htmlFor="APY" className="whitespace-nowrap">
						APY
					</Label>
					<Slider
						id="APY"
						value={[Math.min(APY, 30)]}
						onValueChange={(value) => {
							setAPY(value[0]);
						}}
						step={0.1}
						min={0.01}
						max={20}
					/>
					<Input
						type="number"
						id="APY"
						placeholder="1"
						value={APY}
						onChange={(e) => setAPY(Number(e.target.value))}
						min={0.01}
						className="w-24"
					/>
					<span>%</span>
				</div>
				<div className="flex items-center gap-2">
					<Label htmlFor="period" className="whitespace-nowrap">
						表示期間
					</Label>
					<PeriodInput id="period" value={period} onChange={setPeriod} />
				</div>
				<div className="flex items-center gap-2">
					<Label htmlFor="frequency" className="whitespace-nowrap">
						頻度
					</Label>
					<PeriodInput
						id="frequency"
						value={compoundingFrequency}
						onChange={setCompoundingFrequency}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Label htmlFor="gas">Gas</Label>
					<Input
						type="number"
						id="gas"
						placeholder="0.01"
						value={gas}
						onChange={(e) => setGas(Number(e.target.value))}
					/>
				</div>
			</div>
			<ResponsiveContainer width="100%" height={500}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="day" />
					<YAxis domain={yDomain} />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="totalAssets" stroke="#8884d8" />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};
