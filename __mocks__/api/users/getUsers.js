// export const getUsers = jest.fn() => {

// }

export const getUsers = jest.fn(async() => {
    return [
        { id: 1, name: "Sang" },
        { id: 2, name: "Quân" },
    ]
} );