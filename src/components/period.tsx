import { type Granularity, Period, isGranularity, periods } from "@/lib/period";
import { type ComponentProps, type FC, useState } from "react";
import { Input } from "./ui/input";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

type Props = Omit<ComponentProps<typeof Input>, "value" | "onChange"> & {
	value: Period;
	onChange: (value: Period) => void;
};
export const PeriodInput: FC<Props> = ({ value, onChange }) => {
	const [granularity, setGranularity] = useState<Granularity>("day");
	return (
		<div className="flex items-center gap-1">
			<Input
				type="number"
				value={value.in(granularity)}
				onChange={(e) =>
					onChange(new Period(granularity, Number(e.target.value)))
				}
			/>
			<ToggleGroup
				type="single"
				value={granularity}
				onValueChange={(value) => {
					if (!isGranularity(value)) return;
					setGranularity(value);
					onChange(new Period(value, 1));
				}}
			>
				{Object.entries(periods).map(([key, value]) => (
					<ToggleGroupItem key={key} value={key}>
						{value}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
};
