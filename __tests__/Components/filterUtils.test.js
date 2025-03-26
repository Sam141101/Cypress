import { filterUsers } from '../../Components/filterUtils'

test("Lọc danh sách người theo tên", () => {
    const users = [
        { name: 'Sang' },
        { name: 'Quân' },
        { name: 'Ngọc' },
        { name: 'Lam' }
    ]

    expect(filterUsers(users, "Sang")).toEqual([{ name: 'Sang' }]);
})