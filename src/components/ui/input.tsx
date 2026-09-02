import * as React from "react";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({
  label,
  error,
  hint,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-label font-medium text-foreground"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        className={`
          w-full
          rounded-input
          border
          bg-surface
          px-input-x
          py-input-y
          text-input
          text-foreground
          outline-none
          transition
          placeholder:text-muted

          border-border

          focus:border-border-focus
          focus:ring-3
          focus:ring-border-focus/15

          disabled:cursor-not-allowed
          disabled:bg-surface-muted
          disabled:opacity-60

          ${error ? "border-danger focus:border-danger focus:ring-danger/15" : ""}

          ${className}
        `}
        {...props}
      />

      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={`${inputId}-error`} className="text-error text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
