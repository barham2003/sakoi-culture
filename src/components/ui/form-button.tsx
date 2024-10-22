"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./button";
import { Loader2 } from "lucide-react";

type FormProps = ButtonProps & {
  children: React.ReactNode;
  isLoading?: boolean
  whileLoading?: string;
};

export default function FormButton({
  children,
  type = "submit",
  variant = "default",
  className = "font-bold",
  whileLoading = "چاوەڕێ بکە",
  onClick,
  isLoading
}: FormProps) {
  const { pending } = useFormStatus();

  const isPending = isLoading || pending;
  return (
    <Button
      type={type}
      variant={variant}
      disabled={isPending}
      className={className}
      onClick={onClick}
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          {whileLoading}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
