import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLen] = useState(8)
  const [num, setNum] = useState(false)
  const [char, setChar] = useState(false)
  const [pin, setPin] = useState('')

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (num) str += '0123456789'
    if (char) str += '!@#$%^&*-_=+[]{}`~"'

    for (let index = 0; index < length; index++) {
      let character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character)
    }
    setPin(pass)
  }, [length, num, char, setPin])

  const copyPassword=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(pin)
  },[pin])

  useEffect(() => {
    passwordGenerator()
  }, [length, num, char, passwordGenerator])
  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={pin}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassword} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLen(e.target.value) }} />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={num}
              id='numInput'
              onChange={() => {
                setNum((prev) => !prev)
              }} />
            <label htmlFor="numInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={char}
              id='charInput'
              onChange={() => {
                setChar((prev) => !prev)
              }} />
            <label htmlFor="charInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
