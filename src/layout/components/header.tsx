import { LuBell, LuMenu } from "react-icons/lu";
import { useAppSelector } from "../../hooks/redux";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const user = useAppSelector((s) => s.auth.user);
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-surface/95 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-text-secondary hover:bg-surface-hover lg:hidden"
          >
            <LuMenu size={22} />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button className="relative rounded-lg p-2 text-text-secondary hover:bg-surface-hover">
            <LuBell size={20} />

            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-surface-hover">
            <div className="flex size-8 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
              {user?.email?.trim()?.charAt(0).toUpperCase() || "?"}
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium text-text-primary">
                {user?.email}
              </p>
            </div>

            {/* <LuChevronDown
              size={16}
              className="hidden text-text-muted sm:block"
            /> */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
