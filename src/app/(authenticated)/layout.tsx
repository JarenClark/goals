import Footer from "@/components/Footer";
//import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";
import ProtectedContent from "@/components/ProtectedContent";
import Sidebar from "@/components/Sidebar";
import DeleteItemModal from "@/components/modals/DeleteItemModal";
import React from "react";

type Props = {
  params: any;
  children: React.ReactNode;
};

function RootLayout({ children, params }: Props) {
  return (
    <>
      <ProtectedContent>
        <div className="min-h-screen flex flex-col justify-between">
          <div className="fixed top-0 left-0 w-screen bg-background z-10">
            {/* <Header params={params} {...params} /> */}
          </div>
          <div className="w-screen h-screen flex ">
            <div className="hidden xl:block">
              <Sidebar params={params}/>
            </div>
            <div className=" w-full">
              <main className="overflow-y-auto  w-full">
                {children}
                </main>
            </div>
            {/* <StateHelper /> */}
          </div>
          <Footer />
        </div>
        {/* Our Modals */}
        <DeleteItemModal />
        {/* End Our Modals */}
      </ProtectedContent>
    </>
  );
}

export default RootLayout;
