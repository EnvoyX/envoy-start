import Link from "next/link";
import { auth, signIn, signOut } from "../app/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
  const session = await auth();
  return (
    <div
      suppressHydrationWarning
      className="px-5 py-3 bg-white shadow-md font-work-sans text-black"
    >
      <nav className="flex justify-between items-center">
        <Link href={`/`}>
          <span className="text-xl font-bold text-black antialiased">
            Envoy
          </span>
          <span className="text-xl font-bold text-teal-500 antialiased">
            Start
          </span>
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden ">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                  <span className="max-sm:hidden ">Sign Out</span>
                  <LogOut className="size-6 sm:hidden text-teal-500 mt-1"></LogOut>
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name || ""}
                  ></AvatarImage>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button type="submit">Sign In</button>
            </form>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
