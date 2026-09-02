import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg" | "icon";

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-primary
    text-primary-foreground
    hover:bg-primary-hover
    active:bg-primary-active
  `,

  secondary: `
    bg-secondary
    text-secondary-foreground
    hover:bg-secondary-hover
    active:bg-secondary-active
  `,

  outline: `
    border
    border-border
    bg-surface
    text-text-primary
    hover:bg-surface-hover
    hover:border-border-strong
  `,

  ghost: `
    bg-transparent
    text-text-primary
    hover:bg-surface-hover
    active:bg-surface-muted
  `,

  danger: `
    bg-danger
    text-white
    hover:bg-danger-hover
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: `
    h-8
    px-3
    text-xs
    rounded-sm
  `,

  md: `
    h-10
    px-4
    text-sm
    rounded-button
  `,

  lg: `
    h-11
    px-5
    text-sm
    rounded-button
  `,

  icon: `
    size-10
    rounded-button
    p-0
  `,
};

function Spinner() {
  return (
    <svg
      className="size-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
      />

      <path
        className="opacity-90"
        fill="currentColor"
        d="M21 12a9 9 0 0 0-9-9v3a6 6 0 0 1 6 6h3Z"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  disabled,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2

        whitespace-nowrap
        font-medium

        outline-none
        transition-colors

        focus-visible:ring-3
        focus-visible:ring-focus-ring/20

        disabled:pointer-events-none
        disabled:cursor-not-allowed
        disabled:opacity-50

        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {loading && <Spinner />}

      {loading && loadingText ? loadingText : children}
    </button>
  );
}
