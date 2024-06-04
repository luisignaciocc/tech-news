"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldError, useForm } from "react-hook-form";

import { AlertDestructive, AlertSuccess } from "@/app/components/alerts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { registerUser } from "./actions";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password != data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      const response = await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.success) {
        setShowSuccessAlert(true);
        setAlertMessage(null);
        setTimeout(() => {
          router.push("/auth/login");
        }, 5000);
      } else {
        setAlertMessage(response.message || "Unknown error");
      }
    } catch (error) {
      setAlertMessage("An unexpected error occurred. Please try again later.");
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <h1 className="text-black-200 font-bold text-4xl mb-3">Register</h1>
        {alertMessage && !showSuccessAlert && (
          <AlertDestructive title="Error" message={alertMessage} />
        )}
        {showSuccessAlert && (
          <AlertSuccess
            title="Registration Successful"
            message="You will be redirected to the login page in 5 seconds."
          />
        )}
        <form onSubmit={onSubmit} className="space-y-1">
          <Label htmlFor="username">Your username</Label>
          <Input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
            })}
          />
          {errors.username && (
            <div className="mt-1">
              <span className="text-red-500 text-xs">
                {(errors.username as FieldError).message}
              </span>
            </div>
          )}

          <Label htmlFor="email">Your email address</Label>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "Email address is required" },
            })}
          />
          {errors.email && (
            <div className="mt-1">
              <span className="text-red-500 text-xs">
                {(errors.email as FieldError).message}
              </span>
            </div>
          )}

          <Label htmlFor="password">Your password</Label>
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: { value: true, message: "Password is required" },
            })}
          />
          {errors.password && (
            <div className="mt-1">
              <span className="text-red-500 text-xs">
                {(errors.password as FieldError).message}
              </span>
            </div>
          )}

          <Label htmlFor="confirmPassword">Repeat your password</Label>
          <Input
            type="password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: { value: true, message: "Repeat your password" },
            })}
          />
          {errors.confirmPassword && (
            <div className="mt-1">
              <span className="text-red-500 text-xs">
                {(errors.confirmPassword as FieldError).message}
              </span>
            </div>
          )}

          <Button type="submit" style={{ marginTop: "1rem" }}>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}
