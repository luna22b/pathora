import journalStore from '../../store/journalStore';

const EntrySearchButton = ({ setModal }) => {
  const journals = journalStore((state) => state.journals);
  const setSearchQuery = journalStore((state) => state.setSearchQuery);

  return (
    <div>
      {journals.length > 0 ? (
        <>
          <button
            onClick={() => setModal(true)}
            className="mt-5 flex h-11 w-[90vw] max-w-md cursor-pointer items-center justify-center rounded-lg bg-[linear-gradient(to_right_top,_rgb(74,_222,_128),_rgb(34,_197,_94),_rgb(74,_222,_128))] text-[15px] font-semibold text-white shadow-md transition hover:bg-green-600"
          >
            + New Entry
          </button>
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your journal entries..."
            className="mt-4 h-8 w-[90vw] max-w-md rounded-md border border-[#ccc] px-2 text-xs"
          />
        </>
      ) : (
        <button
          onClick={() => setModal(true)}
          className="mt-6 flex h-11 w-[90vw] max-w-md cursor-pointer items-center justify-center rounded-lg bg-[linear-gradient(to_right_top,_rgb(74,_222,_128),_rgb(34,_197,_94),_rgb(74,_222,_128))] text-[15px] font-semibold text-white shadow-md transition hover:bg-green-600"
        >
          + Create Your First Entry
        </button>
      )}
    </div>
  );
};

export default EntrySearchButton;
