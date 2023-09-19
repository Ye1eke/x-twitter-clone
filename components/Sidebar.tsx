
import React from 'react'
import { 
    BellIcon,
    MagnifyingGlassIcon,
    BookmarkIcon,
    QueueListIcon,
    ListBulletIcon,
    EnvelopeIcon,
    UserIcon,
    HomeIcon, 
} from '@heroicons/react/24/outline'
import SidebarRow from './SidebarRow'
import { signOut, signIn, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession()
  return (
    
    <div className='flex flex-col col-span-2 items-center px-4 md:items-start'>
        <img className='h-6 w-6 m-4' src="images/logo-white.png" alt="Twitter Logo" />
        <SidebarRow Icon={HomeIcon} title='Home' />
        <SidebarRow Icon={MagnifyingGlassIcon} title='Explore' />
        <SidebarRow Icon={BellIcon} title='Notifications' />
        <SidebarRow Icon={EnvelopeIcon} title='Messages' />
        <SidebarRow Icon={BookmarkIcon} title='Bookmarks' />
        <SidebarRow Icon={QueueListIcon} title='Lists' />
        <SidebarRow onClick={session ? signOut : signIn} Icon={UserIcon} title={session ? 'Sign Out' : 'Sign In'} />
        <SidebarRow Icon={ListBulletIcon} title='More' />
        
    </div>
  )
}

export default Sidebar;
