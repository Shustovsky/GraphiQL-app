import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import React, { useState } from 'react';
// import { Resizable } from 're-resizable';
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

  const [sizeRequest, setSizeRequest] = useState({ width: 320, height: 300 });
  const [sizeVariables, setSizeVariables] = useState({ width: 320, height: 300 });

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
    const variables = textAreaVariable ? JSON.parse(textAreaVariable) : null;
    const setHeaders = textAreaHTTP ? JSON.parse(textAreaHTTP) : null;

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
    <main className="bg-[#172b3a] text-[#9fa6ab] h-[85vh]">
      <input
        className=" text-[#9fa6ab] bg-[#0f202d] placeholder:italic placeholder:text-slate-400 block h-8 w-[calc(100%-1.5rem)] border border-[#09141c] rounded pl-2 my-2 ml-3 mr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for anything..."
        type="text"
        name="search"
        value={inputValue}
        onChange={changeInputHandler}
        disabled
      />

      <div className="main flex flex-row">
        <div className="w-auto flex flex-col">
          <textarea
            className="w-full h-full bg-[#0f202d] resize border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            value={textAreaValue}
            onChange={changeTextAreaHandler}
          >
            {/* <Resizable
              size={{ width: sizeRequest.width, height: sizeRequest.height }}
              onResizeStop={(e, direction, ref, d) => {
                setSizeRequest({
                  width: sizeRequest.width + d.width,
                  height: sizeRequest.height + d.height,
                });
              }}
            ></Resizable> */}
          </textarea>

          {/* <Resizable
            size={{ width: sizeVariables.width, height: sizeVariables.height }}
            onResizeStop={(e, direction, ref, d) => {
              setSizeVariables({
                width: sizeVariables.width + d.width,
                height: sizeVariables.height + d.height,
              });
            }}
          > */}
          <div className="flex flex-col relative">
            <div className="flex gap-2">
              <button
                style={isVarArea ? { color: 'blue' } : { color: 'white' }}
                onClick={() => {
                  setIsVarArea(true);
                }}
              >
                Query Variables
              </button>
              <button
                style={!isVarArea ? { color: 'blue' } : { color: 'white' }}
                onClick={() => {
                  setIsVarArea(false);
                }}
              >
                HTTP Headers{' '}
              </button>
            </div>
            <textarea
              className="z-10 absolute w-full top-8 bg-[#0b1924] h-full resize border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              style={isVarArea ? { visibility: 'visible' } : { visibility: 'hidden' }}
              value={textAreaVariable}
              onChange={changeTextAreaVarHandler}
            ></textarea>
            <textarea
              className=" absolute top-8 w-full bg-[#0b1924] h-[30vh] resize border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              value={textAreaHTTP}
              onChange={changeTextAreaHTTPHandler}
            ></textarea>
          </div>
          {/* </Resizable> */}
        </div>

        <div className="w-full">
          <button
            onClick={() => makeRequest(textAreaValue)}
            className="absolute translate-x-[-50%] translate-y-[50%] w-[40px] h-[40px] border-black border-2 bg-sky-500 rounded-full hover:bg-green-500 transition-all duration-700"
          >
            <img className="mx-auto w-[20px] h-[20px]" src={play} alt="play" />
          </button>
          <div className="min-w-min grow h-[85vh] overflow-auto border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm">
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
