import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { useEffect, useState, useCallback } from 'react';

interface SchemaProps {
  apiUrl: string;
}

export function Schema({ apiUrl }: SchemaProps) {
  const [print, setPrint] = useState('');

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
    const print = printSchema(schema);
    setPrint(print);
  }, [apiUrl]);

  useEffect(() => {
    fetchGraphQLSchema();
  }, [fetchGraphQLSchema]);

  return (
    <pre className="customScrollbar whitespace-pre-wrap absolute z-2 top-[7%] right-[50px] max-w-[80%] max-h-[80vh] bg-[#002B36] border-black border-8 p-3 rounded-md flex flex-row overflow-scroll gap-2 z-50">
      {print}
    </pre>
  );
}
