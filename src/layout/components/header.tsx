import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";

const Header = () => {
  const user = useAppSelector((s) => s.auth.user);

  const email = user?.email?.trim() || "";
  const initial = email.charAt(0).toUpperCase() || "?";

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-3 sm:px-5 lg:px-8">
        {/* Logo */}
        <NavLink to="/d" className="flex min-w-0 items-center" aria-label="MailFlex Dashboard">
          <div className="flex items-center gap-2">
            {/* Logo image */}
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden sm:size-10">
              <img src="/image.png" alt="MailFlex" className="size-full object-contain" />
            </div>

            {/* Brand */}
            <span className="font-['Space_Grotesk'] text-[20px] font-bold leading-none tracking-[-0.035em] sm:text-[22px]">
              <span className="text-gray-900">Mail</span>
              <span className="text-blue-600">Flex</span>
            </span>
          </div>
        </NavLink>

        {/* Right side */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* User */}
          <button type="button" aria-label="Account" className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-surface-hover">
            {/* Avatar */}
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background sm:size-9 sm:text-sm">{initial}</div>

            {/* Email - desktop/tablet only */}
            <div className="hidden min-w-0 text-left md:block">
              <p title={email} className="max-w-55 truncate text-sm font-medium text-text-primary lg:max-w-70">
                {email}
              </p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
