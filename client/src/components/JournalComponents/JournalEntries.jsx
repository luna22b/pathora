import { TrashIcon, Calendar, ArrowRight } from '../../assets/Images';
import ViewJournalModal from './ViewJournalModal';
import DeleteModal from './DeleteModal';
import journalStore from '../../store/journalStore';

const JournalEntries = ({
  modalControls: {
    setSelectedJournal,
    setViewJournalModal,
    setShowConfirmModal,
    viewJournalModal,
    selectedJournal,
    handleCancel,
    handleDelete,
    showConfirmModal,
    onUpdate,
  },
}) => {
  const journals = journalStore((state) => state.journals);
  const searchQuery = journalStore((state) => state.searchQuery);

  return (
    <div>
      <div>
        {journals
          .filter((item) =>
            `${item.title} ${item.notes}`
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
          .map((item) => (
            <div
              key={item.id}
              className="group mt-8 h-50 w-[90vw] max-w-6xl cursor-pointer rounded-md border-1 border-[#d7e7d7] shadow hover:shadow-md"
              onClick={() => {
                setSelectedJournal(item);
                setViewJournalModal(true);
              }}
            >
              <div className="flex w-full items-start justify-between p-5 pr-5 pb-0 font-medium">
                <div className="flex-start flex min-w-0 truncate pr-4">
                  {item.title}
                </div>
                <button
                  className="invisible flex-shrink-0 transition-opacity duration-200 group-hover:visible"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowConfirmModal(true);
                    setSelectedJournal(item);
                  }}
                >
                  <TrashIcon className="h-4 w-4 cursor-pointer text-red-500" />
                </button>
              </div>

              <div className="mt-2 flex flex-row p-5 pt-0 pb-0 text-start text-sm text-[#6b7280]">
                <Calendar className="mr-1 w-3.5 text-gray-600" />
                {new Date(item.created_at).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>

              <div className="mt-4 line-clamp-3 p-5 pt-0 pr-5 pb-0 text-start text-sm text-[#374151] lg:text-base">
                <div className="break-words">{item.notes}</div>
              </div>

              <div className="mt-2 flex flex-row items-center p-5 pt-0 pr-5 pb-0 text-xs text-[#6b7280]">
                Click to view full entry
                <ArrowRight className="ml-1 h-4 w-4 text-[#6b7280]" />
              </div>
            </div>
          ))}
        <ViewJournalModal
          isOpen={viewJournalModal}
          handleCancel={handleCancel}
          journal={selectedJournal}
        />

        <DeleteModal
          isOpen={showConfirmModal}
          handleCancel={handleCancel}
          handleDelete={() => handleDelete(selectedJournal?.id)}
        />
      </div>
    </div>
  );
};

export default JournalEntries;
