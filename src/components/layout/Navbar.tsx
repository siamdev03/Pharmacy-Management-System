"use client";

import {
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

import {
  Bell,
  Search,
  LogOut,
} from "lucide-react";

import {
  getNotifications,
  getUnreadCount,
  markAllAsRead,
} from "@/services/notification.service";

export default function Navbar() {
  const router = useRouter();

  const [count, setCount] =
    useState(0);

  const [
    notifications,
    setNotifications,
  ] = useState<any[]>([]);

  const [
    showNotifications,
    setShowNotifications,
  ] = useState(false);

  useEffect(() => {
    loadNotificationCount();
  }, []);

  const loadNotificationCount =
    async () => {
      try {
        const data =
          await getUnreadCount();

        setCount(
          data.count || 0
        );
      } catch (error) {
        console.log(error);
      }
    };

  const loadNotifications =
    async () => {
      try {
        const data =
          await getNotifications();

        setNotifications(
          data.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleBellClick =
    async () => {
      await loadNotifications();

      await markAllAsRead();

      setCount(0);

      setShowNotifications(
        !showNotifications
      );
    };

  const handleLogout =
    async () => {
      const result =
        await Swal.fire({
          title: "Logout?",
          text: "Are you sure you want to logout?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText:
            "Yes, Logout",
        });

      if (result.isConfirmed) {
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "accessToken"
        );

        localStorage.removeItem(
          "user"
        );

        router.push("/login");
      }
    };

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 shadow-sm relative">
      <div className="flex items-center justify-between">
        {/* Left */}

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Pharmacy Management
            System
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Welcome back 👋
          </p>
        </div>

        {/* Right */}

        <div className="flex items-center gap-4">
          {/* Search */}

          <div className="hidden md:flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72">
            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search medicines, suppliers..."
              className="bg-transparent outline-none ml-3 w-full text-sm"
            />
          </div>

          {/* Notification */}

          <div className="relative">
            <button
              onClick={
                handleBellClick
              }
              className="relative h-11 w-11 rounded-xl bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center"
            >
              <Bell size={20} />

              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center font-semibold">
                  {count}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                <div className="p-4 border-b bg-slate-50">
                  <h3 className="font-bold text-lg">
                    Notifications
                  </h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length ===
                  0 ? (
                    <div className="p-6 text-center text-slate-500">
                      No Notifications
                    </div>
                  ) : (
                    notifications.map(
                      (
                        notification: any
                      ) => (
                        <div
                          key={
                            notification._id
                          }
                          className="p-4 border-b hover:bg-slate-50 transition"
                        >
                          <h4 className="font-semibold text-sm">
                            {
                              notification.title
                            }
                          </h4>

                          <p className="text-sm text-slate-600 mt-1">
                            {
                              notification.message
                            }
                          </p>

                          <p className="text-xs text-slate-400 mt-2">
                            {new Date(
                              notification.createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile */}

          <div className="hidden md:flex items-center gap-3 bg-slate-100 px-3 py-2 rounded-xl">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">
              A
            </div>

            <div>
              <p className="text-sm font-semibold">
                Admin
              </p>

              <p className="text-xs text-slate-500">
                System Manager
              </p>
            </div>
          </div>

          {/* Logout */}

          <button
            onClick={
              handleLogout
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={18} />

            <span className="hidden md:block">
              Logout
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}