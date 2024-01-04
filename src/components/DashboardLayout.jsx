
"use client"
import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineCalendar,
} from "react-icons/ai";
import { MdOutlineToday } from "react-icons/md";
import { BsChevronDoubleRight, BsSticky } from "react-icons/bs";
import { signOut, useSession } from "next-auth/react";
import { GoSignOut } from "react-icons/go";
import {
  Layout,
  Menu,
  Button,
  theme,
} from "antd";
import Link from "next/link";
const { Sider } = Layout;
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
    <div className="">
      <Layout>
        <Sider
          className="ps-2 bg-light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ position: "fixed", left: 0, height: "100vh" }}
        >
          <div className="demo-logo-vertical pt-3 ps-3 mt-3" />
          <div className="toggleDiv">
            <h3 className="tsk text-white text-xl">Dashboard</h3>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                display: "flex",
                fontSize: "16px",
                color: "white",
              }}
            />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "/",
                icon: <BsChevronDoubleRight />,
                label: (
                  <Link href="/dashboard/" className="text-decoration-none">
                    Home
                  </Link>
                ),
              },
              {
                key: "/users",
                icon: <MdOutlineToday />,
                label: (
                  <Link href="/dashboard/users" className="text-decoration-none">
                    User Article Data
                  </Link>
                ),
              },
              {
                key: "/todayResponses",
                icon: <AiOutlineCalendar />,
                label: (
                  <Link href="/dashboard/todayResponses" className="text-decoration-none">
                    Today Articles
                  </Link>
                ),
              },
              {
                key: "/calender",
                icon: <BsSticky />,
                label: (
                  <Link href="/dashboard/calenderResponse" className="text-decoration-none">
                    Article Calendar
                  </Link>
                ),
              },
               {
                key: "/specific",
                icon: <BsSticky />,
                label: (
                  <Link href="/dashboard/specific" className="text-decoration-none">
                    Specific User Article
                  </Link>
                ),
              },
              {
                key: "/commentsData",
                icon: <BsSticky />,
                label: (
                  <Link href="/dashboard/commentsData" className="text-decoration-none">
                    User Comments Data
                  </Link>
                ),
              },
              {
                key: "/todayComments",
                icon: <BsSticky />,
                label: (
                  <Link href="/dashboard/todayComments" className="text-decoration-none">
                    Today Comments
                  </Link>
                ),
              },
                {
                key: "/calenderComments",
                icon: <BsSticky />,
                label: (
                  <Link href="/dashboard/calenderComments" className="text-decoration-none">
                    Comments Calendar 
                  </Link>
                ),
              },
                {
                key: "/specificUserComments",
                icon: <BsSticky />,
                label: (
                  <Link href="/dashboard/specificUserComments" className="text-decoration-none">
                    Today Comments
                  </Link>
                ),
              },
            ]}
          />
          <button
            onClick={() => {
              signOut();
            }}
            className="logoutBtn p-2 text-white flex justify-between gap-5"
          >
            <GoSignOut size={20} /> <span className="text-xl"> Sign Out </span>
          </button>
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >

        </Layout>
      </Layout>
      </div>
    </>
  );
}