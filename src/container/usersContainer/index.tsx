"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
const data=[
    {
        userName:"Avinash",
        email:"Saiavinashkodurikoduri@gamil.com",
        status:"active",
        role:"user",
        id:"1"
    },
    {
        userName:"Thrinetra",
        email:"thri@gamil.com",
        status:"active",
        role:"user",
        id:"2"

    },
    {
        userName:"Praveen",
        email:"praveen@gamil.com",
        status:"active",
        role:"user",
        id:"3"

    },
]
function UsersContainer() {
    const router=useRouter()
    return (
        <div className='flex flex-col w-[calc(100vw-260px)]' >
            <div className='flex flex-row justify-between p-3 rounded-md bg-gray-100 items-center'>
            <h4 className='text-center font-bold text-[20px]'>Users</h4>
            <button className='bg-blue-950 text-white p-2 rounded-md' onClick={()=>router.push("/users/addUser")}>Add</button>
            </div>
            <div className="flex flex-col mt-8">
                <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                    <div
                        className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        SnO</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        User Name</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Email</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Role</th>
                                    <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Status</th>
                                        <th
                                        className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                                        Actions</th>
                                </tr>
                            </thead>

                            <tbody className="bg-white">
                                {data?.map((item,index)=>{
                                    return(
                                        <tr>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium leading-5 text-gray-900">{index+1}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="flex items-center">
                                                    <div >
                                                        <div className="text-sm font-medium leading-5 text-gray-900">{item?.userName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
        
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <div className="text-sm leading-5 text-gray-900">{item?.email}</div>
                                            </td>
        
                                            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                                <span
                                                    className={`inline-flex px-2 text-xs font-semibold leading-5 ${item?.status==="active"?"text-green-800 bg-green-100":"text-orange-800 bg-orange-100"} rounded-full`}>{item?.status}</span>
                                            </td>
        
                                            <td
                                                className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                                {item?.role}</td>
        
                                            <td
                                                className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                                                <a href={`/users/${item?.id}`} className="text-indigo-600 hover:text-indigo-900">View</a>
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsersContainer
