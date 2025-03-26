// module.exports = {
//     testEnvironment: 'jsdom', // Giả lập DOM cho React/Next.js
//     setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // File setup
//     moduleNameMapper: {
//       // Map các import kiểu module (nếu dùng CSS/SCSS modules)
//       '^.+\\.(css|scss|sass)$': 'identity-obj-proxy',
//       // Mock các file tĩnh (ảnh, font, v.v.)
//       '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
//       '^next/router$': '<rootDir>/__mocks__/next/router.js',

//       '^@/Components/(.*)$': '<rootDir>/Components/$1', // Thêm mapping cho alias Components
//     },
//     moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],

//     transform: {
//       '^.+\\.(js|jsx)$': 'babel-jest', // Chuyển đổi JS/JSX
//     //   "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { configFile: "./babel.config.test.js" }],
//     },
//     // setupFiles: ["./jest.setup.js"],
// };


module.exports = {
    testEnvironment: 'jsdom', // Giả lập DOM cho React/Next.js
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // File setup
    moduleNameMapper: {
        // Map các import kiểu module (CSS/SCSS modules)
        '^.+\\.(css|scss|sass)$': 'identity-obj-proxy',
        // Mock các file tĩnh (ảnh, font, v.v.)
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
        // Mock next/router
        '^next/router$': '<rootDir>/__mocks__/next/router.js',
        // Alias cho @/Components
        '^@/Components/(.*)$': '<rootDir>/Components/$1',
    },
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    transform: {
        // Dùng @swc/jest để xử lý JS, JSX, TS, TSX
        '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
    },
    // Bỏ qua node_modules, trừ các module cần transform (nếu có)
    transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
};