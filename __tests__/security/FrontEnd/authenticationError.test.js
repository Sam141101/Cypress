import { screen, render, fireEvent } from "@testing-library/react";
import Login from '@/Components/security/FrontEnd/AuthenticationError';
import { describe } from "@jest/globals";
import { signIn } from 'next-auth/react';

// jest.mock("next-auth/react", () => ({
//     signIn: jest.fn(() => ({ ok: false }))
// }))

// describe("Login", () => {
//     it("show error on failed login", async () => {
//         const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

//         render(<Login />);
        
//         const button = screen.getByRole("button");
//         fireEvent.click(button);
//         expect(consoleLogSpy).toHaveBeenCalledWith('Login failed');
//     })
// })

jest.mock("next-auth/react")

describe("Login", () => {
    it("show error on failed login", async () => {
        render(<Login />);
        
            // Kiểm tra xem các input và button có trên trang
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    })

    test('calls signIn on form submit with correct values', async () => {
        signIn.mockResolvedValueOnce({ ok: true }); // Giả lập thành công
    
        render(<Login />);
        
        fireEvent.change(screen.getByPlaceholderText(/username/i), {
          target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
          target: { value: 'testpassword' },
        });
        
        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        
        // Kiểm tra xem signIn được gọi với giá trị đúng
        expect(signIn).toHaveBeenCalledWith('credentials', {
          redirect: false,
          username: 'testuser',
          password: 'testpassword',
        });
      });
    
      test('shows error message on login failure', async () => {
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        signIn.mockResolvedValueOnce({ ok: false }); // Giả lập thành công
    
        render(<Login />);
        
        fireEvent.change(screen.getByPlaceholderText(/username/i), {
          target: { value: 'testuser' },
        });
        fireEvent.change(screen.getByPlaceholderText(/password/i), {
          target: { value: 'testpassword' },
        });
        
        const button = screen.getByRole('button', { name: /login/i });
        fireEvent.click(button);

        // await new Promise((resolve) => setTimeout(resolve, 0));

        expect(await signIn).toHaveBeenCalledWith('credentials', {
            redirect: false,
            username: 'testuser',
            password: 'testpassword',
          });

        expect(consoleLogSpy).toHaveBeenCalledWith('Login failed');

        consoleLogSpy.mockRestore();
    });
})