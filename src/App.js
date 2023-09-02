import React, { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [smallCase,setSmallCaseAllowed] = useState(false);
  const [captalize,setCaptalizeAllowed] = useState(false)
  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (characterAllowed) str += '!@#$%^&*';
    if(captalize) str+= str.toUpperCase();
    if(smallCase) str+= str.toLowerCase();
    for (let i = 1; i <= length; i++) {
      let randomChar = Math.floor(Math.random() * str.length);
      pass += str[randomChar];
    }
    setPassword(pass);
  }, [length, setPassword, numberAllowed, characterAllowed,smallCase,captalize]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator, characterAllowed, numberAllowed,smallCase,captalize]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-opacity-30 h-[500px] flex flex-col gap-3 items-center shadow-md w-full shadow-red-300 bg-gray-600 p-6 rounded-lg backdrop-blur-md  max-w-md">
        <h2 className="text-2xl text-white mb-4">Password Generator</h2>
        <div className="space-y-4 h-[80%] flex flex-col w-full justify-around">
          <div className="relative flex justify-between bg-opacity-80 bg-white text-gray-800 px-3 py-1 h-[50px] rounded-md w-full">
            <input
              type="text"
              value={password}
              readOnly
              className={`bg-transparent w-[80%] outline-none ${password.length>14?"text-red-400":"text-black"}`}
              ref={passwordRef}
            />
            <button
              onClick={copyToClipboard}
              className=" text-sm  bg-indigo-500 text-white px-3 py-3 rounded-md"
            >
              Copy Password
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-white">Length:{length}</label>
            <input
              type="range"
              name="length"
              id="length"
              min={0}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="smallcase"
              id="smallcase"
              checked={smallCase}
              onChange={() => setSmallCaseAllowed(!smallCase)}
              className="mr-2"
            />
            <label className="text-white">Small case</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="number"
              id="number"
              checked={captalize}
              onChange={() => setCaptalizeAllowed(!captalize)}
              className="mr-2"
            />
            <label className="text-white">Captalize</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="number"
              id="number"
              checked={numberAllowed}
              onChange={() => setNumberAllowed(!numberAllowed)}
              className="mr-2"
            />
            <label className="text-white">Numbers</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="character"
              id="character"
              checked={characterAllowed}
              onChange={() => setCharacterAllowed(!characterAllowed)}
              className="mr-2"
            />
            <label className="text-white">Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
