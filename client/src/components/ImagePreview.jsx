import { Camera } from "../assets/Images";

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
          className="flex text-sm cursor-pointer border border-dashed border-[#ccc] rounded-sm mt-1.5 h-32 justify-center items-center gap-2"
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
        <div className="relative inline-block w-32 h-32 pt-1">
          <img
            alt="preview-image"
            src={image}
            className="w-32 h-32 mx-auto mt-2"
          />
          <button
            className="absolute top-0.5 left-28 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-700"
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
