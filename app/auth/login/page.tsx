"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

import Logo from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { login } from "@/lib/actions/auth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  keepLoggedIn: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = "/overview";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      keepLoggedIn: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);

    const result = await login({
      email: data.email,
      password: data.password,
      remember: data.keepLoggedIn || false,
    });

    if (result.success) {
      router.push(callbackUrl);
      router.refresh();
    } else {
      setServerError(result.error || "Login failed. Please try again.");
    }
  };

  return (
     
      <div className="flex h-screen flex-1 items-center justify-center pt-0">
        <div className="-mt-16 w-full max-w-md rounded-lg bg-white px-10 py-8 shadow-lg">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          {/* Server Error Message */}
          {serverError && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              {/* Email Field */}
              <Field data-invalid={!!errors.email}>
                <FieldContent>
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className="h-11 border-[#D4E4F8] bg-white placeholder:text-[#B0C4DE]"
                    aria-invalid={!!errors.email}
                  />
                  <FieldError errors={[errors.email]} />
                </FieldContent>
              </Field>

              {/* Password Field */}
              <Field data-invalid={!!errors.password}>
                <FieldContent>
                  <div className="relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="h-11 border-[#D4E4F8] bg-white pr-10 placeholder:text-[#B0C4DE]"
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0C4DE] hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FieldError errors={[errors.password]} />
                </FieldContent>
              </Field>

              {/* Keep Me Logged In Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  {...register("keepLoggedIn")}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="keepLoggedIn"
                  className="text-sm text-[#B0C4DE]"
                >
                  Keep me logged in
                </label>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-fit bg-[#4196F0] px-8 font-medium text-white hover:bg-[#3580D4]"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>

          {/* Forget Password Link */}
          <div className="mt-6">
            <Link
              href="/auth/reset-password"
              className="text-sm text-[#4196F0] underline hover:text-[#3580D4]"
            >
              Forget password?
            </Link>
          </div>
        </div>
      </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
