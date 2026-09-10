import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
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

        {/* Button */}
        <Button
          type="button"
          onClick={() => navigate("/signup")}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
