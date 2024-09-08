type Props = {
  params: {
    id: string;
  };
};

export default function AdminPlacePage({ params: { id } }: Props) {
  return <div>{id}</div>;
}
