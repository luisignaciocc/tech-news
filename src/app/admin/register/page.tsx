"use client";

import { FieldError, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {});

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-96">
        <h1 className="text-black-200 font-bold text-4xl mb-3">Register</h1>
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
