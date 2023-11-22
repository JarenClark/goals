import { create } from "zustand";

export type Document = {
  id: string;
  title: string;
  type: "AOR" | "PA" | "Custom";
  year: Date;
};

export type PaymentSchedule = {
  start: Date | null;
  end?: Date | null;
  count: number | null;
}

interface DocumentsState {
  documents?: Document[];
  addDocument?: (doc: Document) => void;
  docMenuIsOpen: boolean;
  setDocMenuIsOpen: (arg: boolean) => void;
  docPaymentSchedule: PaymentSchedule;
  setDocPaymentSchedule: (args: PaymentSchedule) => void;
}

export const useStore = create<DocumentsState>()((set) => ({
  // documents: [
  //   {
  //     id: "abc123",
  //     title: "Document Number One ",
  //     type: "AOR",
  //     year: new Date(),
  //   },
  //   {
  //     id: "xyz789",
  //     title: "Document Number Two ",
  //     type: "AOR",
  //     year: new Date(),
  //   },
  // ],
  // addDocument: (doc) => {
  //   console.log("adding doc", doc);
  //   set((state) => ({ documents: [...state.documents, doc] }));
  // },
  // UI stuff
  docMenuIsOpen: false,
  setDocMenuIsOpen: (arg) => {
    set(() => ({ docMenuIsOpen: arg }));
  },
  // DATA stuff
  docPaymentSchedule: {
    start: null,
    end: null,
    count: null,
  },
  setDocPaymentSchedule: ({ ...args }) => {
    set((state) => ({
      docPaymentSchedule: { ...state.docPaymentSchedule, args },
    }));
  },
}));

// interface UserState {
//   id: string | null;
//   name: string | null;
// }

// interface DocumentState {
//   document: Document;
// }
