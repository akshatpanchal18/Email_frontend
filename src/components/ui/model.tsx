import { useEffect, type MouseEvent, type ReactNode } from "react";
import { TbX } from "react-icons/tb";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  loading?: boolean;
  size?: "large" | "content";
}

const Modal = ({ open, onClose, children, className = "", loading = false, size = "large" }: ModalProps) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, loading]);

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
    if (loading) return;

    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = size === "content" ? "w-full max-w-lg" : "h-full max-h-[calc(100vh-2rem)] w-full max-w-6xl";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onMouseDown={handleBackdropClick}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 flex flex-col overflow-hidden rounded-xl border border-border bg-background text-foreground shadow-2xl ${sizeClasses} ${className}`}
      >
        {/* Close */}
        <button
          type="button"
          disabled={loading}
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-3 top-3 z-20 flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          <TbX className="size-5" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
