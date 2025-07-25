import { useState, useRef } from 'react';
import axios from 'axios';
import authStore from '../store/authStore';

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
    } catch (err) {
      console.error(err);
      alert('Failed to identify plant');
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
        <div className="mx-auto mt-10 h-60 w-[90vw] rounded-md border border-[#ddd] shadow-sm">
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
      <div className="mx-auto mt-10 h-60 w-[90vw] rounded-md border border-[#ddd] shadow-sm"></div>
    </div>
  );
};

export default IdentifyPlant;
