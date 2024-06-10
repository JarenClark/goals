/* eslint-disable react/no-unescaped-entities */
//react/no-unescaped-entities
import React from "react";
import { cn } from "@/lib/utils";
type Props = {
  children: React.ReactNode;
  className?: string;
};

export function TypographyH1({ children, className }: Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}
export function TypographyH2({ children, className }: Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}
export function TypographyH3({ children, className }: Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}
export function TypographyH4({ children, className }: Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  );
}
export function TypographyP({ children, className }: Props) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}
export function TypographyList({ children, className }: Props) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}>
      {children}
    </ul>
  );
}
export function TypographyInlineCode({ children, className }: Props) {
  return (
    <code className="relative rounded old-bg-black/5 old-dark:bg-white/5 bg-secondary px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}
export function TypographyLead({ children, className }: Props) {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

export function TypographyBlockquote({ children, className }: Props) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export function TypographyMuted({ children, className }: Props) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
