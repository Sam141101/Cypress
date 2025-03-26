import { calculateScore } from '../../Components/quizUtils'

test("Tổng điểm quiz game", () => {
    const answer = [
        { isCorrect: true },
        { isCorrect: false },
        { isCorrect: true },
    ]

    expect(calculateScore(answer)).toBe(2)
})