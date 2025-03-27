import React from "react";
import Footer from "~/components/website/footer";
import Navbar from "~/components/website/navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default RootLayout;
