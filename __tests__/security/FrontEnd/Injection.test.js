// __tests__/SafeContent.test.js
import { render, screen } from '@testing-library/react';
import Injection from '../../../Components/security/FrontEnd/Injection';

describe('SafeContent Component - XSS Prevention', () => {
  // Test 1: Loại bỏ mã độc
  it('removes malicious scripts from content', () => {
    const maliciousContent = '<script>alert("Hacked")</script>Hello World';
    render(<Injection content={maliciousContent} />);
    
    // Kiểm tra văn bản an toàn vẫn hiển thị
    expect(screen.getByText('Hello World')).toBeInTheDocument();
    
    // Kiểm tra không có thẻ script trong DOM
    expect(document.querySelector('script')).toBeNull();
  });

  // Test 2: Giữ nguyên nội dung an toàn
  it('displays safe content correctly', () => {
    const safeContent = 'This is a safe message';
    render(<Injection content={safeContent} />);
    
    expect(screen.getByText('This is a safe message')).toBeInTheDocument();
  });

  // Test 3: Ngăn chặn thuộc tính nguy hiểm
  it('removes dangerous attributes', () => {
    const dangerousContent = '<img src="x" onerror="alert(\'Hacked\')" />';
    render(<Injection content={dangerousContent} />);
    
    // Kiểm tra không có thuộc tính onerror trong DOM
    const img = document.querySelector('img');
    expect(img).toBeNull(); // Vì allowedTags rỗng, thẻ img也被移除 (bị xóa)
  });
});