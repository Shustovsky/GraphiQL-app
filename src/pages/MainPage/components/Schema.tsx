import { getIntrospectionQuery, buildClientSchema, printSchema } from 'graphql';
import { useEffect, useState } from 'react';

interface SchemaProps {
  apiUrl: string;
}

export function Schema({ apiUrl }: SchemaProps) {
  const [print, setPrint] = useState('');
  useEffect(() => {
    fetchGraphQLSchema();
  }, []);

  async function fetchGraphQLSchema() {
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
  }

  return <pre className="whitespace-pre-wrap">{print}</pre>;
}
