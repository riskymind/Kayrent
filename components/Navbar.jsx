"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/logo.png";
import profileDefault from "@/assets/images/profile.png";
import { FaGoogle } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import UnreadMessageCount from "./UnreadMessageCount";

const Navbar = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  
  const pathname = usePathname();
  

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      console.log(res);
      
      setProviders(res);
    };

    setAuthProviders();

    // Note: close mobile menu if the viewport size is changed
    window.addEventListener("resize", () => {
      setIsProfileMenuOpen(false);
    });
  }, []);

  function handleMenuOpen() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function handleProfileMenuOpen() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <nav className="bg-blue-700 border-b border-blue-400">
      <div className="max-w-7xl px-2 mx-auto sm:px-6 lg:px-8">
        <div className="relative h-20 flex items-center justify-between">
          <div className="absolute left-0 flex items-center md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white foucs:outline-none focus:ring-2 focus:ring-inset foucs:ring-white"
              onClick={handleMenuOpen}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center md:items-stretch md:justify-start">
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2">
              <Image
                src={logo}
                alt="logo"
                className="hidden md:block h-10 w-auto"
              />
              <span className="hidden md:block text-white text-2xl font-bold italic">
                Kayrent
              </span>
            </Link>

            {/* Desktop menu hidden below md screen */}
            <div className="hidden md:block ml-3">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`${
                    pathname === "/"
                      ? "underline underline-offset-4 bg-gray-900/50"
                      : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Home
                </Link>
                <Link
                  href="/properties"
                  className={`${
                    pathname === "/properties"
                      ? "underline underline-offset-4 bg-gray-900/50"
                      : ""
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Properties
                </Link>
                {session && (
                  <Link
                    href="/properties/add"
                    className={`${
                      pathname === "/properties/add"
                        ? "underline underline-offset-4 bg-gray-900/50"
                        : ""
                    } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Right Side Menu (Logged Out) */}
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3"
                      onClick={() => signIn(provider.id)}
                      key={provider.name}
                    >
                      <FaGoogle className="text-white mr-2" />
                      <span>Login or Register</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Right side menu (Logged In)  */}
          {session && (
            <div className="flex items-center pr-2">
              <Link href="/messages" className="relative group">
                <button className="relative rounded-full bg-gray-800 p-1 mr-3 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                  <UnreadMessageCount />
                </button>
                
              </Link>

              {/* Profile dropdown button */}
              <div className="relative">
                <div>
                  <button
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    type="button"
                    onClick={handleProfileMenuOpen}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      src={profileImage || profileDefault}
                      alt="profile Image"
                      width={40}
                      height={40}
                      className="h-8 w-8 rounded-full"
                    />
                  </button>
                </div>

                {/* Profile dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      href="/profile"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Your profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Save Properties
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu, show/hide base on menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3">
            {/* Logo */}
            <Link href="/" className="flex flex-shrink-0 items-center gap-2"
            onClick={handleMenuOpen}>
              <Image src={logo} alt="logo" className="h-6 w-auto" />
              <span className="text-white text-sm font-bold italic">
                Kayrent
              </span>
            </Link>
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "underline underline-offset-4 bg-gray-900/50"
                  : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-900`}
              onClick={handleMenuOpen}
            >
              Home
            </Link>
            <Link
              href="/properties"
              className={`${
                pathname === "/properties"
                  ? "underline underline-offset-4 bg-gray-900/50"
                  : ""
              } text-white block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-900`}
              onClick={handleMenuOpen}
            >
              Properties
            </Link>

            {session && (
              <Link
                href="/properties/add"
                className={`${
                  pathname === "/properties/add"
                    ? "underline underline-offset-4 bg-gray-900/50"
                    : ""
                } text-white block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-900`}
                onClick={handleMenuOpen}
              >
                Add Property
              </Link>
            )}

            {!session && (
              <div className="block md:ml-6">
                <div className="flex items-center">
                  {providers &&
                    Object.values(providers).map((provider) => (
                      <button
                        key={provider.name}
                        onClick={() => signIn(provider.id)}
                        className="flex items-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-3"
                      >
                        <FaGoogle className="text-white mr-2" />
                        <span>Login or Register</span>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
