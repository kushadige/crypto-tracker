import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import { Providers } from "./providers";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <Providers>
      <div className="grid min-h-screen grid-rows-[auto_1fr]">
        <header className="flex items-center justify-between py-4 px-24 bg-slate-900 text-white">
          <div>Crypto Tracker</div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  target="_blank"
                  href="https://github.com/kushadige/crypto-tracker"
                  className="flex items-center gap-2 flex-nowrap"
                >
                  <FaGithub />
                  <span>Github</span>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </div>
    </Providers>
  );
}
