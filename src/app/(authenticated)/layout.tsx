import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MainMenu from "@/components/MainMenu";
import ProtectedContent from "@/components/ProtectedContent";
import Sidebar from "@/components/Sidebar";
import React from "react";

type Props = { children: React.ReactNode };

function RootLayout({ children }: Props) {
  return (
    <>
      <ProtectedContent>
        <div className="min-h-screen flex flex-col justify-between">

        <div className="w-screen h-screen flex ">
          <div className="hidden xl:block">
            <Sidebar />
          </div>
          <div className="  w-screen xl:max-w-[80vw]">
            <div className="block xl:hidden">
              <Header />
            </div>
            <main className="overflow-y-auto  w-screen xl:max-w-[80vw]">
              {children}
            </main>{" "}
          </div>
          {/* <StateHelper /> */}
        </div>
        <Footer />            
        </div>
      </ProtectedContent>
    </>
  );
}

export default RootLayout;
