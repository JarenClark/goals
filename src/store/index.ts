export * from "./use-collection-store";
export * from "./use-item-store";
export * from "./use-ui-store";
export * from "./use-space-store";

import { create } from "zustand";
//import { mountStoreDevtool } from 'simple-zustand-devtools';

import {
  createClientComponentClient,
  // createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { devtools } from "zustand/middleware";
// import { cookies } from "next/headers";
const supabase = createClientComponentClient();

/**
 * User info
 *
 */
interface authState {
  userId: string | null;
  setUserId: (id?: string) => void;
}
export const useAuthStore = create<authState>((set) => ({
  userId: null,
  setUserId: (id) => {
    if (id) {
      set(() => ({ userId: id }));
    } else {
      set(() => ({ userId: null }));
    }
  },
}));
