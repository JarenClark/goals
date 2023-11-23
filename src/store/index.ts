import { create } from "zustand";
import {
  createClientComponentClient,
  // createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const supabase = createClientComponentClient();
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
