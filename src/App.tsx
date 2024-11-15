import type { FC } from "react";
import { BreakEvenCalculator } from "./break-even";
import { Section } from "./components/section";
import { CompoundingChart } from "./compounding";

export const App: FC = () => {
	return (
		<main className="p-4 flex flex-col gap-6">
			<Section title="Compounding">
				<CompoundingChart />
			</Section>
			<Section title="Break Even Calculator">
				<BreakEvenCalculator />
			</Section>
		</main>
	);
};
