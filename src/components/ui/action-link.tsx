import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "glass" | "brand" | "ghost";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-white text-[#0b0614] hover:bg-white/90 shadow-[0_8px_30px_-12px_rgb(255_255_255/0.5)]",
  brand:
    "bg-brand text-white hover:bg-brand-glow shadow-[0_10px_40px_-12px_var(--brand-glow),inset_0_1px_0_0_rgb(255_255_255/0.2)]",
  glass: "glass-flat text-fg hover:bg-white/[0.08] hover:border-white/20",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export const actionLinkClass = (variant: Variant = "primary", size: Size = "md") =>
  cn(
    "group/action inline-flex shrink-0 select-none items-center justify-center rounded-full font-medium whitespace-nowrap",
    "transition-[background-color,border-color,color,box-shadow,scale] duration-200 ease-out active:scale-[0.97]",
    variants[variant],
    sizes[size],
  );

interface ActionLinkProps extends Omit<ComponentProps<"a">, "href"> {
  href: string;
  variant?: Variant;
  size?: Size;
  /** "arrow" slides right on hover, "external" nudges up-right. */
  icon?: "arrow" | "external" | "none";
  leadingIcon?: ReactNode;
  /** Internal links only: prefetch the full page (needed for the cover morph transition). */
  prefetch?: boolean;
}

/**
 * A link styled as a button. Internal paths use next/link; http(s), mailto
 * and hash links use a plain <a>. External links open in a new tab.
 */
export function ActionLink({
  href,
  variant = "primary",
  size = "md",
  icon = "arrow",
  leadingIcon,
  prefetch,
  className,
  children,
  ...props
}: ActionLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  const isInternalRoute = href.startsWith("/");
  const classes = cn(actionLinkClass(variant, size), className);

  const content = (
    <>
      {leadingIcon}
      <span>{children}</span>
      {icon === "arrow" && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out group-hover/action:translate-x-1 motion-reduce:transition-none"
        />
      )}
      {icon === "external" && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 ease-out group-hover/action:-translate-y-0.5 group-hover/action:translate-x-0.5 motion-reduce:transition-none"
        />
      )}
      {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (isInternalRoute) {
    return (
      <Link href={href} prefetch={prefetch} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {content}
    </a>
  );
}
