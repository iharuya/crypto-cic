import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren } from "react";

type Props = {
	className?: string;
	title: string;
};
export const Section: FC<PropsWithChildren<Props>> = ({
	children,
	title,
	className,
}) => {
	return (
		<section className={cn("flex flex-col gap-4", className)}>
			<h2 className="text-3xl font-semibold">{title}</h2>
			{children}
		</section>
	);
};
