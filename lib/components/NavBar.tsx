import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="py-5 px-5 bg-emerald-900 shadow-md">
      <Link href="/">
        <div className="font-semibold tracking-wide">hymn helper</div>
      </Link>
    </div>
  );
};
