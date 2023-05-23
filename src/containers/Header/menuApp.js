export const adminMenu = [
  {
    //quản lí người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
      {
        //quan li lich ke hoach kham benh bac si
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    //quản lí phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "system/manage-clinic",
      },
    ],
  },
  {
    //quản lí chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "system/manage-specialty",
      },
    ],
  },
  {
    //quản lí cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "system/manage-handbook",
      },
    ],
  },
];
//doctor menu
export const doctorMenu = [
  {
    //quan li lich ke hoach kham benh bac si
    name: "menu.doctor.schedule",
    menus: [
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      {
        name: "vidu",
        link: "/doctor/manage-schedule-vidu",
      },
    ],
  },
];
// khai bao menu dong
//phan quyen cho cac loai nguoi dung
//file quan li name va duong link cua cac quan li tren thanh header lien ket voi 2 file dich vi.json va en.json
//moi duong link se dan toi 1 component o file routes
//  dieu huong 3 match voi cac duong link
