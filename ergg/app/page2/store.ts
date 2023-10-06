import { create } from 'zustand'
  
export const useStore = create(() => ({
    selectedItem: {},
    tierGroup : []
  }))
  