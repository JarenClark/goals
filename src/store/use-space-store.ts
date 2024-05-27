import { create } from "zustand";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

interface Space {
  id: string;
  name: string;
  organizationId: string;
}
interface SpaceState {
  spaces: Space[] | null;
  space: Space | null;
  setSpaces: () => void;
  setSpace: (id: string) => void;
  clearSpace: () => void;
  createSpaceModalIsOpen: boolean;
  setCreateModalIsOpen: (arg?: boolean) => void;
  deleteSpaceModalIsOpen: boolean;
  setDeleteModalIsOpen: (arg?: boolean) => void;
}
export const useSpaceStore = create<SpaceState>((set) => ({
  spaces: null,
  space: null,
  setSpace: async (id) => {
    const { data: space } = await supabase
      .from("_organizations")
      .select("*")
      .eq("id", id)
      .single();
    set(() => ({ space: space }));
  },
  setSpaces: async () => {
    const { data: spaces } = await supabase
      .from("_organizations")
      .select("*");
    console.log("setting spaces");
    set(() => ({ spaces: spaces }));
  },
  clearSpace: () => set(() => ({ space: null })),
  deleteSpaceModalIsOpen: false,
  setDeleteModalIsOpen: (arg) => {
    if (arg) {
      set(() => ({ deleteSpaceModalIsOpen: arg }));
    } else {
      set((state) => ({
        deleteSpaceModalIsOpen: !state.deleteSpaceModalIsOpen,
      }));
    }
  },
  createSpaceModalIsOpen: false,
  setCreateModalIsOpen: (arg) => {
    if (arg) {
      set(() => ({ createSpaceModalIsOpen: arg }));
    } else {
      set((state) => ({
        createSpaceModalIsOpen: !state.createSpaceModalIsOpen,
      }));
    }
  },
}));
