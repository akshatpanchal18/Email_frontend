import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { type LoginFormValues } from "../types/type";
import { useLoginMutation } from "../../../store/api/authApi";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { setToken, setUserType } from "../../../store/state";
import { useAppDispatch } from "../../../hooks/redux";
import { loginSchema } from "../types/schema";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data).unwrap();
      console.log("FULL RESPONSE:", response);
      console.log("TOKEN:", response.data?.token);

      if (!response.success) {
        return;
      }

      if (!response.data?.token) {
        console.error("Login succeeded but no token was returned");
        return;
      }

      dispatch(setToken(response.data.token));
      dispatch(setUserType(response.data.type));

      console.log("redirecting...");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex h-full items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-muted">
            Sign in to your account to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                error={errors.password?.message}
              />
            )}
          />

          <div
            title="temporary not available"
            className="mt-1 flex justify-end"
          >
            <NavLink
              to="/forgot-password"
              onClick={(e) => e.preventDefault()}
              className="pointer-events-none cursor-not-allowed text-sm text-muted opacity-60"
              aria-disabled="true"
            >
              Forgot Password?
            </NavLink>
          </div>

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="w-full rounded-input bg-primary px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
        <div>
          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account ?{" "}
            <NavLink
              to={"/signup"}
              className={"hover:underline hover:text-blue-600"}
            >
              SignUp
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
