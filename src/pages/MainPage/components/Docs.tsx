import { getIntrospectionQuery, buildClientSchema } from 'graphql';
import { useEffect, useState, useCallback } from 'react';
import { RenderQueryCard } from './RenderQueryCard';
import { RenderTypeCard } from './RenderTypeCard';
import { RenderScalarCard } from './RenderScalarCard';

interface DocsProps {
  apiUrl: string;
}

export interface QueryProps {
  args: QueryArgs[];
  description: string;
  name: string;
  type: QueryType;
}

export interface QueryArgs {
  name: string;
  description: string;
  type: ObjectType;
}

interface QueryType {
  args: [];
  description: string;
  name: string;
  ofType: {
    name: string;
    ofType: {
      name: string;
    };
  };
}

export interface ObjectType {
  name: string;
  ofType?: ObjectType;
}

export const titleStyle = 'text-xl text-slate-400 pb-3 uppercase';
export const cardStyle = 'shrink-0 border border-white p-2 ';
export const divider = 'pb-4 border-b-2';

export function getTypeName(type: ObjectType): string {
  if (type.name) {
    return type.name;
  } else if (type.ofType) {
    return getTypeName(type.ofType);
  }
  return '';
}

export function Docs({ apiUrl }: DocsProps) {
  const [queries, setQueries] = useState<QueryProps[] | undefined>();
  const [types, setTypes] = useState<Set<QueryProps | unknown>>(new Set());
  const [scalarType, setScalarType] = useState<QueryProps | undefined>();

  const fetchGraphQLSchema = useCallback(async () => {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });

    const result = await response.json();
    const schema = buildClientSchema(result.data);
    const query = schema.getQueryType()!;
    const fieldEntries = Object.values(query.getFields());
    setQueries(fieldEntries as unknown as QueryProps[]);
  }, [apiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchGraphQLSchema();
    };

    fetchData().catch((error) => {
      console.error('Error fetching GraphQL schema:', error);
    });
  }, [fetchGraphQLSchema]);

  const toggleType = (item: QueryProps) => {
    setTypes((prevTypes) => {
      if (prevTypes.has(item)) {
        prevTypes.delete(item);
      } else {
        prevTypes.add(item);
      }
      return new Set(prevTypes);
    });
  };

  function clickQueryCard(item: QueryProps) {
    setTypes(new Set());
    setScalarType(undefined);
    toggleType(item);
  }

  function clickTypeDetails(item: QueryProps) {
    const objectType = Object.prototype.toString.call(item.type);
    if (objectType === '[object GraphQLScalarType]') {
      setScalarType(item);
    } else {
      setScalarType(undefined);
      toggleType(item);
    }
  }

  function clickArgsDetails(arg: QueryArgs) {
    setScalarType(arg as QueryProps);
  }

  return (
    <div className="customScrollbar cursor-default absolute top-[7%] right-[50px] max-w-[80%] max-h-[80vh] bg-[#002B36] border-black border-8 p-3 rounded-md flex flex-row overflow-scroll gap-2 z-20">
      {queries && <RenderQueryCard queries={queries} handleClick={clickQueryCard} />}
      {types && (
        <RenderTypeCard
          queries={Array.from(types) as QueryProps[]}
          clickTypeDetails={clickTypeDetails}
          clickArgsDetails={clickArgsDetails}
        />
      )}
      {scalarType && <RenderScalarCard queries={scalarType} />}
    </div>
  );
}
