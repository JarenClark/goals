import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";
import ProtectedContent from "@/components/ProtectedContent";
import Sidebar from "@/components/Sidebar";
import DeleteItemModal from "@/components/modals/DeleteItemModal";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <>
      <ProtectedContent>
        <div className="min-h-screen flex flex-col justify-between">
          <div className="w-screen h-screen flex ">
            <div className="hidden xl:block">
              <Sidebar />
            </div>
            <div className="  w-full">
              <div className="block">
                <Header />
              </div>
              <main className="overflow-y-auto  w-full">{children}</main>{" "}
            </div>
            {/* <StateHelper /> */}
          </div>
          <Footer />
        </div>
        {/* Our Modals */}
        <DeleteItemModal />
      </ProtectedContent>
    </>
  );
}

export default RootLayout;
