import { create } from 'zustand';

const journalStore = create((set) => ({
  journals: [],
  title: '',
  notes: '',
  imageUrl: '',
  setJournals: (newJournals) => set({ journals: newJournals }),
  removeJournalById: (id) =>
    set((state) => ({
      journals: state.journals.filter((journal) => journal.id !== id),
    })),
  addJournal: (newJournal) =>
    set((state) => ({
      journals: [newJournal, ...state.journals],
    })),

  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default journalStore;
