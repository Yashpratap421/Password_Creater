import { useCallback, useEffect, useState ,useRef} from 'react'
import './App.css'

function App() {
 const [password, setpassword] = useState("hello");
 const [length, setlength] = useState(8)
 const [Allowedchar , setAllowedchar] = useState(false)
 const [Allowednumber , setAllowednumber] = useState(false)
 const Copypassword = useRef(null);

//  useCallback
const createpassword = useCallback(()=>{
  var pass = ""
  var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  const number = "1234567890"
  const char = "!@#$%^&*(){}\|/?:"
  if(Allowedchar){
    string +=char
  }
  if(Allowednumber){
    string +=number
  }
  for(let i=0 ; i<length ;i++){
    let symbol = Math.floor(Math.random()*string.length + 1);
    pass +=string.charAt(symbol);
  }
  setpassword(pass)


}, [length,Allowednumber,Allowedchar])
 const passwordcopy = useCallback(()=>{
  Copypassword.current?.select()
  window.navigator.clipboard.writeText(password);
 },[password])
// useEffect
useEffect(()=>{
  createpassword()

} ,[Allowednumber,Allowedchar,length])



// view
  return (
    <>
    <div className="h-screen w-full bg-[url('./public/images/mainbg.jpg')] bg-no-repeat bg-center bg-cover flex justify-center items-center text-yellow-400 cursor-pointer ">
      <div className="h-4/5 w-5/6  shadow-2xl shadow-slate-900 backdrop-blur-sm px-2 py-2 rounded-3xl gap-4  ">
        <h1 className='text-orange-600 font-bold text-3xl whitespace-nowrap py-1 text-center  '>Password Generator</h1>
        <div className=" mt-6 mb-4 px-2 flex flex-col gap-4 items-center">
          <input type="text" className=' bg-yellow-600 h-8 w-full rounded-[8px] mt-2 px-2 outline-none p-1  text-[18px] font-bold text-center gap-3 text-white'
          value={password}
          readOnly
          ref={Copypassword} 
          />
          <button onClick={passwordcopy}  className='copy h-8 w-15 py-2 px-3 flex justify-center items-center bg-orange-500 rounded-[6px] text-zinc-200 font-semibold'>Copy</button>
        </div> 
        <div className="h-20 w-full flex items-center gap-8 mb-4 px-2">
        <h2 className='text-[18px] font-semibold '>Length ** <span className='h-6 w-[19px] text-[16px] bg-slate-50 px-2 py-1 text-orange-700 font-bold rounded-lg'> {length}</span></h2>
          <input  type="range" value={length} 
          className='range '
          min={6}
          max={30}
          onChange={(e)=>{
            setlength(e.target.value)
          }}
          />
        </div>
        <div className="flex items-center gap-4">
         <h4 className='flex gap-2 items-center'>
          <label id='char' className='text-[17px] font-normal'>CharAllowed</label>
          <input type="checkbox" name="" id="char" value={Allowedchar} className='h-5 w-5 p-1 rounded-2xl '
          onChange={()=>{
            setAllowedchar((prev)=> !prev )
          }}/>
         </h4>
         <h4 className='flex gap-2'>
          <label id='number' className='text-[17px] font-normal'>NumberAllowed</label>
          <input type="checkbox" name="" id="char" value={Allowednumber} className='h-5 w-5 p-1 rounded-2xl '
           onChange={()=>{
            setAllowednumber((prev)=> !prev )
          }}/>
         </h4>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
