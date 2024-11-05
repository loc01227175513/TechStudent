"use client";
import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

export default function Page({ children ,id}) {

  return (
    <Fragment>
      <header className="sticky top-0 z-10 bg-white shadow">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto">
          <Link href="/page/lecturer-dashboard/quanlykhoahoc" className="flex items-center text-gray-700">
            <i className="bi bi-arrow-left"></i>
            <span className="ml-2 text-base font-medium">
              Quay lại khóa học
            </span>
          </Link>
          <h1 className="text-lg font-semibold">Trang biên tập khóa học</h1>
          <div className="flex items-center space-x-4">
            <Link href={`/page/course-detail?id=${id}`} className="btn btn-link">
            <button className="btn border border-[#32ADE6] text-[#32ADE6] bg-white hover:bg-[#32ADE6] hover:text-white btn-sm">
              <i className="bi bi-eye"></i> Xem trước
            </button>
            </Link>
            <button
              className="btn bg-[#32ADE6] text-white btn-sm"
            >
              <i className="bi bi-save"></i> Lưu
            </button>
            <Menu as="div" className="relative">
              <Menu.Button className="p-0 text-gray-700 btn btn-link">
                <i className="bi bi-gear"></i>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-20 w-48 mt-2 bg-white border rounded-md shadow-md">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="#"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : ""
                        }`}
                      >
                        Cài đặt
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </header>

      <main>{children}

        
      </main>
   
    </Fragment>
  );
}
