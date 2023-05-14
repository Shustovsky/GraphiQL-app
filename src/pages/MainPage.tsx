import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import React, { useState } from 'react';
import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import play from '../assets/icons/play.png';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/loader/Loader';
import { setLoading } from '../store/slices/loadingSlice';

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
  const [responseText, setResponseText] = useState<string>(
    'Press the Play Button to get a response here'
  );

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const changeTextAreaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(event.target.value);
  };

  const makeRequest = (query): Promise<void> => {
    dispatch(setLoading(true));
    return fetch(inputValue, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }).then((response) =>
      response.json().then((data) => {
        dispatch(setLoading(false));
        setResponseText(data);
      })
    );
  };

  useEffect(() => {
    console.log(db);
    if (loading) return;
    if (!user) navigate('/welcome');
  }, [user, loading, navigate]);

  return (
    <main className="bg-[#002B36] text-white">
      <input
        className="bg-[#002B36] text-black placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Search for anything..."
        type="text"
        name="search"
        value={inputValue}
        onChange={changeInputHandler}
      />

      <div className="main flex flex-row flex-wrap">
        <div className="w-auto">
          <textarea
            className="w-72 bg-[#002B36] h-96 resize border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            value={textAreaValue}
            onChange={changeTextAreaHandler}
          ></textarea>
          <button
            onClick={() => makeRequest(textAreaValue)}
            className="absolute translate-x-[-50%] translate-y-[50%] w-[40px] h-[40px] border-black border-2 bg-sky-500 rounded-full hover:bg-green-500 transition-all duration-700"
          >
            <img className="mx-auto w-[20px] h-[20px]" src={play} alt="play" />
          </button>
        </div>
        <div className="min-w-min grow h-auto border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm">
          {isLoading ? <Loader /> : <JsonView data={responseText} style={darkStyles} />}
        </div>
      </div>
    </main>
  );
}
