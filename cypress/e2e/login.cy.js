// describe('Login Test', () => {
//     beforeEach(() => {
//         cy.visit('https://agent.starglobal3d.com/login'); // Truy cập trước mỗi test
//     });


//     it('Visit successfully', () => {
//         cy.url().should('include', '/login'); // 4. Kiểm tra điều hướng thành công
//     });

//     it('Login successfully', () => {
//         cy.get('input[type="text"]').type('sang'); // 2. Tìm ô input và nhập tên đăng nhập
//         cy.get('input[type="password"]').type('141101'); // Nhập mật khẩu
//         cy.get('button[type="submit"]').click(); // 3. Click vào nút login
//         cy.url().should('include', '/chats'); // 4. Kiểm tra điều hướng thành công
//     });

//     it('Login failed', () => {
//         cy.get('input[type="text"]').type('sang'); // 2. Tìm ô input và nhập tên đăng nhập
//         cy.get('input[type="password"]').type('141101123'); // Nhập mật khẩu
//         cy.get('button[type="submit"]').click(); // 3. Click vào nút login
//         cy.url().should('include', '/login'); // 4. Kiểm tra điều hướng thành công

//         cy.get('.ant-notification-notice') // Lớp mặc định của notification
//             .should('be.visible')
//             .and('contain', 'Error');
//     });

    
//     it('Redirect Landing Page', () => {
//         cy.get('img[alt="SG3D Agent"]').should('be.visible');
//         cy.get('img[alt="SG3D Agent"]').click();
      
//         cy.url().should('include', '/'); // 4. Kiểm tra điều hướng thành công
//     });

// });
