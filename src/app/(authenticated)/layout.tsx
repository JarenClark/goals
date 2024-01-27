import ProtectedContent from "@/components/ProtectedContent";
import Sidebar from "@/components/Sidebar";
import React from "react";

type Props = { children: React.ReactNode };

function RootLayout({ children }: Props) {
  return (
    <>
      <ProtectedContent>
        <div className="w-screen h-screen flex ">
          <div>
            <Sidebar />
          </div>
          <main className="overflow-y-auto w-screen lg:max-w-[80vw]">
            {children}
          </main>
          {/* <StateHelper /> */}
        </div>
      </ProtectedContent>
    </>
  );
}

export default RootLayout;
