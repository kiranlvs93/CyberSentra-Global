import { ReactNode } from 'react';

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  items?: string[];
}

export function PillarCard({ icon, title, description, items }: PillarCardProps) {
  return (
    <div className="pillar-card">
      <div className="pillar-card__icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      {items ? (
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
