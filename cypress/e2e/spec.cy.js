describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/'); // Truy cập trước mỗi test
    });


    it('Visit successfully', () => {
        cy.get('img[alt="Next.js logo"]').should('be.visible');
        cy.url().should('include', '/'); // 4. Kiểm tra điều hướng thành công
    });

   
});
