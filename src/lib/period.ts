const granularities = ["day", "week", "month", "year"] as const;
export type Granularity = (typeof granularities)[number];

export const isGranularity = (value: string): value is Granularity => {
	return granularities.includes(value as Granularity);
};

export class Period {
	constructor(
		public granularity: Granularity,
		public value: number,
	) {}
	get days() {
		switch (this.granularity) {
			case "day":
				return this.value;
			case "week":
				return this.value * 7;
			case "month":
				return this.value * 30;
			case "year":
				return this.value * 365;
			default:
				throw new Error("Invalid granularity");
		}
	}
	get weeks() {
		return this.days / 7;
	}
	get months() {
		return this.days / 30;
	}
	get years() {
		return this.days / 365;
	}

	toString() {
		return `${this.value} ${periods[this.granularity]}`;
	}

	in(granularity: Granularity) {
		switch (granularity) {
			case "day":
				return this.days;
			case "week":
				return this.weeks;
			case "month":
				return this.months;
			case "year":
				return this.years;
			default:
				throw new Error("Invalid granularity");
		}
	}
}

export const periods: Record<Granularity, string> = {
	day: "日",
	week: "週",
	month: "月",
	year: "年",
};
