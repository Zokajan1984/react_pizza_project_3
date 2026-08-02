import { relative } from "path";
import { ReactNode } from "react";

type DevLaberColor = "blue" | "green" | "purple" | "orange" | "pink" | "teal";

interface DevLaberProps {
  name: string;
  color?: DevLaberColor;
  children: ReactNode;
}

const colorStyles: Record<DevLaberColor, { border: string; badge: string }> = {
  blue: {
    border: "border-blue-500",
    badge: "bg-blue-500",
  },

  green: {
    border: "border-green-500",
    badge: "bg-green-500",
  },

  purple: {
    border: "border-purple-500",
    badge: "bg-purple-500",
  },

  orange: {
    border: "border-orange-500",
    badge: "bg-orange-500",
  },

  pink: {
    border: "border-pink-500",
    badge: "bg-pink-500",
  },

  teal: {
    border: "border-teal-500",
    badge: "bg-taal-500",
  },
};

export default function DevLabel({
  name,
  color = "blue",
  children,
}: DevLaberProps) {
  const styles = colorStyles[color];

  return (
    <div
      className={
        "relative border-2 border-dashed" + styles.border + " " + "p-2 m-1"
      }
    >
      <span
        className={
          "absolute -top-3 left-2 px-2 py-0.5 text-xs text-white font-mono rounded" +
          styles.badge
        }
      >
        {name}
      </span>
      {children}
    </div>
  );
}
