import React from "react";
import { useAppStore } from "../components/appStore";

export default function Home() {
  const updateOpen = useAppStore((state) => state.updateOpen);
  const open = useAppStore((state) => state.dopen);
  return (
    <>
      <div className="flex bg-slate-100 h-screen">
        <div className={`m-7 w-screen  ${open ? "ml-64" : "ml-24"} `}>
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
      </div>
    </>
  );
}
