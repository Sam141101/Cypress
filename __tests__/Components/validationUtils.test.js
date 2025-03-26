import { validateEmail } from '../../Components/validationUtils'

test("Kiểm tra email hợp lệ", () => {
    expect(validateEmail("vuhuysang147@gmail.com")).toBe(true)
    expect(validateEmail("vuhuysan")).toBe(false)
})