import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginForm from '../../Components/form/LoginForm'
import { login } from '../../Components/api/login'

// mock
jest.mock("../../Components/api/login")

describe("Form login", () => {
    test("Nút submit không được kích hoạt khi chưa nhập gì", () => {

        render(<LoginForm email="" password="" onChange={() => { }} />)

        const emailInput = screen.getByTestId("email-input");
        expect(emailInput).toHaveValue("")
        const passwordInput = screen.getByTestId("password-input");
        expect(passwordInput).toHaveValue("")
        const button = screen.getByRole("button", { name: "Đăng nhập" })

        expect(button).toBeDisabled();
    })

    test("Nút submit được kích hoạt đủ email và password", async () => {
        render(<LoginForm email="" password="" onChange={() => { }} />)

        expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeDisabled;

        fireEvent.change(screen.getByTestId("email-input"), { target: { value: 'vuhuysang147@gmail.com' } })
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: '141101' } })

        expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeEnable
    })

    test("Đăng nhập không thành công", async () => {
        render(<LoginForm email='vuhuysang147@gmail.com' password="141101" onChange={() => { }} />)

        login.mockRejectedValueOnce(new Error('Đăng nhập không thành công'))


        expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeDisabled;

        fireEvent.change(screen.getByTestId("email-input"), { target: { value: 'vuhuysang147@gmail.com' } })
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: '1344' } })

        expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeEnable;

        await expect(login("vuhuysang147@gmail.com", "141101")).rejects.toThrow("Đăng nhập không thành công");

        expect(login).toHaveBeenCalledTimes(1);
    })


    test("Đăng nhập thành công", async () => {
        render(<LoginForm email='vuhuysang147@gmail.com' password="141101" onChange={() => { }} />)

        login.mockResolvedValueOnce({ message: "Đăng nhập thành công" });

        expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeDisabled;

        fireEvent.change(screen.getByTestId("email-input"), { target: { value: 'vuhuysang147@gmail.com' } })
        fireEvent.change(screen.getByTestId("password-input"), { target: { value: '141101' } })

        expect(screen.getByRole("button", { name: "Đăng nhập" })).toBeEnable;

        // Chờ API được gọi và hiển thị thông báo thành công
        await waitFor(() => {
            expect(login).toHaveBeenCalledTimes(1);
            expect(login).toHaveBeenCalledWith("vuhuysang147@gmail.com", "141101");
        });
    })
})
