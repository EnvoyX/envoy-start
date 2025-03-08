import Link from "next/link";
import { auth, signIn, signOut } from "../app/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="px-5 py-3 bg-white shadow-md font-work-sans text-black">
      <nav className="flex justify-between items-center">
        <div>
          <span className="text-xl font-bold text-black antialiased">
            Envoy
          </span>
          <span className="text-xl font-bold text-teal-500 antialiased">
            Start
          </span>
        </div>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">Sign Out</button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
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
