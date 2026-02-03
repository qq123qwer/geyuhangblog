export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4 text-center text-gray-500">
        <p>© {new Date().getFullYear()} My Awesome Blog. All rights reserved.</p>
        <p className="mt-2 text-sm">
          Built with Next.js, Content Collections, and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
