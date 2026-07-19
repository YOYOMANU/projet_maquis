import type { ReactNode } from 'react'

export function SidebarBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sidebar-block">
      <div className="sidebar-title">{title}</div>
      {children}
    </div>
  )
}
