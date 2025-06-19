const PlantJournal = () => {
  const Card = ({ children }) => (
    <div className="w-[40vw] rounded-lg shadow-lg h-35"></div>
  );

  return (
    <div className="font-[Inter]">
      <div className="font-semibold text-4xl w-full text-center mx-auto mt-8">
        Where Your <span className="text-[#187C48]">Plants</span> Feel Home
      </div>
      <p className="mt-5 text-center text-[#737373] text-lg">
        Track growth, note care, and celebrate every leaf. Your plant's story
        starts here.
      </p>
      <div className="grid grid-cols-2 text-center gap-4 mt-12 place-items-center">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default PlantJournal;
