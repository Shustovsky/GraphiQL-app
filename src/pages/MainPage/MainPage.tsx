import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import play from './../../assets/icons/play.png';
import { useDispatch, useSelector } from 'react-redux';
import { GraphQLClient, gql } from 'graphql-request';
import { Loader } from '../../components/loader/Loader';
import { setLoading } from '../../store/slices/loadingSlice';
import { Schema } from './components/Schema';
import { Docs } from './components/Docs';

export default function MainPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);
  const [inputValue, setInputValue] = useState<string>('https://rickandmortyapi.com/graphql');
  const [textAreaValue, setTextAreaValue] = useState<string>(
    'query {\n' +
      '  characters{\n' +
      '    results{\n' +
      '      id\n' +
      '      name\n' +
      '    }\n' +
      '  }\n' +
      '}'
  );
  const [isVarArea, setIsVarArea] = useState<boolean>(true);
  const [textAreaVariable, setTextAreaVariable] = useState<string>('');
  const [textAreaHTTP, setTextAreaHTTP] = useState<string>('');
  const [responseText, setResponseText] = useState<string | Error>(
    'Press the Play Button to get a response here'
  );
  const [schema, setSchema] = useState<boolean>(false);
  const [docs, setDocs] = useState<boolean>(false);

  const [sizeRequest, setSizeRequest] = useState({ width: '100%', height: '40vh' });
  const [sizeVariables, setSizeVariables] = useState({ width: 320, height: 'calc(100vh-3.5rem)' });

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const changeTextAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const changeTextAreaVarHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaVariable(event.target.value);
  };
  const changeTextAreaHTTPHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaHTTP(event.target.value);
  };

  const makeRequest = (query: string) => {
    const client = new GraphQLClient(inputValue);
    const queryGQL = gql`
      ${query}
    `;
    const variables =
      typeof JSON.parse(textAreaVariable) === 'object' ? JSON.parse(textAreaVariable) : null;
    const setHeaders =
      typeof JSON.parse(textAreaHTTP) === 'object' ? JSON.parse(textAreaHTTP) : null;

    client
      .request(queryGQL, variables, setHeaders)
      .then((data) => {
        console.log(data);
        dispatch(setLoading(false));
        setResponseText(JSON.stringify(data, undefined, 2));
      })
      .catch((error) => {
        setResponseText(error as Error);
      });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate('/welcome');
  }, [user, loading, navigate]);

  return (
    <main className="bg-[#172b3a] text-[#9fa6ab] h-[calc(100vh-3.5rem)]">
      <input
        className=" text-[#9fa6ab] bg-[#0f202d] placeholder:italic placeholder:text-slate-400 block h-8 w-[calc(100%-1.5rem)] border border-[#09141c] rounded pl-2 my-3 ml-3 mr-3 shadow-sm focus:outline-none sm:text-sm"
        placeholder="Search for anything..."
        type="text"
        name="search"
        value={inputValue}
        onChange={changeInputHandler}
      />

      <div className="main h-[calc(100%-3rem)] flex flex-row">
        <Resizable
          size={{ width: sizeVariables.width, height: sizeVariables.height }}
          enable={{
            top: false,
            right: true,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          maxWidth={'80vw'}
          minWidth={'320'}
          onResizeStop={(e, direction, ref, d) => {
            setSizeVariables({
              width: sizeVariables.width + d.width,
              height: sizeVariables.height + d.height,
            });
          }}
        >
          <div className="leftBlock w-auto h-full flex flex-col">
            <Resizable
              size={{ width: sizeRequest.width, height: sizeRequest.height }}
              enable={{
                top: false,
                right: false,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false,
              }}
              maxHeight={'80vh'}
              onResizeStop={(e, direction, ref, d) => {
                setSizeRequest({
                  width: '100%',
                  height: sizeRequest.height + d.height,
                });
              }}
            >
              <textarea
                className="request resize-none focus: outline-none w-[100%] h-full bg-[#0f202d] py-2 pl-9 pr-3 shadow-sm sm:text-sm"
                value={textAreaValue}
                onChange={changeTextAreaHandler}
              ></textarea>
            </Resizable>
            <div className="flex flex-col h-full">
              <div className="flex gap-4 absolute z-20 mt-2">
                <button
                  style={isVarArea ? { color: '#9da3a7' } : { color: '#555e66' }}
                  onClick={() => {
                    setIsVarArea(true);
                  }}
                >
                  QUERY VARIABLES
                </button>
                <button
                  style={!isVarArea ? { color: '#9da3a7' } : { color: '#555e66' }}
                  onClick={() => {
                    setIsVarArea(false);
                  }}
                >
                  HTTP HEADERS{' '}
                </button>
              </div>
              <div className="h-full relative">
                <textarea
                  className="z-10 absolute w-full h-full bg-[#0b1924] resize-none py-2 pl-9 pr-3 pt-9 shadow-sm focus:outline-none sm:text-sm"
                  style={isVarArea ? { visibility: 'visible' } : { visibility: 'hidden' }}
                  value={textAreaVariable}
                  onChange={changeTextAreaVarHandler}
                ></textarea>
                <textarea
                  className="z-1 absolute w-full h-full bg-[#0b1924] resize-none py-2 pl-9 pr-3 pt-9 shadow-sm focus:outline-none sm:text-sm"
                  value={textAreaHTTP}
                  onChange={changeTextAreaHTTPHandler}
                ></textarea>
              </div>
            </div>
          </div>
        </Resizable>

        <div className="w-full">
          <button
            onClick={() => makeRequest(textAreaValue)}
            className="absolute translate-x-[-50%] translate-y-[50%] w-[50px] h-[50px] border-black border-2 bg-sky-500 rounded-full hover:bg-green-500 transition-all duration-700"
          >
            <img className="mx-auto pl-1 w-[20px] h-[20px]" src={play} alt="play" />
          </button>
          <div className="min-w-min grow h-[85vh] overflow-auto py-2 pl-9 pr-3 shadow-sm">
            {isLoading ? <Loader /> : <JsonView data={responseText} style={darkStyles} />}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1 fixed top-[30%] right-[-60px] rotate-90">
        <button
          className="px-4 py-2 font-semibold bg-sky-500 text-white hover:bg-green-500 transition-all duration-700"
          onClick={() => {
            setSchema((current) => !current);
            if (docs) {
              setDocs((current) => !current);
            }
          }}
        >
          SCHEMA
        </button>
        <button
          className="px-4 py-2 font-semibold bg-sky-500 text-white hover:bg-green-500 transition-all duration-700"
          onClick={() => {
            setDocs((current) => !current);
            if (schema) {
              setSchema((current) => !current);
            }
          }}
        >
          DOCS
        </button>
      </div>
      {schema && <Schema apiUrl={inputValue} />}
      {docs && <Docs apiUrl={inputValue} />}
    </main>
  );
}
