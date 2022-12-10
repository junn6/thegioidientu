const user = {
    fullName: "",
    displayName: "",
    email: "",
    phoneNumber: "",
    photoURL:
        "https://firebasestorage.googleapis.com/v0/b/thegioidientu-8ba31.appspot.com/o/avatar%2Fdefault%2Fuser.jpg?alt=media&token=46d05904-65cd-4aec-bed4-fff385891cdd",
    createdAt: null,
    role: 2,
};

const product = {
    name: "",
    desc: "",
    category: "",
    type: "",
    cost: null,
    details: [],
    createdAt: null,
    photos: [],
    skus: [],
    slug: "",
    total: null,
};

const cart = {
    uid: "",
    items: [],
    createdAt: null,
};

const order = {
    uid: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    items: [],
    quantity: 0,
    total: 0,
    createdAt: null,
};

const review = {
    productId: "",
    name: "",
    photoURL: "",
    comment: [],
    total: null,
};

const revenue = {
    productId: "",
    name: "",
    cost: null,
    photoURL: "",
    quantity: 0,
};

const productDetails = {
    "điện thoại": {
        label: "điện thoại",
        type: "phone",
        category: "phone",
        slug: "phone",
        fields: [
            {
                name: "screen",
                label: "màn hình",
                content: "",
            },
            {
                name: "os",
                label: "hệ điều hành",
                content: "",
            },
            {
                name: "camera_rear",
                label: "camera sau",
                content: "",
            },
            {
                name: "camera_front",
                label: "camera trước",
                content: "",
            },
            {
                name: "chip",
                label: "chip",
                content: "",
            },
            {
                name: "ram",
                label: "RAM",
                content: "",
            },
            {
                name: "storage_capacity",
                label: "dung lượng lưu trữ",
                content: "",
            },
            {
                name: "sim",
                label: "sim",
                content: "",
            },
            {
                name: "battery",
                label: "pin, sạc",
                content: "",
            },
        ],
    },
    laptop: {
        label: "laptop",
        type: "laptop",
        category: "laptop",
        slug: "laptop",
        fields: [
            {
                name: "cpu",
                label: "CPU",
                content: "",
            },
            {
                name: "ram",
                label: "RAM",
                content: "",
            },
            {
                name: "hard_drive",
                label: "ổ cứng",
                content: "",
            },
            {
                name: "screen",
                label: "màn hình",
                content: "",
            },
            {
                name: "graphic_card",
                label: "card màn hình",
                content: "",
            },
            {
                name: "gate_connection",
                label: "cổng kết nối",
                content: "",
            },
            {
                name: "os",
                label: "hệ điều hành",
                content: "",
            },
            {
                name: "design",
                label: "thiết kế",
                content: "",
            },
            {
                name: "size_weight",
                label: "kích thước, khối lượng",
                content: "",
            },
            {
                name: "release_time",
                label: "thời điểm ra mắt",
                content: "",
            },
        ],
    },
    "máy tính bảng": {
        label: "máy tính bảng",
        type: "tablet",
        category: "tablet",
        slug: "tablet",
        fields: [
            {
                name: "screen",
                label: "màn hình",
                content: "",
            },
            {
                name: "os",
                label: "hệ điều hành",
                content: "",
            },
            {
                name: "chip",
                label: "chip",
                content: "",
            },
            {
                name: "ram",
                label: "RAM",
                content: "",
            },
            {
                name: "storage_capacity",
                label: "dung lượng lưu trữ",
                content: "",
            },
            {
                name: "connection",
                label: "kết nối",
                content: "",
            },
            {
                name: "sim",
                label: "sim",
                content: "",
            },
            {
                name: "camera_rear",
                label: "camera sau",
                content: "",
            },
            {
                name: "camera_front",
                label: "camera trước",
                content: "",
            },
            {
                name: "battery",
                label: "pin, sạc",
                content: "",
            },
        ],
    },
    "đồng hồ": {
        label: "đồng hồ",
        type: "watch",
        category: "watch",
        slug: "watch",
        fields: [
            {
                name: "subject",
                label: "đối tượng sử dụng",
                content: "",
            },
            {
                name: "diameter_face",
                label: "đường kính mặt",
                content: "",
            },
            {
                name: "material_glass",
                label: "chất liệu mặt kính",
                content: "",
            },
            {
                name: "material_wire",
                label: "chất liệu dây",
                content: "",
            },
            {
                name: "apparatus",
                label: "bộ máy",
                content: "",
            },
            {
                name: "waterproof",
                label: "chống nước",
                content: "",
            },
            {
                name: "trademark",
                label: "thương hiệu",
                content: "",
            },
            {
                name: "firm",
                label: "hãng",
                content: "",
            },
        ],
    },
    "đồng hồ thông minh": {
        label: "đồng hồ thông minh",
        type: "smartwatch",
        category: "watch",
        slug: "smartwatch",
        fields: [
            {
                name: "screen",
                label: "màn hình",
                content: "",
            },
            {
                name: "battery_life",
                label: "thời lượng pin",
                content: "",
            },
            {
                name: "os_connect",
                label: "kết nối với hệ điều hành",
                content: "",
            },
            {
                name: "face",
                label: "mặt",
                content: "",
            },
            {
                name: "health_features",
                label: "tính năng cho sức khỏe",
                content: "",
            },
            {
                name: "firm",
                label: "hãng",
                content: "",
            },
        ],
    },
    "sạc dự phòng": {
        label: "sạc dự phòng",
        type: "backup_charger",
        category: "accessory",
        slug: "backup_charger",
        fields: [
            {
                name: "unless",
                label: "hiệu suất sạc",
                content: "",
            },
            {
                name: "battery_capacity",
                label: "dung lượng pin",
                content: "",
            },
            {
                name: "battery_charge_time",
                label: "thời gian sạc đầy pin",
                content: "",
            },
            {
                name: "input",
                label: "nguồn vào",
                content: "",
            },
            {
                name: "output",
                label: "nguồn ra",
                content: "",
            },
            {
                name: "battery_core",
                label: "lõi pin",
                content: "",
            },
            {
                name: "technology",
                label: "công nghệ / tiện ích",
                content: "",
            },
            {
                name: "size",
                label: "kích thước",
                content: "",
            },
            {
                name: "weight",
                label: "trọng lượng",
                content: "",
            },
            {
                name: "trademark",
                label: "thương hiệu",
                content: "",
            },
            {
                name: "made_in",
                label: "sản xuất tại",
                content: "",
            },
            {
                name: "firm",
                label: "hãng",
                content: "",
            },
        ],
    },
    "tai nghe": {
        label: "tai nghe",
        type: "headphone",
        category: "accessory",
        slug: "headphone",
        fields: [
            {
                name: "earphone_time",
                label: "thời gian tai nghe",
                content: "",
            },
            {
                name: "charging_box_time",
                label: "thời gian hộp sạc",
                content: "",
            },
            {
                name: "charging_port",
                label: "cổng sạc",
                content: "",
            },
            {
                name: "audio_technology",
                label: "công nghệ âm thanh",
                content: "",
            },
            {
                name: "compatible",
                label: "tương thích",
                content: "",
            },
            {
                name: "app_connect",
                label: "ứng dụng kết nối",
                content: "",
            },
            {
                name: "utilities",
                label: "tiện ích",
                content: "",
            },
            {
                name: "connection_support",
                label: "hỗ trợ kết nối",
                content: "",
            },
            {
                name: "controlled_by",
                label: "điều khiển bằng",
                content: "",
            },
            {
                name: "firm",
                label: "hãng",
                content: "",
            },
        ],
    },
    "tai nghe có dây": {
        label: "tai nghe có dây",
        type: "wire_headphone",
        category: "accessory",
        slug: "wire_headphone",
        fields: [
            {
                name: "jack",
                label: "jack cắm",
                content: "",
            },
            {
                name: "compatible",
                label: "tương thích",
                content: "",
            },
            {
                name: "utilities",
                label: "tiện ích",
                content: "",
            },
            {
                name: "controlled_by",
                label: "điều khiển bằng",
                content: "",
            },
            {
                name: "control",
                label: "phím điều khiển",
                content: "",
            },
            {
                name: "firm",
                label: "hãng",
                content: "",
            },
        ],
    },
    "bàn phím": {
        label: "bàn phím",
        type: "keyboard",
        category: "accessory",
        slug: "keyboard",
        fields: [
            {
                name: "compatible",
                label: "tương thích",
                content: "",
            },
            {
                name: "connect",
                label: "cách kết nối",
                content: "",
            },
            {
                name: "led_light",
                label: "đèn LED",
                content: "",
            },
            {
                name: "number_of_keys",
                label: "số phím",
                content: "",
            },
            {
                name: "trademark",
                label: "thương hiệu",
                content: "",
            },
            {
                name: "firm",
                label: "hãng",
                content: "",
            },
        ],
    },
    "chuột máy tính": {
        label: "chuột máy tính",
        type: "mouse_computer",
        category: "accessory",
        slug: "mouse_computer",
        fields: [
            {
                name: "compatible",
                label: "tương thích",
                content: "",
            },
            {
                name: "default_resolution",
                label: "độ phân giải mặc định",
                content: "",
            },
            {
                name: "connect",
                label: "cách kết nối",
                content: "",
            },
            {
                name: "wireconn",
                label: "độ dài dây / khoảng cách kết nối",
                content: "",
            },
            {
                name: "battery_type",
                label: "loại pin",
                content: "",
            },
            {
                name: "weight",
                label: "khối lượng",
                content: "",
            },
            {
                name: "trademark",
                label: "thương hiệu",
                content: "",
            },
            {
                name: "made_in",
                label: "sản xuất tại",
                content: "",
            },
            {
                name: "firm",
                label: "hãng",
                content: "",
            },
        ],
    },
};

export { user, product, cart, order, review, revenue, productDetails };
