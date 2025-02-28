'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  {
    name: 'Admin Dashboard',
    href: '/dashboard/admin',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    href: '/dashboard/admin/users',
    icon: Users,
  },
  {
    name: 'Products',
    href: '#-',
    icon: ShoppingCart,
  },
  {
    name: 'Settings',
    href: '#',
    icon: Settings,
  },
];

export function DashboardNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('flex flex-col space-y-1 p-4', className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
            pathname === item.href
              ? 'bg-accent text-accent-foreground'
              : 'text-muted-foreground'
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
}