"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

function SideBar() {
    const path = usePathname().split('/').pop();
    return (
        <nav className="w-[200px] bg-black h-[calc(100vh-40px)] ">
            <a className={`flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 ${usePathname().split('/').pop() === "" && "bg-gray-700 bg-opacity-25 text-gray-100"}`} href="/">
                <span className="mx-3">Dashboard</span>
            </a>
            <a className={`flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 ${path?.includes('users') && "bg-gray-700 bg-opacity-25 text-gray-100"}`}
                href="/users">
                <span className="mx-3">Users</span>
            </a>

            <a className={`flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 ${path?.includes('media') && "bg-gray-700 bg-opacity-25 text-gray-100"}`}
                href="/media">
                <span className="mx-3">Media</span>
            </a>

            <a className={`flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 ${path?.includes('category') && "bg-gray-700 bg-opacity-25 text-gray-100"}`}
                href="/category">
                <span className="mx-3">Category</span>
            </a>
            {/* <a className={`flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 ${path==='' && "bg-gray-700 bg-opacity-25 text-gray-100"}`}
                href="#">
                <span className="mx-3">subcategory</span>
            </a>    */}
            <a className={`flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100 ${path?.includes('settings') && "bg-gray-700 bg-opacity-25 text-gray-100"}`}
                href="/settings">
                <span className="mx-3">Settings</span>
            </a>
        </nav>
    )
}

export default SideBar
