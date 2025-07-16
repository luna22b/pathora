import { TrashIcon } from '../../assets/Images';

const DeleteModal = ({ isOpen, handleCancel, handleDelete, id }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/1 backdrop-blur-[1px]">
      <div className="h-55 w-[80vw] max-w-sm rounded-xl bg-white p-4 shadow-lg">
        <div className="mx-auto mt-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <TrashIcon className="h-6 w-10 text-red-500" />
        </div>
        <div className="mt-3 font-medium">Delete</div>
        <div className="mt-2 text-sm text-[#374151]">
          Are you sure you would like to delete this entry?
        </div>
        <div className="mt-5 flex justify-center gap-2">
          <button
            className="h-7.5 w-30 cursor-pointer rounded-lg border border-[#ddd] text-sm font-semibold"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="h-7.5 w-30 cursor-pointer rounded-lg bg-red-600 text-sm font-semibold text-white"
            onClick={() => handleDelete(id)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
