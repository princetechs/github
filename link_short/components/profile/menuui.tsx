import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

const links = [
  { href: '/account-settings', label: 'Account settings' },
  { href: '/support', label: 'Support' },
  { href: '/license', label: 'License' },
];

export default function Menuui() {
  const { data: session } = useSession();

  return (
    <div className="fixed top-16 w-56 text-right">
      {session && session.user ?
        <Islogin session={session}  /> :
        <Islogout />
      }
    </div>
  );
}

function Islogout() {
  return (
    <button
      onClick={() => signIn()}
      type="button"
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
    >
      Sign in with
    </button>
  );
}

function Islogin({ session }: any) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button >
          <div className="relative inline-block text-left">
            <div className="overflow-hidden cursor-pointer relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
              <svg className="absolute -left-1 w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items>
          <Menu.Item as={Fragment}>
            {({ active }) => (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-1">
                  <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-200 rounded">
                    {session?.user?.email}
                  </button>
                  {links.map((link) => (
                    <a key={link.href} href={link.href} className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-200 rounded">
                      {link.label}
                    </a>
                  ))}
                  <button type="submit" onClick={() => signOut()} className="text-gray-700 block w-full px-4 py-2 text-left text-sm hover:bg-slate-200 rounded">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}