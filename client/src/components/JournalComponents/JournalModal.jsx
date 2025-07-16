import ImagePreview from './ImagePreview';

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
      className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[3px]"
      aria-modal="true"
      role="dialog"
    >
      <div className="h-140 w-[85vw] max-w-xl rounded-xl bg-white p-4 shadow-lg md:max-h-[60vh]">
        <p className="flex-start flex border-b border-b-[#eee] pb-2 font-medium">
          New Journal Entry
        </p>
        <form onSubmit={handleSubmit}>
          <p className="mt-5 flex text-sm font-medium">Entry Title</p>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1.5 flex w-full rounded-sm border border-[#ddd] px-2 py-1.5 text-sm"
            required
          />

          <p className="mt-5 flex text-sm font-medium">Capture your plants</p>
          <ImagePreview
            image={image}
            handleRemove={handleRemove}
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
          />

          <p className="flex pt-5 text-sm font-medium">Notes & Observations</p>
          <textarea
            placeholder="Record your plant’s progress, care tips, or personal notes here."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1.5 flex h-28 w-full rounded-sm border border-[#ddd] px-2 py-1.5 text-xs"
            required
          />

          <div className="mt-6 flex flex-row justify-center gap-2">
            <button
              type="submit"
              className="w-50 cursor-pointer rounded-md bg-[linear-gradient(to_right_top,_rgb(74,_222,_128),_rgb(34,_197,_94),_rgb(74,_222,_128))] text-white"
            >
              Save Entry
            </button>
            <button
              type="button"
              className="h-8 w-50 cursor-pointer rounded-md border border-[#ddd]"
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
