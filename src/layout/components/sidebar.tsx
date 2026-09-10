import { useState } from "react";
import {
  //   LuInbox,
  LuLayoutDashboard,
  LuLogOut,
  //   LuSettings,
  LuX,
} from "react-icons/lu";
import { NavLink } from "react-router-dom";
import Modal from "../../components/ui/model";
import Logout from "../../feature/auth/components/logout-dialog";
import { useLogoutMutation } from "../../store/api/authApi";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: "Inbox",
    path: "inbox",
    icon: LuLayoutDashboard,
  },
  //   {
  //     name: "Inbox",
  //     path: "inbox",
  //     icon: LuInbox,
  //   },
];

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const [isLogoutModelOpen, setIsLogoutModelOpen] = useState(false);
  const [logoutMutation, { isLoading }] = useLogoutMutation();
  const handleOpenLogoutModel = () => {
    setIsLogoutModelOpen(true);
  };
  const handleLogout = async () => {
    try {
      await logoutMutation();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLogoutModelOpen(false);
    }
  };
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          border-r border-border bg-surface
          transition-transform duration-300
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-5">
            <NavLink to="/d" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src="/image.png"
                  alt="MailFlex"
                  className="size-14 shrink-0 rounded-xl object-contain"
                />

                <span className="font-['Space_Grotesk'] text-[22px] font-bold tracking-[-0.035em]">
                  <span className="text-gray-900">Mail</span>
                  <span className="text-blue-600">Flex</span>
                </span>
              </div>
            </NavLink>

            <button
              onClick={onClose}
              className="rounded-md p-2 text-text-secondary hover:bg-surface-hover lg:hidden"
            >
              <LuX size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-5">
            <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-text-muted">
              Menu
            </p>

            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/d"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                    }`
                  }
                >
                  <Icon size={21} />
                  {item.name}
                </NavLink>
              );
            })}

            {/* <div className="my-5 border-t border-border" /> */}

            {/* <NavLink
              to="/settings"
              className={({ isActive }) =>
                `
                flex items-center gap-3 rounded-lg px-3 py-2.5
                text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }
              `
              }
            >
              <LuSettings size={19} strokeWidth={1.8} />
              Settings
            </NavLink> */}
          </nav>

          {/* User */}
          <div className="border-t border-border p-3">
            {/* <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-surface-hover">
              <div className="flex size-10 items-center justify-center rounded-full bg-stone-200 font-semibold text-stone-700">
                D
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-primary">
                  Developer
                </p>

                <p className="truncate text-xs text-text-muted">
                  developer@email.com
                </p>
              </div>
            </div> */}

            <button
              onClick={handleOpenLogoutModel}
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-danger hover:bg-danger-background"
            >
              <LuLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
      <Modal
        loading={isLoading}
        open={isLogoutModelOpen}
        onClose={() => setIsLogoutModelOpen(false)}
      >
        <Logout loading={isLoading} onConfirm={handleLogout} />
      </Modal>
    </>
  );
};

export default Sidebar;
