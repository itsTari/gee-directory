import Link from "next/link";
import React from "react";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const Navbar = async () => {
  const session = await auth();
  return (
    <div className="px-5 py-3 bg-white shadow-sm -font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <img src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5  text-black">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="text-[#EE2B69] max-sm:hidden">Create</span>
                <span><BadgePlus className="size-6 sm:hidden"/></span>
              </Link>
              <button
                onClick={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <span className="max-sm:hidden">LogOut</span>
                <span><LogOut className="size-6 sm:hidden"/></span>
              </button>
              <Link href={`/user/${session?.user?.id}`}>
                <Avatar className="size-10">
                    <AvatarImage src={session?.user.image || ''} alt={session?.user.name || ''} className=""/>
                    <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <span>LogIn</span>
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
