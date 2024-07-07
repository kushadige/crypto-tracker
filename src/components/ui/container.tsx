import React from "react";

import { cn } from "@/lib/tw";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <section className={cn("flex h-[calc(100vh-3.5rem)] flex-col overflow-hidden", className)}>{children}</section>
  );
};
