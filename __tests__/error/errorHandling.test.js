import { fetchWithErrorHandling } from '../../Components/error/errorHandling'

// global.fetch = jest.fn(() => Promise.resolve({ ok: false, status: 404 }));

// test("Xử lý lỗi 404 khi gọi API", async () => {
//   const result = await fetchWithErrorHandling("https://api.example.com");
//   expect(result.error).toBe("Lỗi: 404");
// });

global.fetch = jest.fn();

describe('Error', () => {

    test('Xử lý lỗi 404 khi gọi API', async () => { 
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        })

        const result = await fetchWithErrorHandling("https://api.example.com");

        expect(result.error).toBe("Lỗi: 404")
    })
})
