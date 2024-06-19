import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentIcon from '@mui/icons-material/Payment';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InventoryIcon from '@mui/icons-material/Inventory';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import GavelIcon from '@mui/icons-material/Gavel';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import MonitorIcon from '@mui/icons-material/Monitor';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import DescriptionIcon from '@mui/icons-material/Description';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import BarChartIcon from '@mui/icons-material/BarChart';


interface LayoutProps {
  children: ReactNode;
}

interface MenuItem {
  title: string;
  path?: string;
  icon?: JSX.Element;
  subMenu?: MenuItem[];
}


const menuItems: MenuItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: <MonitorIcon />, subMenu: [] },
  { title: 'Master', path: '/master', icon: <TextSnippetIcon />, subMenu: [
    { title: 'Account', path: '/master-account' },
    { title: 'Customers', path: '/master-customers' },

  ] },
  {
    title: 'Sales',
    icon: <DescriptionIcon />,
    subMenu: [
      { title: 'Sales Order', path: '/sales-order' },
      { title: 'Delivery Note', path: '/sales/delivery-note' },
      { title: 'Sales Invoice', path: '/sales/invoice' },
      { title: 'Sales Return', path: '/sales/return' },
    ],
  },

  { title: 'Purchase', path: '/purchase', icon: <ShoppingCartIcon />, subMenu: [
    { title: 'Purchase Order', path: '/purchase-order' },
    { title: 'Purchase Invoice', path: '/purchase/invoice' },
    { title: 'Purchase Return', path: '/purchase/return' },
  ] },

  { title: 'Receipt', path: '/receipt', icon: <ReceiptIcon />, subMenu: [] },
  { title: 'Payment', path: '/payment', icon: <PaymentIcon />, subMenu: [] },
  { title: 'Contra', path: '/contra', icon: <FilterNoneIcon />, subMenu: [] },
  { title: 'Journal Voucher', path: '/journal-voucher', icon: <DescriptionIcon />, subMenu: [] },
  { title: 'Reporting', path: '/reporting', icon: <BarChartIcon />, subMenu: [] },
  { title: 'Stock', path: '/stock', icon: <InventoryIcon />, subMenu: [] },
  { title: 'Account Book', path: '/account-book', icon: <BookIcon />, subMenu: [] },
  { title: 'Other Books', path: '/other-books', icon: <LibraryBooksIcon />, subMenu: [] },
  { title: 'GST', path: '/gst', icon: <GavelIcon />, subMenu: [] },
];



const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleToggle = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <div className="grid grid-cols-[180px_1fr] h-screen">
      <aside className="bg-white py-2 border-1 flex flex-col justify-between h-full">
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <button
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent rounded-r-lg hover:border-green-900 pr-6 w-full text-left"
                  onClick={() => item.subMenu && handleToggle(item.title)}
                >
                  <span className="inline-flex text-xs font-bold justify-center items-center ml-4">
                    {item.icon}
                  </span>
                  <span className="ml-2 text-sm font-bold tracking-wide truncate">
                    {item.title}
                  </span>
                  {item.subMenu && item.subMenu.length > 0 && (
                    <span className="ml-auto pr-2">
                      {openMenu === item.title ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowRightIcon />
                      )}
                    </span>
                  )}
                </button>
                {item.subMenu && openMenu === item.title && (
                  <ul className="ml-4 space-y-1">
                    {item.subMenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path!}
                          className="relative flex flex-row items-center ml-6 h-8 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-green-900	 pr-6"
                        >
                          <span className="ml-2 text-sm font-bold tracking-wide truncate">
                            {subItem.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="border-l-2  w-full border-[#d3d8d6] bg-white">{children}</main>
    </div>
  );
};

export default Layout;
