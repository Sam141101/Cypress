import { calculateTotal  } from '../../Components/cartUtils'

test("Tổng giá trị giỏ hàng", () => {
    const cart = [
        { price: 100, quantity: 2 },
        { price: 50, quantity: 1 }
    ]

    expect(calculateTotal(cart)).toBe(250)
})