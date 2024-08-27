export default function Tag({ text }: { text: string }) {
  return (
    <span className="text-xs font-medium bg-red-50 rounded-full py-1 px-3 text-red-500">
      {text}
    </span>
  );
}
