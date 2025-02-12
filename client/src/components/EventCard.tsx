interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
}

export default function EventCard({
  id,
  title,
  date,
  location,
}: EventCardProps) {
  return (
    <div key={id}>
      <h2>{title}</h2>
      <div>
        <p>{date}</p>
        <p>{location}</p>
      </div>
      <p>Nombre de participants</p>
    </div>
  );
}
