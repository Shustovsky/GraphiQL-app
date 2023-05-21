import { titleStyle, cardStyle } from './Docs';

interface RenderQueryCardProps {
  queries: [
    {
      name: string;
      type: object;
    }
  ];
  onClick: () => void;
}

export function RenderQueryCard({ queries, onClick }: RenderQueryCardProps) {
  return (
    <div className={cardStyle}>
      <div className={titleStyle}>Queries:</div>
      {queries.map((item, index) => (
        <div className="cursor-pointer hover:bg-sky-700" key={index} onClick={() => onClick(item)}>
          {`${item.name}(...): ${
            item.type.name || '[' + (item.type.ofType.name || item.type.ofType.ofType.name) + ']'
          }`}
        </div>
      ))}
    </div>
  );
}
