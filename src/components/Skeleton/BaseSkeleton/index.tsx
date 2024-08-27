type Props = {
  size: "sm" | "md" | "lg" | "xl" | "2xl";
};

export default function BaseSkeleton({ size }: Props) {
  return (
    <div
      className={`w-full ${getSizeStyle(
        size
      )} bg-skeleton rounded-md animate-skeleton`}
    />
  );
}

const getSizeStyle = (size: String) => {
  let sizeStyle = "";

  switch (size) {
    case "sm":
      sizeStyle = "h-8";
      break;
    case "md":
      sizeStyle = "h-12";
      break;
    case "lg":
      sizeStyle = "h-24";
      break;
    case "2xl":
      sizeStyle = "h-28";
      break;
  }
  return sizeStyle;
};
