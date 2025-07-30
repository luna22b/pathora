import { useState, useRef } from 'react';
import axios from 'axios';
import authStore from '../store/authStore';
import { LeafLogo } from '../assets/Images';

const IdentifyPlant = () => {
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const token = authStore((state) => state.token);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleIdentify = async () => {
    if (!preview) {
      alert('Please select an image first');
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:3000/api/identify',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResult(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[Inter]">
      <div className="mt-10 flex justify-center text-2xl font-bold">
        Plant Identifier
      </div>
      <div className="text-md mx-auto mt-2 w-[80vw] text-center text-[#737373]">
        Upload a photo of any plant and our AI will identify it for you with
        detailed information
      </div>
      <div>
        <div className="mx-auto mt-10 h-80 w-[90vw] rounded-md border border-[#ddd] shadow-sm">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {preview && (
            <img
              src={preview}
              alt="image preview"
              className="mx-auto mt-4 w-30"
            />
          )}
          <button
            onClick={handleIdentify}
            disabled={loading}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white"
          >
            {loading ? 'Identifying...' : 'Identify Plant'}
          </button>
        </div>
      </div>

      <div className="mx-auto mt-10 mb-25 h-80 w-[90vw] rounded-md border border-[#ddd] shadow-sm">
        <div className="mx-auto mt-2 items-center rounded text-center">
          {result ? (
            <>
              <div>{result.results[0].species.commonNames[0]}</div>
              <div className="border-b border-b-[#eee] pb-2 text-sm text-gray-500">
                {result.results[0].species.scientificName}
                <div className="mt-2 flex justify-center gap-2 text-black">
                  <LeafLogo />
                  {(result.results[0].score * 100).toFixed(2)}%
                </div>
              </div>

              <p className="mt-4 text-sm">Other possible matches</p>

              <div className="mx-auto mt-5 h-17 w-[85vw] rounded-md bg-gray-100 p-1 pl-2 text-start text-sm">
                <div>{result.results[1].species.commonNames[0]}</div>
                <div className="text-xs text-gray-500 italic">
                  {result.results[1].species.scientificName}
                </div>
                <div className="mt-1 w-fit rounded bg-green-300 px-2 text-center text-xs">
                  {(result.results[1].score * 100).toFixed(2)}%
                </div>
              </div>

              <div className="mx-auto mt-2 h-17 w-[85vw] rounded-md bg-gray-100 p-1 pl-2 text-start text-sm">
                <div>{result.results[2].species.commonNames[0]}</div>
                <div className="text-xs text-gray-500 italic">
                  {result.results[2].species.scientificName}
                </div>
                <div className="mt-1 w-fit rounded bg-green-300 px-2 text-center text-xs">
                  {(result.results[2].score * 100).toFixed(2)}%
                </div>
              </div>
            </>
          ) : (
            <div className="mt-10 text-center text-gray-400">
              <p className="text-md font-medium">No plant identified yet.</p>
              <p className="text-sm">Upload a photo above to get started 🌿</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdentifyPlant;
