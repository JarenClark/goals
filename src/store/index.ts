import { create } from "zustand";
import {
  createClientComponentClient,
  // createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { devtools } from "zustand/middleware";
import { cookies } from "next/headers";
const supabase = createClientComponentClient();

/**
 * UI of the app
 */
interface UIstate {
  sideNavIsOpen: boolean;
  createModalIsOpen: boolean;
  toggleCreateModal: (arg?: boolean) => void;
  toggleSideNav: (arg?: boolean) => void;
  // closeSideNav?: () => void;
}
const defaultUIstate = {
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
  // closeSideNav: () => {
  //   set(() => ({ sideNavIsOpen: false }));
  // },
}));
/**
 * Notes
 */
interface Note {
  title?: string;
  content?: string;
  userid?: string;
}
interface NoteState {
  notes: Note[];
  note: Note | null;
  setNote: (noteId?: string) => void;
  resetNote: () => void;
}
export const useNotestore = create<NoteState>((set) => ({
  notes: [],
  note: null,
  setNote: async (noteId) => {
    const { data: note } = await supabase
      .from("notes")
      .select("*")
      .eq("id", noteId)
      .single();
    set((state) => ({ note: { ...state.note, ...note } }));
  },
  resetNote: () => {
    console.log("resetting note");
    set(() => ({ note: null }));
  },
}));

/****
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export type Document = {
  id?: string;
  title?: string;
  type?: "AOR" | "PA" | "Custom";
  year?: Date;
  start_date?: Date | null;
  endDate?: Date | null;
  paymentSplit?: number;
  rest?: {
    endDate?: Date | null;
    paymentSplit?: number | string | null;
  };
};

export type PaymentSchedule = {
  start: Date | null;
  end?: Date | null;
  count: number | null;
};

interface DocumentsState {
  documents?: Document[];
  addDocument?: (doc: Document) => void;
  docMenuIsOpen: boolean;
  setDocMenuIsOpen: (arg: boolean) => void;
  document: Document;
  setDocument: (id: string) => void;
  docPaymentSchedule: PaymentSchedule;
  setDocPaymentSchedule: (args: PaymentSchedule) => void;
  updateDoc: (args: any) => void;
  // update doc settings
  // update doc content
}
const defaultDocStoreState = {
  documents: [],
  document: {},
  docMenuIsOpen: false,
  docPaymentSchedule: {
    start: null,
    end: null,
    count: null,
  },
};
export const useDocumentStore = create<DocumentsState>()((set) => ({
  ...defaultDocStoreState,
  // UI stuff
  setDocMenuIsOpen: (arg) => {
    set(() => ({ docMenuIsOpen: arg }));
  },
  // DATA stuff
  setDocument: async (id: string) => {
    const { data: doc } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();
    set((state) => ({ document: { ...state.document, ...doc } }));
  },
  setDocPaymentSchedule: ({ ...args }) => {
    set((state) => ({
      docPaymentSchedule: { ...state.docPaymentSchedule, args },
    }));
  },
  updateDoc: ({ ...args }) => {
    // push to supabase here

    set((state) => ({
      document: { ...state.document, args },
    }));
  },
}));
