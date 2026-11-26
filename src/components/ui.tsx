import type { ButtonHTMLAttributes, ReactNode } from "react";

export function Plus({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`plus-icon ${className}`}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Brand() {
  return (
    <span className="brand">
      <svg viewBox="0 0 40 40" width="30" height="30" aria-hidden="true">
        <path
          d="M17 5h6v8l6-6 4 4-6 6h8v6h-8l6 6-4 4-6-6v8h-6v-8l-6 6-4-4 6-6H5v-6h8l-6-6 4-4 6 6z"
          fill="currentColor"
        />
      </svg>
      forma<span className="brand-period">®</span>
    </span>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline";
};
export function Button({
  children,
  href,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const classes = `button button-${variant} ${className}`;
  return href ? (
    <a className={classes} href={href}>
      {children}
    </a>
  ) : (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  id: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
      </div>
      <p className="section-description">{description}</p>
    </div>
  );
}
