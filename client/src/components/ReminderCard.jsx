import { Link } from "react-router-dom";

const ReminderCard = () => {
  return (
    <div>
      <div className="mt-20">
        <div className="text-2xl font-bold">Start Your Plant Journey! 🌿</div>
        <div className="text-[#4b5563] mt-4 w-[90vw]">
          You haven't identified any plants yet. Use our AI-powered plant
          identifier to discover and learn more about the plants around you!
        </div>
        <div className="mx-auto">
          <Link
            to="/plants"
            className="flex items-center justify-center text-[15px] h-11 w-[90vw] rounded-lg bg-green-500 text-white shadow-md cursor-pointer mt-6 hover:bg-green-600 transition"
          >
            Identify your first plant
          </Link>

          <Link
            to="/plantjournal"
            className="flex items-center justify-center text-[15px] h-11 w-[90vw] rounded-lg border border-[#b6f0bb] bg-white text-green-700 shadow-sm cursor-pointer mt-3 mb-20 hover:bg-[#f6fdf6] transition"
          >
            Start a new journal entry
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
