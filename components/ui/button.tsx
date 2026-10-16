import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./icon";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ochre-500 text-ink-950 hover:bg-ochre-400",
  secondary: "bg-forest-800 text-sand-50 hover:bg-forest-700",
  outline: "border border-forest-800/25 text-forest-900 hover:border-forest-800 hover:bg-forest-800 hover:text-sand-50",
  ghost: "text-forest-800 hover:bg-forest-50",
  light: "border border-white/40 text-white backdrop-blur-sm hover:bg-white hover:text-forest-900",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = Omit<React.ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  className?: string;
  /** Render a plain anchor (for tel:, mailto: and external URLs). */
  external?: boolean;
};

export function ButtonLink({
  variant,
  size,
  icon,
  iconPosition = "end",
  className,
  external,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const content = (
    <>
      {icon && iconPosition === "start" ? <Icon name={icon} className="size-4" /> : null}
      {children}
      {icon && iconPosition === "end" ? <Icon name={icon} className="size-4" /> : null}
    </>
  );
  const classes = buttonClasses({ variant, size, className });

  if (external) {
    const url = String(href);
    const isWeb = url.startsWith("http");
    return (
      <a
        href={url}
        className={classes}
        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
        {isWeb ? <span className="sr-only"> (opens in a new tab)</span> : null}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
