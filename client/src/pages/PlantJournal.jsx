import { useState, useRef, useEffect } from 'react';
import JournalModal from '../components/JournalComponents/JournalModal';
import authStore from '../store/authStore';
import axios from 'axios';
import JournalCard from '../components/JournalComponents/JournalCard';
import EntrySearchButton from '../components/JournalComponents/EntrySearchButton';
import JournalEntries from '../components/JournalComponents/JournalEntries';
import journalStore from '../store/journalStore';

const PlantJournal = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [viewJournalModal, setViewJournalModal] = useState(false);
  const removeJournalById = journalStore((state) => state.removeJournalById);
  const addJournal = journalStore((state) => state.addJournal);
  const setJournals = journalStore((state) => state.setJournals);
  const journals = journalStore((state) => state.journals);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const fileInputRef = useRef();

  useEffect(() => {
    const shouldLockScroll = viewJournalModal || showConfirmModal || modal;

    if (shouldLockScroll) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [viewJournalModal, showConfirmModal, modal]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImageFile(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setViewJournalModal(false);
    setModal(false);
    setTitle('');
    setNotes('');
    setImage(null);
  };

  const handleDelete = async (id) => {
    setShowConfirmModal(false);
    try {
      const token = authStore.getState().token;

      await axios.delete(`http://localhost:3000/api/journals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      removeJournalById(id);
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY;

  async function uploadImage(file) {
    const response = await axios.post('http://localhost:3000/api/image-upload');
    const { signature, timestamp } = response.data;

    const form = new FormData();
    form.append('file', file);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      form,
      {
        params: {
          api_key: API_KEY,
          timestamp,
          signature,
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (res.status !== 200) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return res.data.secure_url;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }
      const token = authStore.getState().token;

      const response = await axios.post(
        'http://localhost:3000/api/journals',
        {
          title,
          notes,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const newJournal = response.data;

      addJournal(newJournal);
      setModal(false);
      setTitle('');
      setNotes('');
      setImage(null);
    } catch (err) {
      console.error('Submission failed', err);
    }
  };

  useEffect(() => {
    const fetchJournals = async () => {
      if (!isAuthenticated) return;
      const token = authStore.getState().token;
      try {
        const res = await axios.get('http://localhost:3000/api/journals', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJournals(res.data);
      } catch (err) {
        console.error('Failed to fetch journals', err);
      }
    };

    fetchJournals();
  }, [setJournals, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="mt-10 flex flex-col items-center text-center font-[Inter] text-xl font-semibold">
        Please log in to view your Plant Journal.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mt-10 text-center font-[Inter] text-2xl font-bold">
        Plant Journal
      </div>
      <div className="text-md mt-2 w-[80vw] text-[#737373]">
        Document every step of your plant care journey to see your plants
        flourish and bloom
      </div>
      <div>
        <EntrySearchButton setModal={setModal} />

        {modal && (
          <JournalModal
            title={title}
            setTitle={setTitle}
            notes={notes}
            setNotes={setNotes}
            image={image}
            handleFileChange={handleFileChange}
            handleRemove={handleRemove}
            handleCancel={handleCancel}
            handleSubmit={handleSubmit}
            fileInputRef={fileInputRef}
          />
        )}
      </div>

      {journals && journals.length > 0 ? (
        <JournalEntries
          modalControls={{
            setSelectedJournal,
            setViewJournalModal,
            setShowConfirmModal,
            showConfirmModal,
            viewJournalModal,
            selectedJournal,
            handleCancel,
            handleDelete,
          }}
        />
      ) : (
        <JournalCard />
      )}
    </div>
  );
};

export default PlantJournal;
