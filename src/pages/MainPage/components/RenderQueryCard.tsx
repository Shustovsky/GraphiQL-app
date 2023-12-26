import { titleStyle, cardStyle, QueryProps } from './Docs';

interface RenderQueryCardProps {
  queries: QueryProps[];
  handleClick: (item: QueryProps) => void;
}

export function RenderQueryCard({ queries, handleClick }: RenderQueryCardProps) {
  return (
    <div className={cardStyle}>
      <div className={titleStyle}>Queries:</div>
      {queries.map((item, index) => (
        <div
          className="cursor-pointer hover:bg-sky-700"
          key={index}
          onClick={() => handleClick(item)}
        >
          {`${item.name}(...): ${
            item.type.name || '[' + (item.type.ofType.name || item.type.ofType.ofType.name) + ']'
          }`}
        </div>
      ))}
    </div>
  );
}
