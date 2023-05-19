import { titleStyle, cardStyle, divider, getTypeName } from './Docs';

interface RenderTypeCardProps {
  types: [
    {
      name: string;
      type: object;
      description: string;
      args: [];
    }
  ];
  clickTypeDetails: () => void;
  clickArgsDetails: () => void;
}

export function RenderTypeCard({ types, clickTypeDetails, clickArgsDetails }: RenderTypeCardProps) {
  const getField = (item) => {
    console.log(item);
    const objectType = Object.prototype.toString.call(item.type);
    if (objectType === '[object GraphQLScalarType]') {
      return [item];
    } else if (objectType === '[object GraphQLObjectType]') {
      return Object.values(item.type.getFields());
    } else if (objectType === '[object GraphQLList]') {
      return Object.values(item.type.ofType.getFields());
    } else if (objectType === '[object GraphQLNonNull]') {
      return Object.values(item.type.ofType.ofType.getFields());
    }

    //GraphQLList GraphQLObjectType GraphQLScalarType
  };

  return Array.from(types).map((type, typeIndex) => {
    return (
      <div className={cardStyle + 'w-[230px]'} key={typeIndex}>
        <div className={divider}>{`${type.name}: ${
          type.type.name || '[' + (type.type.ofType.name || type.type.ofType.ofType.name) + ']'
        }`}</div>
        <div className={divider}>{type.description}</div>
        <div className={divider}>
          <div className={titleStyle}>Type details</div>
          {getField(type).map((item, index) => (
            <div
              className="cursor-pointer hover:bg-sky-700"
              key={index}
              onClick={() => clickTypeDetails(item)}
            >
              {`${item.name}(...): ${
                item.type.name ||
                '[' + (item.type.ofType.name || item.type.ofType.ofType.name) + ']'
              }`}
            </div>
          ))}
        </div>
        <div>
          <div className={titleStyle}>Arguments</div>
          {type.args.map((arg, argIndex) => {
            const { name, type } = arg;
            const typeName = getTypeName(type);

            return (
              <div key={argIndex}>
                <div
                  className="cursor-pointer hover:bg-sky-700"
                  onClick={() => clickArgsDetails(arg)}
                >
                  {`${name}: ${typeName}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}
