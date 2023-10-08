import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SelectedItem {
  selectedItem: object;
  tierGroup: Array<number>;
  setSelected: (selectedItem: object, tierGroup: Array<number>) => void;
}

export const useSelectedStore = create(
  persist<SelectedItem>(
    (set, get) => ({
      selectedItem: {},
      tierGroup: [],
      setSelected: (si: object, tg: Array<number>) => {
        set({ selectedItem: si, tierGroup: tg });
      }
    }),
    {
      name: 'cache', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
)
