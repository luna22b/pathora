import { Camera } from '../../assets/Images';

const ImagePreview = ({
  image,
  handleRemove,
  handleFileChange,
  fileInputRef,
}) => {
  return (
    <div>
      {!image && (
        <label
          htmlFor="file-upload"
          className="mt-1.5 flex h-32 cursor-pointer items-center justify-center gap-2 rounded-sm border border-dashed border-[#ccc] text-sm"
        >
          <Camera /> Upload Photos
        </label>
      )}

      <input
        ref={fileInputRef}
        id="file-upload"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {image && (
        <div className="relative inline-block h-32 w-32 pt-1">
          <img
            alt="preview-image"
            src={image}
            className="mx-auto mt-2 h-32 w-32"
          />
          <button
            className="absolute top-0.5 left-28 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-sm text-white hover:bg-red-700"
            onClick={handleRemove}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
