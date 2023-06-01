import { titleStyle, cardStyle, divider, getTypeName, QueryProps } from './Docs';

interface RenderScalarCardProps {
  queries: QueryProps;
}

export function RenderScalarCard({ queries }: RenderScalarCardProps) {
  return (
    <div className={cardStyle + 'w-[230px]'}>
      <div className={divider}>{`${queries.name}: ${getTypeName(queries.type)}`}</div>
      <div className={divider}>{queries.description}</div>
      <div className={divider}>
        <div className={titleStyle}>Type Details</div>
        {queries.type.description}
      </div>
      <div>scalar {getTypeName(queries.type)}</div>
    </div>
  );
}
