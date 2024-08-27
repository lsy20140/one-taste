export default function MarkerInfoWindow({ name }: { name: string }) {
  return (
    <div className="p-2 rounded-md text-sm text-black font-medium">{name}</div>
  );
}
