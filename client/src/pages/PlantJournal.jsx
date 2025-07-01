import { useState } from "react";

const PlantJournal = () => {
  const [modal, setModal] = useState(false);

  return (
    <div className="font-[Inter] flex flex-col items-center text-center ">
      <div className="text-center mt-10 font-bold font-[Inter] text-2xl">
        Plant Journal
      </div>
      <div className="mt-2 text-md w-[80vw] text-[#737373]">
        Document every step of your plant care journey to see your plants
        flourish
      </div>
      <div>
        <button
          to="/plants"
          className="flex items-center justify-center text-[15px] h-11 w-[90vw] rounded-lg bg-green-500 text-white font-semibold shadow-md cursor-pointer mt-6 hover:bg-green-600 transition"
          onClick={() => setModal(true)}
        >
          + New Entry
        </button>
      </div>

      {modal && (
        <div className="absolute inset-0 bg-black/35 backdrop-blur-xs flex items-center justify-center opacity-100">
          <div className="rounded-lg bg-white shadow-md h-100 w-[90vw]">
            <div className="flex flex-start ml-5 pt-5 font-semibold">
              <div>New Journal Entry</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantJournal;
