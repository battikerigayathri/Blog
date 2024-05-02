"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import trail from "../../../public/assets/uploads/menbloger.png";
import { useLazyQuery } from "@/hook";
import { serverFetch } from "@/action";
import toast from "react-hot-toast";
import Link from "next/link";
const Clientblogview = () => {
  // const blogcarddata = [
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  //   {
  //     image: trail,
  //     title: "My titile",
  //     Author: "Author name",
  //     Date: "10/06/2024",
  //     discription:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Praesentium consectetur iure esse reprehenderit pariatur! Reiciendis voluptatem non sit, doloremque nostrum maior, ametconsectetur adipisicing elit. Praesentium consectetur iure essereprehenderit pariatur! Reiciendis voluptatem non sit,doloremque nostrum maior",
  //   },
  // ];

  const [featuredposts, { data, loading, error }] = useLazyQuery(serverFetch);

  useEffect(() => {
    featuredposts(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
                listBlogs(where: $where, sort: $sort) {
                  docs {
                    author {
                      id
                      firstName
                      lastName
                    }
                    slug
                    createdOn
                    title
                    status
                    description
                    id
                    thumbnail {
                      id
                      path
                      altText
                    }
                    featured
                  }
                }
              }`,
      {
        sort: {
          createdOn: "asc",
        },
        where: {
          status: "PUBLISH",
          featured: true,
        },
      },
      {
        cache: "no-store",
      }
    );
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data, "mydata");
    }
    if (error) {
      toast.error(error?.message);
    }
  }, [data, loading, error]);

  const [pinPosts, mypinposts] = useLazyQuery(serverFetch);

  useEffect(() => {
    pinPosts(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput) {
      listBlogs(where: $where, sort: $sort) {
        docs {
          author {
            id
            firstName
            lastName
          }
          createdOn
          title
          status
          description
          id
          thumbnail {
            id
            path
            altText
          }
          featured
        }
      }
    }
     `,
      {
        sort: {
          createdOn: "asc",
        },
        where: {
          pin: true,
          status: "PUBLISH",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (mypinposts?.data) {
      console.log(data, "postsdata");
    }
    if (mypinposts?.error) {
      toast.error(error?.message);
    }
  }, [mypinposts?.data, mypinposts?.loading, mypinposts?.error]);

  const [latestblogs, mylatestblogs] = useLazyQuery(serverFetch);

  useEffect(() => {
    latestblogs(
      `query Docs($where: whereBlogInput, $sort: sortBlogInput, $limit: Int!) {
      listBlogs(where: $where, sort: $sort, limit: $limit) {
        docs {
          author {
            id
            firstName
            lastName
          }
          slug
          createdOn
          title
          status
          description
          id
          thumbnail {
            id
            path
            altText
          }
        }
      }
    }`,
      {
        where: {
          status: "PUBLISH",
        },
        limit: 3,
        sort: {
          createdOn: "asc",
        },
      }
    );
  }, []);

  useEffect(() => {
    if (mylatestblogs.data) {
      console.log(data, "latestdatabloga");
      if (mylatestblogs.error) {
        toast.error(error?.message);
      }
    }
  }, [mylatestblogs.loading, mylatestblogs.data, mylatestblogs.error]);

  function formatDate({ createdon }: { createdon: any }) {
    console.log(createdon, "sdf");
    const date = new Date(createdon);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  function archivedates({ createdon }: { createdon: any }) {
    const date = new Date(createdon);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month}-${year}`;
  }

  return (
    <div className="p-5 flex flex-row bg-gray-100 gap-2  ">
      <div>
        <div className="flex flex-row gap-4 bg-white rounded-md ">
          <div className="relative group hover:scale-105 ease-in duration-300 md:flex flex-row justify-center">
            <Link href={mylatestblogs?.data?.listBlogs.docs[0].slug || "#"}>
              <div className=" w-[650px] h-[400px] shadow-sm">
                <div className="absolute top-2 left-2">
                  <text className=" bg-gray-700 font-sm text-white rounded-md p-1 bg-opacity-75">
                    {mylatestblogs?.data?.listBlogs.docs[0]?.title}
                  </text> 
                </div>
                <Image
                  className=" w-full h-full object-center"
                  src={mylatestblogs?.data?.listBlogs?.docs[0]?.thumbnail?.path}
                  alt="image"
                  height={1000}
                  width={1000}
                />
              </div>
            </Link>
          </div>
          <div className=" flex flex-wrap relative group hover:scale-105 ease-in duration-300 ">
            {mylatestblogs?.data?.listBlogs.docs
              ?.slice(1)
              .map((item: any, index: any) => (
                <Link
                  href={item.slug || "#"}
                  className="w-[300px] h-[200px] object-fill shadow-sm  text-left "
                >
                  <text className=" absolute bg-gray-700 font-sm text-white rounded-md p-1 bg-opacity-75 top-2 left-2">
                    {mylatestblogs?.data?.listBlogs.docs[1]?.title}
                  </text>
                  <Image
                    className=" w-full h-full object-center"
                    src={mylatestblogs?.data?.listBlogs?.docs[0]?.thumbnail?.path}
                    alt="image"
                    height={1000}
                    width={1000}
                  />
                </Link>
              ))}
          </div>
        </div>
        <div className="p-5">
          <h3>Latest Posts</h3>
        </div>
        <div className="grid grid-cols-3">
          {mypinposts?.data?.listBlogs.docs.map((item: any, index: any) => (
            <Link href={item.slug || "#"}>
              <div className="w-[280px] h-[450px] border-gray-500 bg-white rounded-md relative group hover:scale-105 ease-in duration-200">
                <div>
                  <Image
                    className=" w-80 h-60 object-center"
                    src={item?.thumbnail?.path}
                    alt="image"
                    height={1000}
                    width={1000}
                  />
                </div>
                <div className="p-3 ">
                  <div className="flex flex-col gap-[1px]">
                    <text className="font-bold text-blue-400">
                      {item?.title}
                    </text>
                    <div className="flex flex-row gap-4">
                      <text className="text-blue-400">
                        {item?.author?.firstName
                          ? item?.author?.firstName
                          : ""}
                      </text>
                      <text className="text-blue-400">
                        {" "}
                        {item?.createdOn
                          ? formatDate({ createdon: item?.createdOn })
                          : "no date"}
                      </text>
                    </div>
                    <p className="text-sm line-clamp-6 pt-2 justify-center text-pretty">
                      {item?.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 ">
        <div className="border-gray-400  w-[260px] h-[400px] p-3 bg-white rounded-md">
          <text>Featured Posts</text>
          {data?.listBlogs.docs.map((item: any, index: number) => {
            console.log(item, "item");
            return (
              <Link
                href={item.slug || "#"}
                className="flex flex-row  border-gray-500  gap-2 mt-2"
              >
                <div className="w-[140px] h-[80px] border-[1px]">
                  <Image
                    className=" w-full h-full object-center"
                    src={item?.thumbnail?.path}
                    alt="image"
                    height={70}
                    width={100}
                  />
                </div>
                <div className="flex flex-col gap-[1px]">
                  <text className="font-light">{item?.title}</text>
                  {/* <text className="font-light text-sm">
                    {item?.author?.firstName
                      ? item?.author?.firstName
                      : ""}
                  </text>
                  <text className="font-light text-sm ">
                    {item?.createdOn
                      ? formatDate({ createdon: item?.createdOn })
                      : "no date"} */}
                  {/* </text> */}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="border-gray-400 bg-white rounded-md w-[260px] h-[250px] p-3">
          <text>Archives</text>
          <div>
            {data?.listBlogs.docs.map((item: any, index: number) => {
              console.log(data, "checkdate");
              return (
                <Link href={'#'}> 
                <text className=" text-md pb-3 text-blue-300 font-medium ">
                  {item?.createdOn
                    ? archivedates({ createdon: item?.createdOn })
                    : "no date"}
                </text>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientblogview;
