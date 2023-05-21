import { titleStyle, cardStyle, divider, getTypeName } from './Docs';

interface RenderScalarCardProps {
  scalarType: {
    name: string;
    description: string;
    type: object;
  };
}

export function RenderScalarCard({ scalarType }: RenderScalarCardProps) {
  return (
    <div className={cardStyle + 'w-[230px]'}>
      <div className={divider}>{`${scalarType.name}: ${getTypeName(scalarType.type)}`}</div>
      <div className={divider}>{scalarType.description}</div>
      <div className={divider}>
        <div className={titleStyle}>Type Details</div>
        {scalarType.type.description}
      </div>
      <div>scalar {getTypeName(scalarType.type)}</div>
    </div>
  );
}
