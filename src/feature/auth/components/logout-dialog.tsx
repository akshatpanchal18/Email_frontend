import { Button } from "../../../components/ui/button";

interface LogoutProps {
  onConfirm: () => void;
  loading?: boolean;
}

const Logout = ({ onConfirm, loading = false }: LogoutProps) => {
  return (
    <div className="max-w-xl p-6">
      <div className="pr-10">
        <h2 className="text-lg font-semibold text-foreground">Logout</h2>

        <p className="mt-2 text-sm text-foreground">
          Are you sure you want to logout from your account?
        </p>
      </div>

      <div className="mt-7 flex justify-end gap-3">
        <Button
          type="button"
          variant="danger"
          onClick={onConfirm}
          disabled={loading}
          loading={loading}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Logout;
