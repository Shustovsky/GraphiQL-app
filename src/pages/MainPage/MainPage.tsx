import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import play from './../../assets/icons/play.png';
import triangle from './../../assets/icons/triangle.svg';
import { useDispatch, useSelector } from 'react-redux';
import { GraphQLClient, gql } from 'graphql-request';
import { Loader } from '../../components/loader/Loader';
import { setLoading } from '../../store/slices/loadingSlice';
import { Schema } from './components/Schema';
import { Docs } from './components/Docs';
import { useTranslation } from 'react-i18next';

export default function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: { loading: { isLoading: boolean } }) => state.loading.isLoading
  );
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
  const [responseText, setResponseText] = useState<string | Error>(`${t('response_text')}`);
  const [schema, setSchema] = useState<boolean>(false);
  const [docs, setDocs] = useState<boolean>(false);

  const [sizeRequest, setSizeRequest] = useState({ width: '100%', height: '100%' });
  const [sizeLeftBlock, setSizeLeftBlock] = useState({
    width: `${innerWidth < 768 && innerWidth > 640 ? '240px' : innerWidth < 640 ? '90%' : '320px'}`,
    height: `${innerWidth < 640 ? '50%' : '100%'}`,
  });
  const [isRaise, setIsRaise] = useState(false);

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

  const isJsonString = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  const makeRequest = (query: string) => {
    const client = new GraphQLClient(inputValue);
    const queryGQL = gql`
      ${query}
    `;

    const variables =
      textAreaVariable && isJsonString(textAreaVariable) ? JSON.parse(textAreaVariable) : null;
    const setHeaders = textAreaHTTP && isJsonString(textAreaHTTP) ? JSON.parse(textAreaHTTP) : null;
    console.log(setHeaders);

    client
      .request(queryGQL, variables, setHeaders)
      .then((data) => {
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
    <main className="bg-[#172b3a] text-[#9fa6ab] h-[100vh]  sm:h-[calc(100vh-3.5rem)]">
      <input
        className=" text-[#9fa6ab] bg-[#0f202d] placeholder:italic placeholder:text-slate-400 block h-8 w-[calc(100%-1.5rem)] border border-[#09141c] rounded pl-2 my-3 ml-3 mr-3 shadow-sm focus:outline-none sm:text-sm"
        placeholder="Search for anything..."
        type="text"
        name="search"
        value={inputValue}
        onChange={changeInputHandler}
      />

      <div className="contentRes sm:overflow-auto h-[calc(100%-3.5rem)] flex sm:flex-row flex-col">
        <Resizable
          size={{ width: sizeLeftBlock.width, height: sizeLeftBlock.height }}
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
          maxWidth={'85vw'}
          minWidth={'240px'}
          onResizeStop={(e, direction, ref, d) => {
            setSizeLeftBlock({
              width: sizeLeftBlock.width + d.width,
              height: sizeLeftBlock.height + d.height,
            });
          }}
        >
          <div className="leftBlock w-auto h-full flex flex-col bg-[#0b1924]">
            <Resizable
              className="h-full max-h-[calc(100%-3rem)]"
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
              onResizeStop={(e, direction, ref, d) => {
                setIsRaise(true);
                setSizeRequest({
                  width: '100%',
                  height: sizeRequest.height + d.height,
                });
              }}
            >
              <textarea
                className="request resize-none focus: outline-none w-[100%] h-full bg-[#0f202d] py-3 pl-9 pr-3 shadow-sm sm:text-sm"
                value={textAreaValue}
                onChange={changeTextAreaHandler}
              ></textarea>
            </Resizable>
            <div
              className="flex flex-col"
              style={!isRaise ? { height: '3rem' } : { height: '100%' }}
            >
              <div className="w-full flex absolute z-20 px-2 h-10 bg-[#0b1924]">
                <div
                  className="w-full flex gap-4"
                  onClick={() => {
                    !isRaise &&
                      setSizeRequest({
                        width: '100%',
                        height: '60%',
                      });
                    setIsRaise(true);
                  }}
                >
                  <button
                    style={isVarArea ? { color: '#9da3a7' } : { color: '#555e66' }}
                    onClick={() => {
                      setIsVarArea(true);
                    }}
                  >
                    {t('query_variables')}
                  </button>
                  <button
                    style={!isVarArea ? { color: '#9da3a7' } : { color: '#555e66' }}
                    onClick={() => {
                      setIsVarArea(false);
                    }}
                  >
                    {t('http_headers')}
                  </button>
                </div>
                <img
                  className={`w-[15px] h-[15px] ml-auto my-auto ${!isRaise ? 'rotate-180' : ''}`}
                  onClick={() => {
                    setSizeRequest({
                      width: '100%',
                      height: '60%',
                    });
                    isRaise &&
                      setSizeRequest({
                        width: '100%',
                        height: '100%',
                      });
                    setIsRaise(!isRaise);
                  }}
                  src={triangle}
                  alt="triangle"
                />
              </div>
              <div className="h-full relative">
                <textarea
                  className="z-10 absolute w-full h-full bg-[#0b1924] resize-none pb-1 pl-9 pr-3 pt-12 shadow-sm focus:outline-none sm:text-sm"
                  style={isVarArea ? { visibility: 'visible' } : { visibility: 'hidden' }}
                  value={textAreaVariable}
                  onChange={changeTextAreaVarHandler}
                ></textarea>
                <textarea
                  className="z-1 absolute w-full h-full bg-[#0b1924] resize-none pb-1 pl-9 pr-3 pt-12 shadow-sm focus:outline-none sm:text-sm"
                  value={textAreaHTTP}
                  onChange={changeTextAreaHTTPHandler}
                ></textarea>
              </div>
            </div>
          </div>
        </Resizable>

        <div className="w-full sm:h-auto h-1/2">
          <button
            onClick={() => makeRequest(textAreaValue)}
            className="sm:absolute z-20 fixed top-[calc(30%+115px)] sm:top-auto right-0 sm:right-auto translate-x-[-0.7rem] sm:translate-x-[-50%] sm:translate-y-[50%] w-[40px] sm:w-[50px] h-[100px] sm:h-[50px] border-black sm:border-2 bg-sky-500 sm:rounded-full hover:bg-green-500 transition-all duration-700"
          >
            <img className="mx-auto pl-1 w-[20px] h-[20px]" src={play} alt="play" />
          </button>
          <div className="response grow h-full overflow-auto pt-4 pb-2 pl-9 sm:pr-3 pr-14 shadow-sm">
            {isLoading ? <Loader /> : <JsonView data={responseText} style={darkStyles} />}
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1 fixed z-20 top-[30%] right-[-60px] rotate-90">
        <button
          className="px-4 py-2 font-semibold bg-sky-500 text-white hover:bg-green-500 transition-all duration-700"
          onClick={() => {
            setSchema((current) => !current);
            if (docs) {
              setDocs((current) => !current);
            }
          }}
        >
          {t('schema')}
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
          {t('docs')}
        </button>
      </div>
      {schema && <Schema apiUrl={inputValue} />}
      {docs && <Docs apiUrl={inputValue} />}
    </main>
  );
}
