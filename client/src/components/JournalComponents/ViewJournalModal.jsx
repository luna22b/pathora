import {
  CloseButton,
  Calendar,
  EditButton,
  SaveButton,
  UndoButton,
} from '../../assets/Images';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import authStore from '../../store/authStore';
import journalStore from '../../store/journalStore';

const ViewJournalModal = ({
  isOpen,
  handleCancel,
  journal: initialJournal,
}) => {
  if (!isOpen || !initialJournal) return null;

  const token = authStore((state) => state.token);
  const journals = journalStore((state) => state.journals);
  const setJournals = journalStore((state) => state.setJournals);

  const currentJournal = journals.find((j) => j.id === initialJournal.id);
  if (!currentJournal) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(currentJournal.title);
  const [editedNotes, setEditedNotes] = useState(currentJournal.notes);
  const [editedImageFile, setEditedImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    currentJournal.image_url || ''
  );
  const [imageError, setImageError] = useState(false);
  const [showImageInput, setShowImageInput] = useState(
    !currentJournal.image_url
  );

  const resetEditFields = useCallback(() => {
    setEditedTitle(currentJournal.title);
    setEditedNotes(currentJournal.notes);
    setEditedImageFile(null);
    setPreviewImage(currentJournal.image_url || '');
    setImageError(false);
    setShowImageInput(!currentJournal.image_url);
  }, [currentJournal]);

  useEffect(() => {
    resetEditFields();
  }, [currentJournal, resetEditFields]);

  const handleUndoEdit = () => {
    resetEditFields();
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditedImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setImageError(false);
      setShowImageInput(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setPreviewImage('');
    setShowImageInput(true);
  };

  const handleRemoveImage = () => {
    setEditedImageFile(null);
    setPreviewImage('');
    setImageError(false);
    setShowImageInput(true);
  };

  const uploadImage = async (file) => {
    const { data } = await axios.post('http://localhost:3000/api/image-upload');
    const { signature, timestamp } = data;
    const formData = new FormData();
    formData.append('file', file);

    const cloudinaryRes = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData,
      {
        params: {
          api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
          timestamp,
          signature,
        },
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );

    return cloudinaryRes.data.secure_url;
  };

  const handleSave = async () => {
    if (!editedTitle.trim() || !editedNotes.trim()) return;

    let imageUrl = previewImage;

    if (editedImageFile) {
      try {
        imageUrl = await uploadImage(editedImageFile);
      } catch {
        return;
      }
    }

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/journals/${currentJournal.id}`,
        { title: editedTitle, notes: editedNotes, image: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedJournal = response.data;
      setJournals(
        journals.map((j) => (j.id === updatedJournal.id ? updatedJournal : j))
      );
      setIsEditing(false);
      resetEditFields();
      setShowImageInput(!updatedJournal.image_url);
    } catch {}
  };

  const saveDisabled = !editedTitle.trim() || !editedNotes.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/15 backdrop-blur-[1px]">
      <div className="h-135 w-[90vw] max-w-4xl overflow-auto rounded-lg bg-white p-4 shadow-lg md:h-150">
        <div className="mt-2 border-b border-b-[#ccc] pb-3 text-start font-semibold break-words">
          <div className="flex flex-row items-center justify-between">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className={`w-full rounded border px-2 py-1 text-sm font-semibold ${
                    saveDisabled ? 'border-red-500' : ''
                  }`}
                  placeholder={saveDisabled ? 'Please enter a title' : ''}
                />
              ) : (
                currentJournal.title
              )}
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <UndoButton
                    className="w-8 cursor-pointer text-[#737373]"
                    onClick={handleUndoEdit}
                  />
                  <SaveButton
                    className={`w-8 cursor-pointer text-[#737373] ${
                      saveDisabled ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                    onClick={handleSave}
                    disabled={saveDisabled}
                  />
                </>
              ) : (
                <EditButton
                  className="w-8 cursor-pointer text-[#737373]"
                  onClick={() => setIsEditing(true)}
                />
              )}
              <CloseButton
                className="w-8 cursor-pointer text-[#737373]"
                onClick={handleCancel}
              />
            </div>
          </div>
          <div className="mt-1 flex flex-row text-sm font-normal text-[#737373]">
            <Calendar className="mr-1 w-3.5 text-gray-600" />
            {new Date(currentJournal.created_at).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
        <div className="mt-3 text-start">Notes & Observations</div>
        <div className="mt-2 rounded-lg bg-gray-100">
          <div className="p-4 text-start text-sm leading-6 break-words">
            {isEditing ? (
              <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                className={`h-32 w-full resize-none rounded border bg-white px-2 py-1 ${
                  editedNotes.trim() === '' && isEditing ? 'border-red-500' : ''
                }`}
                placeholder={
                  editedNotes.trim() === '' && isEditing
                    ? 'Please enter some notes...'
                    : ''
                }
              />
            ) : (
              currentJournal.notes
            )}
          </div>
        </div>

        {previewImage && previewImage.trim() !== '' && !imageError ? (
          <>
            <div className="mt-3 text-start">Image</div>
            <div className="relative mt-2 w-full max-w-[240px]">
              <img
                src={previewImage}
                alt={currentJournal.title || 'Journal Image'}
                onError={handleImageError}
                className="max-h-[240px] w-full rounded object-cover"
                style={{ border: '2px solid red' }}
              />
              {isEditing && (
                <CloseButton
                  className="absolute top-1 right-1 h-6 w-6 cursor-pointer rounded-full bg-white p-1 text-red-500"
                  onClick={handleRemoveImage}
                />
              )}
            </div>
          </>
        ) : (
          <div className="mt-3 text-start text-gray-500">
            {currentJournal.image_url && imageError && isEditing
              ? 'Current image missing or broken.'
              : ''}
            {!isEditing &&
              (!currentJournal.image_url ||
                currentJournal.image_url.trim() === '' ||
                imageError) &&
              'No image available.'}
          </div>
        )}

        {isEditing && showImageInput && (
          <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <label
              htmlFor="image-upload"
              className="mb-2 block cursor-pointer text-sm font-medium text-gray-700"
            >
              Add an image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewJournalModal;
