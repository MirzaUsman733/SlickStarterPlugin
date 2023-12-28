
"use client"
import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineCalendar,
} from "react-icons/ai";
import { MdOutlineToday } from "react-icons/md";
import { BsChevronDoubleRight, BsSticky } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";
import {
  Layout,
  Menu,
  Button,
  theme,
  message,
  Modal,
  FloatButton,
  Divider,
  Form,
  Row,
  Col,
  Input,
  Space,
  Spin,
} from "antd";
import Link from "next/link";
const { Header, Sider, Content } = Layout;
export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const {
    token: { colorBgContainer },
  } = theme.useToken();



  const handleScreenWidthChange = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidthChange);
    return () => {
      window.removeEventListener("resize", handleScreenWidthChange);
    };
  }, []);

  useEffect(() => {
    if (screenWidth < 768) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screenWidth]);

  // if (isLoading)
  //   return (
  //     <Space
  //       size="middle"
  //       style={{
  //         minHeight: "100vh",
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "center",
  //         alignContent: "center",
  //       }}
  //     >
  //       <Spin size="large" />
  //     </Space>
  //   );
  return (
    <>
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
            <h3 className="tsk text-white">Tasks</h3>
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
                    Users
                  </Link>
                ),
              },
              {
                key: "/todayResponses",
                icon: <AiOutlineCalendar />,

                label: (
                  <Link href="/dashboard/todayResponses" className="text-decoration-none">
                    Today
                  </Link>
                ),
              },
              {
                key: "/calender",
                icon: <BsSticky />,
                label: (
                  <Link href="/dashboard/calenderResponse" className="text-decoration-none">
                    Calendar
                  </Link>
                ),
                to: "stickywall",
              },
            ]}
          />
          {/* <Button type="dashed" className="mt-2 w-100" onClick={showModal}>
            <AiOutlinePlus /> &nbsp; Add New list
          </Button> */}

          {/* <ul>
            {lists?.map((list) => {
              const isDeleting = deletingListId === list.listId;
              return (
                <li
                  key={list.listId}
                  className="mt-3"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Link
                    className="text-decoration-none"
                    href={`/list/${list.listId}`}
                  >
                    {list.name}
                  </Link>
                  <button
                    className="border-0 btn btn-danger px-1 py-0"
                    onClick={() => handleDeleteList(list.listId)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : <AiOutlineDelete />}
                  </button>
                </li>
              );
            })}
          </ul> */}

         
          {/* {isAuth && (
            <>
              <Link className="logoutBtn ms-2"
              //  onClick={handleLogout}
               >
                <GoSignOut size={20} /> Sign Out
              </Link>
            </>
          )} */}
        </Sider>
        <Layout
          className="site-layout"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
         
        </Layout>
      </Layout>
    </>
  );
}