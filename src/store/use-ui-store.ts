import { create } from "zustand";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();


/**
 * UI of the app
 */
interface BreadCrumb {
    link: string;
    title: string;
  }
  interface UIstate {
    breadcrumbs: BreadCrumb[];
    sideNavIsOpen: boolean;
    createModalIsOpen: boolean;
    toggleCreateModal: (arg?: boolean) => void;
    toggleSideNav: (arg?: boolean) => void;
    closeSideNav: () => void;
openSideNav: () => void  
}
  const defaultUIstate = {
    breadcrumbs: [],
    sideNavIsOpen: false,
    createModalIsOpen: false,
  };
  export const useUIstore = create<UIstate>((set) => ({
    ...defaultUIstate,
    toggleSideNav: (arg) => {
      if (arg) {
        set(() => ({ sideNavIsOpen: arg }));
      } else {
        set((state) => ({ sideNavIsOpen: !state.sideNavIsOpen }));
      }
    },
  
    toggleCreateModal: (arg) => {
      if (arg) {
        set(() => ({ createModalIsOpen: arg }));
      } else {
        set((state) => ({ createModalIsOpen: !state.createModalIsOpen }));
      }
    },
    closeSideNav: () => {
      set(() => ({ sideNavIsOpen: false }));
    },
    openSideNav: () => {
        set(() => ({ sideNavIsOpen: true }));
      },
  }));