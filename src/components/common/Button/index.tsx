"use client";

type Props = {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  bgColor?: "black" | "red" | "disabled" | string;
  textColor?: "black" | "white" | string;
  size?: "small" | "normal";
};

export default function Button({
  children,
  onClick,
  bgColor,
  textColor = "black",
  size = "normal",
}: Props) {
  const baseStyle = "w-full rounded-lg font-semibold tracking-wide";
  return (
    <button
      className={`${baseStyle} ${getColorStyle(
        bgColor,
        textColor
      )} ${getPaddingStyle(size)}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const getPaddingStyle = (size?: string) => {
  let paddingStyle = "p-2";

  switch (size) {
    case "small":
      paddingStyle = "py-2 px-6";
      break;
  }

  return paddingStyle;
};

const getColorStyle = (bgColor?: string, textColor?: string) => {
  let colorStyle = "bg-neutral-200";
  if (bgColor === "black") {
    colorStyle = `bg-black text-${textColor}`;
  } else if (bgColor === "red") {
    colorStyle = `bg-red-500 text-${textColor}`;
  }
  return colorStyle;
};
