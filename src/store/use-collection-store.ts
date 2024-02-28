import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

interface Collection {
  id: string;
  name: string;
}
interface CollectionState {
  collections: Collection[] | null;
  collection: Collection | null;
  setCollections: () => void;
  setCollection: (id: string) => void;
  clearCollection: () => void;
  createCollectionModalIsOpen: boolean;
  setCreateModalIsOpen: (arg?: boolean) => void;
  deleteCollectionModalIsOpen: boolean;
  setDeleteModalIsOpen: (arg?: boolean) => void;
}
export const useCollectionStore = create<CollectionState>((set) => ({
  collections: null,
  collection: null,
  setCollection: async (id) => {
    const { data: collection } = await supabase
      .from("_collections")
      .select("*")
      .eq("id", id)
      .single();
    set(() => ({ collection: collection }));
  },
  setCollections: async () => {
    const { data: collections } = await supabase
      .from("_collections")
      .select("*");
    console.log("setting collections");
    set(() => ({ collections: collections }));
  },
  clearCollection: () => set(() => ({ collection: null })),
  deleteCollectionModalIsOpen: false,
  setDeleteModalIsOpen: (arg) => {
    if (arg) {
      set(() => ({ deleteCollectionModalIsOpen: arg }));
    } else {
      set((state) => ({
        deleteCollectionModalIsOpen: !state.deleteCollectionModalIsOpen,
      }));
    }
  },
  createCollectionModalIsOpen: false,
  setCreateModalIsOpen: (arg) => {
    if (arg) {
      set(() => ({ createCollectionModalIsOpen: arg }));
    } else {
      set((state) => ({
        createCollectionModalIsOpen: !state.createCollectionModalIsOpen,
      }));
    }
  },
}));
