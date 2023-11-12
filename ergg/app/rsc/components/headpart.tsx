import { useState } from "react";

export default function HeadPart({ sortFunc, sortBy, text, isLast }: any) {
  const [svgState, setSvgState] = useState(0);

  return (
    <div 
      className={`w-[12%] ${!isLast ? "border-r" : ""} border-white px-3`}>
      <div
        className="flex flex-row rounded-xl justify-center items-center gap-x-1 hover:bg-neutral-500"
        onClick={() => {
          svgState === 180 ? setSvgState(0) : setSvgState(180);
          sortFunc(sortBy);
        }}>
        <span className="text-sm text-white font-mr">{text}</span>
        {svgState === 0 ? (<DownSVG />) : (<UpSVG />)}
      </div>
    </div>
  )
}

function DownSVG() {
  return (
    <svg className={`rotate-0`}
      xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" strokeWidth="1" width="15" height="15" fill="#FFFFFF" viewBox="0 0 16 15">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    </svg>
  )
}

function UpSVG() {
  return (
    <svg className={`rotate-180`}
      xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF" strokeWidth="1" width="15" height="15" fill="#FFFFFF" viewBox="0 0 16 15">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    </svg>
  )
}