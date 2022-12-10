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
    cost: null,
    details: [],
    createdAt: null,
    photos: [],
    skus: [],
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
    uid: "",
    fullName: "",
    photoURL: "",
    productId: "",
    star: 0,
    comment: "",
    createdAt: null,
};

const revenue = {
    productId: "",
    name: "",
    cost: null,
    photoURL: "",
    quantity: 0,
};

export { user, product, cart, order, review, revenue };
