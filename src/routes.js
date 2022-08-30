
import Dashboard from "views/Dashboard.js";
import Bookingticket from "views/Bookingticket.js";
import Cars from "views/Cars.js";
import Hang from "views/Hang";
import Maps from "views/Maps.js";
import ManageXe from "views/ManageXe";
import Notifications from "views/Notifications.js";
import ve from "./components/ticket/Ticket.js";


const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Thống kê",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/bookve",
    name: "Đặt vé",
    icon: "nc-icon nc-paper-2",
    component: Bookingticket,
    layout: "/admin"
  },
  {
    path: "/hang",
    name: "Giao hàng",
    icon: "nc-icon nc-notes",
    component: Hang,
    layout: "/admin"
  },
  {
    path: "/xe",
    name: "Xe",
    icon: "nc-icon nc-bus-front-12",
    component: Cars,
    layout: "/admin"
  },
  {
    path: "/managaxe",
    name: "Quản Lý Xe",
    icon: "nc-icon nc-bus-front-12",
    component: ManageXe,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Tuyến đường",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },

  {
    path: "/chi",
    name: "phiếu chi",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin"
  },


];

export default dashboardRoutes;
