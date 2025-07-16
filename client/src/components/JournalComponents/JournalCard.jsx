import { Camera, Calendar, Book } from '../../assets/Images';

const JournalCard = () => {
  return (
    <div>
      <div className="flex flex-col justify-center md:mt-10 md:flex md:w-[90vw] md:flex-row md:gap-15">
        <div className="mt-10 flex h-50 w-80 flex-col justify-center rounded-lg border border-[#eee] shadow-xs">
          <div className="mx-auto flex h-15 w-15 items-center justify-center rounded-lg bg-green-100 md:h-20 md:w-20">
            <Camera className="w-7 text-green-600 md:w-8" />
          </div>
          <div className="mt-2 font-medium">Capture Moments</div>
          <div className="mx-auto text-sm text-[#4b5563] md:w-50">
            Photo your plants' growth and special moments
          </div>
        </div>

        <div className="mt-10 flex h-50 w-80 flex-col justify-center rounded-lg border border-[#eee] shadow-xs">
          <div className="mx-auto flex h-15 w-15 items-center justify-center rounded-lg bg-blue-100 md:h-20 md:w-20">
            <Calendar className="w-7 text-blue-600 md:w-8" />
          </div>
          <div className="mt-2 font-medium">Track Progress</div>
          <div className="mx-auto text-sm text-[#4b5563] md:w-50">
            Monitor health and care activities over time
          </div>
        </div>

        <div className="mt-10 flex h-50 w-80 flex-col justify-center rounded-lg border border-[#eee] shadow-xs">
          <div className="mx-auto flex h-15 w-15 items-center justify-center rounded-lg bg-purple-100 md:h-20 md:w-20">
            <Book className="w-7 text-purple-600 md:w-8" />
          </div>
          <div className="mt-2 font-medium">Build Moments</div>
          <div className="mx-auto text-sm text-[#4b5563] md:w-50">
            Create a lasting record of your plant journey
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
