import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[90rem]",
};

export function Container({ size = "default", className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)} {...props} />;
}
