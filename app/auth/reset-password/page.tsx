"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

import Logo from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";

const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log("Reset password data:", data);
    // Handle reset password logic here
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

              {/* Reset Password Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-fit bg-[#4196F0] px-6 font-medium text-white hover:bg-[#3580D4]"
              >
                {isSubmitting ? "Sending..." : "Reset Password"}
              </Button>
            </FieldGroup>
          </form>

          {/* Go To Login Link */}
          <div className="mt-6">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-1 text-sm text-[#4196F0] hover:text-[#3580D4]"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="underline">Go To Login</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
