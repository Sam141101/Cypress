import { render, screen, waitFor } from '@testing-library/react';
import UserList from '@/Components/api/UserList';
import { getUsers } from '../../Components/api/getUsers'

// Mock module chứa getUsers
jest.mock('../../Components/api/getUsers');

describe("User list", () => {
    afterEach(() => {
        jest.clearAllMocks();
    })

    test('Tạo danh sách người dùng khi gọi api thành công', async () => {
        // Mock dữ liệu thành công
        const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]
        getUsers.mockResolvedValueOnce({
            status: 200,
            data: mockUsers
        })

        render(<UserList />)

        screen.debug()

        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Jane')).toBeInTheDocument();
        })

        expect(getUsers).toHaveBeenCalledTimes(1);
    })


    test("Tạo danh sách người dùng thất bại", async () => {

        // mock lỗi
        getUsers.mockRejectedValueOnce(new Error('Lỗi khi tải danh sách người dùng'));

        render(<UserList />)

        await waitFor(() => {
            expect(screen.getByText("Lỗi khi tải danh sách người dùng")).toBeInTheDocument();
        })

        expect(getUsers).toHaveBeenCalledTimes(1);
    })
})
