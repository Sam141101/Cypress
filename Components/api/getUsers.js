// fetch
// export const getUsers = async () => {
//     const response = await fetch("https://api.example.com/users");
//     if (!response.ok) throw new Error("Lỗi khi tải danh sách người dùng");
//     return response.json();
//   };

import axios from 'axios';

export const getUsers = async () => {
    const response = await axios.get('https://api.example.com/users');
    if (response.status != 200) throw new Error('Lỗi khi tải danh sách người dùng');
    return response.data;
};