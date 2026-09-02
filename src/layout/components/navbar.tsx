import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useAppDispatch } from "../../hooks/redux";
import { useLazyLogoutQuery } from "../../store/api/authApi";
import { setLogout } from "../../store/state";
const Navbar = ({ isAuth }: { isAuth: boolean }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [logout, { isLoading }] = useLazyLogoutQuery();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // Always clear local auth state
      dispatch(setLogout());

      // Go to login
      navigate("/login", { replace: true });
    }
  };
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/image.png"
            alt="MailBox logo"
            className="h-8 w-8 object-contain"
          />

          <span className="text-xl font-bold text-gray-900">MailBox</span>
        </div>

        {/* Button */}
        {isAuth ? (
          <Button
            type="button"
            onClick={handleLogout}
            loading={isLoading}
            disabled={isLoading}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            logout
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => navigate("/signup")}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Get Started
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
