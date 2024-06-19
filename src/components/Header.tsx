import React from 'react'
import { Logo } from './logo'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green } from '@mui/material/colors';


const Header = () => {

  return (
    <>
      <div className='h-16 w-full bg-[#e5fff1] border-2 border-[#dbdada]'>
        <div className='flex h-full mx-2 justify-between items-center'>
          <div className='flex items-center '>
            <Logo />
            <div className='flex items-center ml-12'>
              <span className='text-sm font-semibold'>SAGAR TESTIN <ArrowDropDownIcon /> </span>
            </div>
          </div>
          <div className='flex h-full mx-2 justify-between items-center'>
            <div className='mx-2'>
              <div className='flex items-center ml-12'>
                <span className='text-sm font-semibold text-[#115d65]'>2024-25<ArrowDropDownIcon /> </span>
              </div>
            </div>
            <div className='text-[#115d65] mx-3'>
              <NotificationsIcon fontSize="large" />
            </div>
            <div className='mx-2'>
              <Avatar sx={{ bgcolor: '#115d65' }} variant="square" >
                <img alt="Remy Sharp" src="/assets/img/avatar_person.jpg" className='w-8 h-8' />
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
