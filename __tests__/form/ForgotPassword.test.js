import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import ForgotPassword from "@/Components/form/ForgotPassword";
import { useRouter } from "next/router";
import authServices from "../../utils/services/auth"; // Mock API call
import { useTranslations } from 'next-intl';
import { notification } from 'antd';

// mock
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}))


// Mock next-intl
jest.mock('next-intl', () => ({
    useTranslations: jest.fn(),
}));

// Mock next/router
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

// Mock authServices
jest.mock('../../utils/services/auth', () => ({
    sendMailResetPassword: jest.fn(),
}));

// Mock antd notification
jest.mock('antd', () => {
    const antd = jest.requireActual('antd');
    return {
        ...antd,
        notification: {
            useNotification: jest.fn(),
        },
    };
});

describe('ForgotPassword', () => {
    let mockPush;
    let mockT;
    let mockNotificationApi;

    beforeEach(() => {
        // Mock useTranslations
        mockT = jest.fn((key) => {
            const translations = {
                'forgot_password.title': 'Forgot Password',
                'forgot_password.description': 'Enter your email to reset password',
                'signup.email': 'Email',
                'signup.required_email': 'Please enter your email',
                'signup.placeholder_email': 'Enter your email',
                'forgot_password.submit': 'Submit',
            };
            return translations[key] || key;
        });
        useTranslations.mockReturnValue(mockT);

        // Mock useRouter
        mockPush = jest.fn();
        useRouter.mockReturnValue({
            push: mockPush,
        });

        // Mock notification
        mockNotificationApi = {
            warning: jest.fn(),
            info: jest.fn(),
        };
        notification.useNotification.mockReturnValue([mockNotificationApi, null]);
    });

    beforeAll(() => {
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // deprecated
            removeListener: jest.fn(), // deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          })),
        });
      });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Hiển thị lỗi khi gửi email reset password thất bại', async () => {
        // Mock API trả về lỗi
        authServices.sendMailResetPassword.mockResolvedValueOnce({
            data: { error: 'User not found' },
        });

        // Render component
        render(<ForgotPassword />);

        // Kiểm tra tiêu đề và mô tả
        expect(screen.getByText('Forgot Password')).toBeInTheDocument();
        expect(screen.getByText('Enter your email to reset password')).toBeInTheDocument();

        // Nhập email
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
            target: { value: 'wrong@example.com' },
        });

        // Submit form
        fireEvent.click(screen.getByText('Submit'));

        // Chờ và kiểm tra thông báo lỗi
        await waitFor(() => {
            expect(mockNotificationApi.warning).toHaveBeenCalledWith({
                message: 'Warning',
                description: 'Opp! Some things went wrong, User not found',
            });
        });

        // Kiểm tra API được gọi với đúng tham số
        expect(authServices.sendMailResetPassword).toHaveBeenCalledWith({
            body: {
                username: '',
                email: 'wrong@example.com',
            },
        });

        // Kiểm tra form được reset
        expect(screen.getByPlaceholderText('Enter your email').value).toBe('');
    });

    test('Hiển thị thông báo thành công và điều hướng khi gửi email reset password thành công', async () => {
      // Mock API trả về thành công
      authServices.sendMailResetPassword.mockResolvedValueOnce({
        data: { message: 'Email sent successfully' },
      });

      // Render component
      render(<ForgotPassword />);

      // Nhập email
      fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
        target: { value: 'test@example.com' },
      });

      // Submit form
      fireEvent.click(screen.getByText('Submit'));

      // Chờ và kiểm tra thông báo thành công
      await waitFor(() => {
        expect(mockNotificationApi.info).toHaveBeenCalledWith({
          message: 'Account Info',
          description: 'Email sent successfully',
        });
      });

      // Kiểm tra điều hướng
      expect(mockPush).toHaveBeenCalledWith('/login');

      // Kiểm tra form được reset
      expect(screen.getByPlaceholderText('Enter your email').value).toBe('');
    });

    test('Hiển thị lỗi validation khi không nhập email', async () => {
      // Render component
      render(<ForgotPassword />);

      // Submit form mà không nhập email
      fireEvent.click(screen.getByText('Submit'));

      // Kiểm tra lỗi validation
      await waitFor(() => {
        expect(screen.getByText('Please enter your email')).toBeInTheDocument();
      });

      // Kiểm tra API không được gọi
      expect(authServices.sendMailResetPassword).not.toHaveBeenCalled();
    });

   
});