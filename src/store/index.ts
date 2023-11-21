import { create } from "zustand";

export type Document = {
  id: string;
  title: string;
  type: "AOR" | "PA" | "Custom";
  year: Date;
};

interface DocumentsState {
  documents?: Document[];
  addDocument?: (doc: Document) => void;
  docMenuIsOpen: boolean;
  setDocMenuIsOpen: (arg: boolean) => void;
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
  docMenuIsOpen: false,
  setDocMenuIsOpen: (arg) => {
    set(() => ({ docMenuIsOpen: arg }));
  },
}));

// interface UserState {
//   id: string | null;
//   name: string | null;
// }

// interface DocumentState {
//   document: Document;
// }
