import { getIntrospectionQuery, buildClientSchema } from 'graphql';
import { useEffect, useState, useCallback } from 'react';
import { RenderQueryCard } from './RenderQueryCard';
import { RenderTypeCard } from './RenderTypeCard';
import { RenderScalarCard } from './RenderScalarCard';

interface DocsProps {
  apiUrl: string;
}

export const titleStyle = 'text-xl text-slate-400 pb-3 uppercase';
export const cardStyle = 'shrink-0 border border-white p-2 ';
export const divider = 'pb-4 border-b-2';

export function getTypeName(type) {
  if (type.name) {
    return type.name;
  } else if (type.ofType) {
    return getTypeName(type.ofType);
  }
  return '';
}

export function Docs({ apiUrl }: DocsProps) {
  const [queries, setQueries] = useState();
  const [types, setTypes] = useState(new Set());
  const [scalarType, setScalarType] = useState();

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
    setQueries([...fieldEntries]);
  }, [apiUrl]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchGraphQLSchema();
    };

    fetchData().catch((error) => {
      console.error('Error fetching GraphQL schema:', error);
    });
  }, [fetchGraphQLSchema]);

  const toggleType = (item) => {
    setTypes((prevTypes) => {
      if (prevTypes.has(item)) {
        prevTypes.delete(item);
      } else {
        prevTypes.add(item);
      }
      return new Set(prevTypes);
    });
  };

  function clickQueryCard(item) {
    setTypes(new Set());
    setScalarType(null);
    toggleType(item);
  }

  function clickTypeDetails(item) {
    const objectType = Object.prototype.toString.call(item.type);
    if (objectType === '[object GraphQLScalarType]') {
      setScalarType(item);
    } else {
      setScalarType(null);
      toggleType(item);
    }
  }

  function clickArgsDetails(arg) {
    setScalarType(arg);
  }

  return (
    <div className="customScrollbar cursor-default absolute top-[7%] right-[50px] max-w-[80%] max-h-[80vh] bg-[#002B36] border-black border-8 p-3 rounded-md flex flex-row overflow-scroll gap-2">
      {queries && <RenderQueryCard queries={queries} onClick={clickQueryCard} />}
      {types && (
        <RenderTypeCard
          types={types}
          toggleType={toggleType}
          clickTypeDetails={clickTypeDetails}
          clickArgsDetails={clickArgsDetails}
        />
      )}
      {scalarType && <RenderScalarCard scalarType={scalarType} />}
    </div>
  );
}
