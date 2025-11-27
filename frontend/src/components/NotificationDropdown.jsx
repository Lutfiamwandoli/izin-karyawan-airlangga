import { useEffect, useState, useRef } from "react";
import api from "../utils/api";
import { FiBell } from "react-icons/fi";

export default function NotificationDropdown() {
  const [notif, setNotif] = useState([]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fetchNotif = async () => {
    const res = await api.get("/api/izin/notifikasi");
    setNotif(res.data);
  };

  const markAsRead = async (id) => {
    await api.put(`/api/izin/notifikasi/${id}/read`);
    fetchNotif();
  };

  const markAll = async () => {
    await api.put("/api/izin/notifikasi/read-all");
    fetchNotif();
  };

  useEffect(() => {
    fetchNotif();
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const unreadCount = notif.filter((n) => n.status === "unread").length;

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <FiBell size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-3 z-50">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <button
                className="text-blue-600 text-sm"
                onClick={markAll}
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notif.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No notifications</p>
            ) : (
              notif.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`p-3 mb-2 rounded-lg cursor-pointer ${
                    n.status === "unread"
                      ? "bg-blue-50 border border-blue-200"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm text-gray-800">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
