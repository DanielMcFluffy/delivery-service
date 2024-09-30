import { createLazyFileRoute, Link, Outlet, useNavigate } from '@tanstack/react-router'
import { FaHome, FaHandsHelping  } from "react-icons/fa";
import { IconType } from 'react-icons';
import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

import React from 'react';
import { useAxios } from '../../../hooks/useAxios';

export const Route = createLazyFileRoute('/(authenticated)/(dashboard)/dashboard')({
  component: Dashboard
})

function Dashboard() {

  return(
    <>
    <div className='flex flex-col bg-0 h-dvh'>
      <main className='flex h-full'>
        <Sidebar /> <section className='h-full w-full px-6 py-4 bg-slate-50 rounded-tl-xl rounded-bl-xl shadow-md'><Outlet /></section>
      </main>
      <Footer />
    </div>
    </>
  )
}

const Footer = () => {
  return(
    <>
      <footer
        className='fixed left-0 right-0 bottom-0 h-[10ch] bg-0 grid grid-flow-col items-center sm:hidden'
      >
          {navigationButtons.map((x, index) => ( index < (navigationButtons.length - 1) ?
            <FooterButtonLink
              key={index}
              icon={x.icon}
              to={x.to}/> :
              ''
          ))}
      </footer>
    </>
  )
}

const Sidebar = () => {

  const navigate = useNavigate();
  const {AxiosGET} = useAxios();

  const logout = async() => {
    await AxiosGET('/logout');
    navigate({to: '/home'});
  }

  return(
    <>
      <aside className={`bg-0 h-full transition-[width] ease-in-out 'w-[15ch]' flex-col gap-6 pt-6 hidden sm:flex`}>       
        
        <img 
          src="logo" 
          alt="logo"
          className='text-center' 
          />
        <section className='flex flex-col'>
          {navigationButtons.map((x, index) => ( index < (navigationButtons.length - 1) ?
            <SidebarButtonLink key={index} icon={x.icon} label={x.label} to={x.to} /> :
            <SidebarButtonLink key={index} icon={x.icon} label={x.label} callback={logout} /> 
          ))}
        </section>
      </aside>
    </>
  )
}

type NavigationButtonProps = {
  icon: IconType;
  label: string;
  to?: string;
  callback?: () => void;
}

const navigationButtons: NavigationButtonProps[] = [
  {icon: FaHome, label: 'Dashboard', to: '/dashboard'},
  {icon: FaHandsHelping, label: 'Tasks', to: '/dashboard/tasks'},
  {icon: CgProfile, label: 'Profile', to: '/dashboard/profile'},
  {icon: IoIosSettings, label: 'Settings', to: '/dashboard/settings'},
  {icon: CiLogout, label: 'Logout'},
]

const FooterButtonLink = ({icon, to, callback}: Omit<NavigationButtonProps, 'label'>) => {

  return(
    <>
      <Link
        className='min-w-[25%] text-3xl flex justify-center' 
        to={to}
        activeProps={navbarActiveProps}
        activeOptions={{exact: true}}
        onClick={callback}>
        {React.createElement(icon)}
      </Link>
    </>
  )
}

const navbarActiveProps: React.AnchorHTMLAttributes<HTMLAnchorElement> | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>) | undefined = {
  style: {
    color: '#FCFAEE',
  },
};

const SidebarActiveProps: React.AnchorHTMLAttributes<HTMLAnchorElement> | (() => React.AnchorHTMLAttributes<HTMLAnchorElement>) | undefined = {
  style: {
    boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FCFAEE',
    color: '#212427'
  },
};

const SidebarButton = ({icon, label, callback}: NavigationButtonProps) => {
  return (
    <>
      <button className='flex flex-col justify-center items-center hover:bg-slate-300 px-2 py-4 font-2 hover:font-1' onClick={callback}>
        <div className=''>
          {React.createElement(icon)}
        </div>
        <div>
          {label}
        </div>
      </button>
    </>
  )
}

const SidebarButtonLink = ({ icon, label, to, callback }: NavigationButtonProps) => {
  if (!to) {
    return <SidebarButton icon={icon} label={label} callback={callback} />;
  }
  return (
    <Link to={to} activeProps={SidebarActiveProps} activeOptions={{exact: true}} className='font-2 flex flex-col justify-center items-center hover:bg-slate-300 hover:font-1 px-4 py-4'>
      <div>{React.createElement(icon)}</div>
      <div>{label}</div>
    </Link>
  );
};

