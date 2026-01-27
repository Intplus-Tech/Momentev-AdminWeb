"use client";

import { useState } from "react";
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

const newPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

export default function NewPasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: NewPasswordFormData) => {
    console.log("New password data:", data);
    // Handle new password logic here
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Blue Header Section */}
      <div className="flex h-50 items-center justify-center bg-[#4196F0]">
        <h1 className="text-3xl font-medium text-white">Admin</h1>
      </div>

      {/* Form Section */}
      <div className="flex flex-1 items-start justify-center bg-[#E8E8E8] pt-0">
        <div className="-mt-16 w-full max-w-md rounded-lg bg-white px-10 py-8 shadow-lg">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Logo />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              {/* New Password Field */}
              <Field data-invalid={!!errors.newPassword}>
                <FieldContent>
                  <div className="relative">
                    <Input
                      {...register("newPassword")}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      className="h-11 border-[#D4E4F8] bg-white pr-10 placeholder:text-[#B0C4DE]"
                      aria-invalid={!!errors.newPassword}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0C4DE] hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FieldError errors={[errors.newPassword]} />
                </FieldContent>
              </Field>

              {/* Confirm Password Field */}
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldContent>
                  <div className="relative">
                    <Input
                      {...register("confirmPassword")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re Enter Password"
                      className="h-11 border-[#D4E4F8] bg-white pr-10 placeholder:text-[#B0C4DE]"
                      aria-invalid={!!errors.confirmPassword}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0C4DE] hover:text-gray-600"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <FieldError errors={[errors.confirmPassword]} />
                </FieldContent>
              </Field>

              {/* Reset Password Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-fit bg-[#4196F0] px-6 font-medium text-white hover:bg-[#3580D4]"
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </div>
    </div>
  );
}
