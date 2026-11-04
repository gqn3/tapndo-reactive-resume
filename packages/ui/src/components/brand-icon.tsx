import { cn } from "@reactive-resume/utils/style";

type Props = React.ComponentProps<"img"> & {
	variant?: "logo" | "icon";
};

export function BrandIcon({ variant = "logo", className, ...props }: Props) {
	return (
		<>
			<img
				src={variant === "logo" ? "/tapndo/wordmark.svg" : "/tapndo/icon.svg"}
				alt="TapNDo CV"
				className={cn("hidden size-12 dark:block", className)}
				{...props}
			/>
			<img
				src={variant === "logo" ? "/tapndo/wordmark.svg" : "/tapndo/icon.svg"}
				alt="TapNDo CV"
				className={cn("block size-12 dark:hidden", className)}
				{...props}
			/>
		</>
	);
}
