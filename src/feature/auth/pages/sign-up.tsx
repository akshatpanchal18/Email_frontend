import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SignupSchema } from "../types/schema";
import { type SignupFormValues } from "../types/type";
import { useRegisterMutation } from "../../../store/api/authApi";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { setToken, setUserType } from "../../../store/state";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      const response = await register(data).unwrap();
      if (response.success) {
        dispatch(setToken(response.data.token));
        dispatch(setUserType(response.data.type));
        navigate("/dashboard");
      }
      console.log("register successful:", response);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-muted">
            Sign up to get started and create your account.
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

          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            className="w-full rounded-input bg-primary px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </Button>
        </form>
        <div>
          <p className="mt-6 text-center text-sm text-muted">
            Already have an account ?{" "}
            <NavLink
              to={"/login"}
              className={"hover:underline hover:text-blue-600"}
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
