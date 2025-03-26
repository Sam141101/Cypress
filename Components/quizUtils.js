export const calculateScore = (answers) => {
    return answers.reduce((total, answer) => {
        if(answer.isCorrect == true) {
            total = total + 1;
        }

        return total
    } , 0)
}