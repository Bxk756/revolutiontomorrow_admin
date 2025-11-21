import React from "react";
import BillingButton from "./BillingButton";

export default function NavbarAdmin() {
  return (
    <nav className="w-full border-b border-gray-800 bg-[#0D121F]/80 backdrop-blur-md py-4 px-6 flex justify-between items-center">
      <div className="text-xl font-bold tracking-tight">
        Revolution Tomorrow • Admin
      </div>

      <div className="flex gap-4 items-center">
        <BillingButton />
      </div>
    </nav>
  );
}
