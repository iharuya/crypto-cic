import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { type FC, useMemo, useState } from "react";
import { Label } from "./components/ui/label";

export const BreakEvenCalculator: FC = () => {
	const [APY, setAPY] = useState(0.1);
	const [bounded, setBounded] = useState(1000);
	const [unclaimed, setUnclaimed] = useState(10);
	const [gas, setGas] = useState(0.1);
	// FIXME: 工事中
	const breakEvenDays = useMemo(() => {
		return (
			-365 / APY +
			(unclaimed * (bounded + unclaimed - gas) * 365) /
				(APY * (unclaimed - gas) * bounded * APY)
		);
	}, [APY, bounded, unclaimed, gas]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-2">
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
					<Label htmlFor="bounded">Bounded</Label>
					<Input
						type="number"
						id="bounded"
						placeholder="1000"
						value={bounded}
						onChange={(e) => setBounded(Number(e.target.value))}
					/>
				</div>

				<div className="flex items-center gap-2">
					<Label htmlFor="unclaimed">Unclaimed</Label>
					<Input
						type="number"
						id="unclaimed"
						placeholder="100"
						value={unclaimed}
						onChange={(e) => setUnclaimed(Number(e.target.value))}
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

			<div className="text-center">
				<p>Break-even days: {breakEvenDays.toFixed(2)}</p>
			</div>
		</div>
	);
};
