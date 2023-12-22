import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import "./ripplebutton.css";

const variants = cva(
  [
    "overflow-hidden",
    "inline-flex",
    "items-center",
    "justify-center",
    "relative",
    "cursor-pointer",
    "disabled:cursor-not-allowed",
    "tracking-wide",
    "transition",
    "outline-none",
    "rounded-full",
  ],
  {
    variants: {
      variant: {
        primary: [
          "font-semibold",
          "bg-blue-500",
          "hover:bg-blue-600",
          "text-white",
          "shadow",
          "hover:shadow-md",
          "disabled:bg-blue-500/50",
          "disabled:shadow",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-blue-500/70",
        ],
        outlined: [
          "font-semibold",
          "bg-transparent",
          "hover:text-blue-600",
          "text-blue-500",
          "border-2",
          "border-blue-600",
          "shadow",
          "hover:shadow-md",
          "disabled:text-neutral-900",
          "disabled:shadow",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-blue-500/70",
        ],
        secondary: [
          "font-normal",
          "bg-gray-50",
          "hover:bg-gray-100",
          "disabled:bg-gray-50",
          "text-gray-950",
          "shadow",
          "border",
          "border-neutral-200/50",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-gray-200",
        ],
        dark: [
          "font-normal",
          "bg-gray-800",
          "hover:bg-gray-900",
          "disabled:bg-gray-800/50",
          "text-white",
          "shadow",
          "border",
          "border-neutral-200/50",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-gray-800/70",
        ],
        danger: [
          "font-semibold",
          "bg-red-500",
          "hover:bg-red-600",
          "text-white",
          "rounded-full",
          "shadow",
          "hover:shadow-md",
          "disabled:bg-red-500/50",
          "disabled:shadow",
          "ring-offset-2",
          "focus-visible:ring-2",
          "ring-red-500",
        ],
        ghost: [
          "font-light",
          "text-gray-950",
          "hover:text-gray-600",
          "disabled:text-gray-950",
          "ring-gray-300",
          "focus-visible:ring-1",
        ],
        link: [
          "font-light",
          "text-indigo-500",
          "hover:text-indigo-600",
          "disabled:text-indigo-500/50",
          "disabled:no-underline",
          "hover:underline",
          "ring-indigo-300",
          "focus-visible:ring-1",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-4"],
        default: ["text-base", "py-2", "px-8"],
        large: ["text-lg", "py-3", "px-12"],
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

const loading = cva(["absolute", "inline-flex", "items-center"], {
  variants: {
    variant: {
      primary: ["border-white"],
      outlined: ["border-blue-500"],
      secondary: ["border-gray-950"],
      dark: ["border-white"],
      danger: ["border-white"],
      ghost: ["border-gray-950"],
      link: ["border-none"],
    },
  },
});

const Loading = ({
  variant,
  loadingIconSize = "16px",
}: VariantProps<typeof loading> & { loadingIconSize?: string }) => (
  <div className={loading({ variant })}>
    <div
      style={{ width: loadingIconSize, height: loadingIconSize }}
      className="rounded-full border-2 border-b-transparent animate-spin border-[inherit]"
    />
  </div>
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & {
    loading?: boolean;
    loadingIconSize?: string;
  };
const createRipple = (
  event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  customOnClick?: React.MouseEventHandler<HTMLButtonElement>
) => {
  const button = event.currentTarget;
  const ripple = document.createElement("span");
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.position = "absolute";
  ripple.style.borderRadius = "100%";
  ripple.style.transform = "scale(0)";
  ripple.style.animation = "ripple 500ms linear";
  ripple.style.backgroundColor = "rgba(200, 200, 200, 0.7)";
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  document.styleSheets[0].insertRule(
    `@keyframes ripple { to { transform: scale(4); opacity: 0;}}`,
    0
  );
  ripple.classList.add("ripple");
  button.appendChild(ripple);
  setTimeout(() => {
    ripple.remove();
  }, 500);
  // passing click event trigger
  if (customOnClick) {
    customOnClick(event);
  }
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant,
      size,
      loading,
      loadingIconSize,
      onClick,
      ...rest
    },
    ref
  ) => (
    <button
      onClick={(e) => {
        createRipple(e, onClick);
      }}
      aria-busy={loading}
      aria-disabled={loading}
      ref={ref}
      className={twMerge(clsx(variants({ variant, size, className })))}
      {...rest}
    >
      {loading && (
        <Loading variant={variant} loadingIconSize={loadingIconSize} />
      )}
      <span
        className={clsx("transition", {
          "opacity-0": loading,
          "opacity-100": !loading,
        })}
      >
        {children}
      </span>
    </button>
  )
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
