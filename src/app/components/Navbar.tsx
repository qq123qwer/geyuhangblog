import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b py-4 fixed top-0 left-0 right-0 bg-white z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          航 sir blog
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            首页
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}
