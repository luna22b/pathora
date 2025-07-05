import ImagePreview from "./ImagePreview";

const JournalModal = ({
  title,
  setTitle,
  notes,
  setNotes,
  image,
  handleFileChange,
  handleRemove,
  handleCancel,
  handleSubmit,
  fileInputRef,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-[3px] flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white h-140 w-[85vw] rounded-xl shadow-lg p-4 max-w-xl md:max-h-[60vh]">
        <p className="flex flex-start font-medium border-b border-b-[#eee] pb-2">
          New Journal Entry
        </p>
        <form onSubmit={handleSubmit}>
          <p className="flex text-sm mt-5 font-medium">Entry Title</p>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex text-sm mt-1.5 border border-[#ddd] w-full px-2 py-1.5 rounded-sm"
            required
          />

          <p className="flex text-sm mt-5 font-medium">Capture your plants</p>
          <ImagePreview
            image={image}
            handleRemove={handleRemove}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />

          <p className="flex text-sm font-medium pt-5">Notes & Observations</p>
          <textarea
            placeholder="Record your plant’s progress, care tips, or personal notes here."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="flex text-xs mt-1.5 border border-[#ddd] w-full px-2 py-1.5 h-28 rounded-sm"
            required
          />

          <div className="mt-6 flex flex-row gap-2 justify-center">
            <button
              type="submit"
              className="bg-green-400 rounded-sm text-white w-50"
            >
              Save Entry
            </button>
            <button
              type="button"
              className="border border-[#ddd] rounded-sm w-50 h-8"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalModal;
