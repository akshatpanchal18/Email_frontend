import { useEffect, type ReactNode, type MouseEvent } from "react";
import { TbX } from "react-icons/tb";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const Modal = ({
  open,
  onClose,
  children,
  className = "",
  loading = false,
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onMouseDown={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" />

      {/* Small modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`
          relative z-10
          w-[400px]
          max-w-[calc(100vw-2rem)]
          rounded-xl
          border border-border
          bg-background
          text-foreground
          shadow-2xl
          ${className}
        `}
      >
        <button
          type="button"
          disabled={loading}
          onClick={onClose}
          aria-label="Close modal"
          className="
          absolute right-3 top-3
          flex size-8 items-center justify-center
          rounded-md
          text-muted-foreground
          hover:bg-muted
          hover:text-foreground

          disabled:cursor-not-allowed
          disabled:opacity-40
          disabled:hover:bg-transparent
          disabled:hover:text-muted-foreground
        "
        >
          <TbX className="size-5" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
