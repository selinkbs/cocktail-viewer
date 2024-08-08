// app/layout.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './styles/globals.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faBookmark, faSearch, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

  useEffect(() => {
    const isPublicPage = pathname === '/login';
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedInStatus && !isPublicPage) {
      router.push('/login');
    }
  }, [router, pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <html lang="en">
      <body>
        <div className="layout">
          <nav className="navbar">
            <Link href="/">
              <img src="/logo2.png" alt="Cocktail Viewer Logo" className="logo" />
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-item">
                <FontAwesomeIcon icon={faHome} className="nav-icon" />
                Home
              </Link>
              <Link href="/search" className="nav-item">
                <FontAwesomeIcon icon={faSearch} className="nav-icon" />
                Search
              </Link>
              <Link href="/about" className="nav-item">
                <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" />
                About
              </Link>
              <Link href="/saved" className="nav-item">
                <FontAwesomeIcon icon={faBookmark} className="nav-icon" />
                Saved Cocktails
              </Link>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="nav-item logout-button">
                  <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
                  Logout
                </button>
              ) : (
                <Link href="/login" className="nav-item">
                  <FontAwesomeIcon icon={faSignInAlt} className="nav-icon" />
                  Login
                </Link>
              )}
            </div>
          </nav>
          <main className="main-content">{children}</main>
          <footer className="footer">
            <p>&copy; 2024 Cocktail Viewer. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
