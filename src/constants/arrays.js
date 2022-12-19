import {
    phone,
    laptop,
    tablet,
    smartwatch,
    watch,
    backup_charger,
    headphone,
    keyboard,
    mouse_computer,
} from "../assets/category";

import {
    banner1,
    banner2,
    banner3,
    banner4,
    banner5,
    banner6,
} from "../assets/banner";

const type = [
    { url: phone, label: "điện thoại", slug: "phone" },
    { url: laptop, label: "laptop", slug: "laptop" },
    { url: tablet, label: "tablet", slug: "tablet" },
    { url: smartwatch, label: "đồng hồ thông minh", slug: "smartwatch" },
    { url: watch, label: "đồng hồ", slug: "watch" },
    { url: backup_charger, label: "sạc dự phòng", slug: "backup_charger" },
    { url: headphone, label: "tai nghe", slug: "headphone" },
    { url: headphone, label: "tai nghe có dây", slug: "wire_headphone" },
    { url: keyboard, label: "bàn phím", slug: "keyboard" },
    { url: mouse_computer, label: "chuột máy tính", slug: "mouse_computer" },
];

const banners = [
    { url: banner1 },
    { url: banner2 },
    { url: banner3 },
    { url: banner4 },
    { url: banner5 },
    { url: banner6 },
];

export { type, banners };
