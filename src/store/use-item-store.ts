import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

interface Item {
  id: string;
  title: string;
  collection_id: string;
}
interface ItemState {
  items: Item[] | null;
  item: Item | null;
  childItems: Item[] | null;
  setChildItems: (id: string) => void;
  setItems: (collectionId?: string) => void;
  setItem: (id: string) => void;
  clearItem: () => void;
  createModalIsOpen: boolean;
  setCreateModalIsOpen: (arg?: boolean) => void;
  deleteModalIsOpen: boolean;
  setDeleteModalIsOpen: (arg?: boolean) => void;
}
export const useItemStore = create<ItemState>((set, get) => ({
  items: null,
  item: null,
  childItems: null,
  setItem: async (id) => {
    if (id == undefined) return null;
    // const oldItem = get().item;
    // console.log(`oldItem is,${JSON.stringify(oldItem, null, 2)}`);
    // if (oldItem?.id == id) {
    //   console.log("duplicate item");
    //   set(() => ({ item: oldItem }));

    //   return null;
    // } 

    const { data: newItem } = await supabase
      .from("_items")
      .select("*")
      .eq("id", id)
      .single();

    set(() => ({ item: newItem }));
  },
  setItems: async (collectionId) => {
    let query = supabase.from("_items").select("*");

    if (collectionId) {
      query = query.eq("collection_id", collectionId);
    }

    const { data: items, error } = await query;

    if (error) {
      // Handle error
      console.error("Error fetching items:", error.message);
      return;
    }

    set(() => ({ items: items }));
  },
  setChildItems: async (id) => {
    const { data: items } = await supabase
      .from("_items")
      .select("*")
      .eq("parent_item", id);
    set(() => ({ childItems: items }));
  },
  clearItem: () => set(() => ({ item: null })),
  deleteModalIsOpen: false,
  setDeleteModalIsOpen: (arg) => {
    if (arg) {
      set(() => ({ deleteModalIsOpen: arg }));
    } else {
      set((state) => ({ deleteModalIsOpen: !state.deleteModalIsOpen }));
    }
  },
  createModalIsOpen: false,
  setCreateModalIsOpen: (arg) => {
    if (arg) {
      set(() => ({ createModalIsOpen: arg }));
    } else {
      set((state) => ({ createModalIsOpen: !state.createModalIsOpen }));
    }
  },
}));
