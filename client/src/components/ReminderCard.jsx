import { Link } from 'react-router-dom';

const ReminderCard = () => {
  return (
    <div>
      <div className="mt-20">
        <div className="text-2xl font-bold">Start Your Plant Journey!</div>
        <div className="mx-auto mt-4 w-[90vw] text-[#4b5563] md:max-w-2xl">
          You haven't identified any plants yet. Use our AI-powered plant
          identifier to discover and learn more about the plants around you!
        </div>
        <div className="mx-auto mt-8 justify-center gap-3 md:flex md:max-w-2xl md:flex-row">
          <Link
            to="/plants"
            className="mb-3 flex h-11 w-[90vw] cursor-pointer items-center justify-center rounded-lg bg-[linear-gradient(to_right_top,_rgb(74,_222,_128),_rgb(34,_197,_94),_rgb(74,_222,_128))] text-[15px] text-white shadow-md transition hover:bg-green-600 md:w-[40vw]"
          >
            Identify your first plant
          </Link>

          <Link
            to="/plantjournal"
            className="mb-20 flex h-11 w-[90vw] cursor-pointer items-center justify-center rounded-lg border border-[#b6f0bb] bg-white text-[15px] text-green-700 shadow-sm transition hover:bg-[#f6fdf6] md:w-[40vw]"
          >
            Start a new journal entry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
