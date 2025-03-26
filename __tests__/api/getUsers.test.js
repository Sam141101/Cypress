// cách 1
import { getUsers } from "../../Components/api/getUsers";

// global.fetch = jest.fn(() =>
//     Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve([{ id: 1, name: "Alice" }]),
//     })
// );

// test("Lấy danh sách người dùng", async () => {
//     const users = await getUsers();
//     expect(users).toEqual([{ id: 1, name: "Alice" }]);
// });



// Mock global fetch
// global.fetch = jest.fn();

// describe('getUsers', () => {
//     // Dọn dẹp mock sau mỗi test
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     // Test trường hợp thành công
//     it('fetches users successfully', async () => {
//         // Mock response thành công
//         const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
//         fetch.mockResolvedValueOnce({
//             ok: true,
//             json: async () => mockUsers,
//         });

//         // Gọi hàm và kiểm tra kết quả
//         const result = await getUsers();
//         expect(result).toEqual(mockUsers);
//         expect(fetch).toHaveBeenCalledWith('https://api.example.com/users');
//         expect(fetch).toHaveBeenCalledTimes(1);
//     });

//     // Test trường hợp lỗi
//     it('throws error when fetch fails', async () => {
//         // Mock response lỗi
//         fetch.mockResolvedValueOnce({
//             ok: false,
//         });

//         // Kiểm tra lỗi được throw
//         await expect(getUsers()).rejects.toThrow('Lỗi khi tải danh sách người dùng');
//         expect(fetch).toHaveBeenCalledWith('https://api.example.com/users');
//         expect(fetch).toHaveBeenCalledTimes(1);
//     });
// });


import axios from 'axios';

// Mock module axios
jest.mock('axios');

describe('getUsers', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetches users successfully', async () => {
        // Mock response thành công
        const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
        axios.get.mockResolvedValueOnce({
            status: 200,
            data: mockUsers,
        });

        // Gọi hàm và kiểm tra kết quả
        const result = await getUsers();
        expect(result).toEqual(mockUsers);
        expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users');
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it('throws error when fetch fails', async () => {
        // Mock response lỗi
        axios.get.mockResolvedValueOnce({
            status: 404,
        });

        // Kiểm tra lỗi được throw
        // await expect(getUsers()).rejects.toThrow('Lỗi khi tải danh sách người dùng');
        await expect(getUsers()).rejects.toEqual(new Error('Lỗi khi tải danh sách người dùng'));

        expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users');
        expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it('throws error on network failure', async () => {
        // Mock lỗi mạng (rejected promise)
        axios.get.mockRejectedValueOnce(new Error('Network Error'));

        await expect(getUsers()).rejects.toThrow('Network Error');
        expect(axios.get).toHaveBeenCalledWith('https://api.example.com/users');
    });
});
