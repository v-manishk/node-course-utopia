// const doWork = async() => {
//     return 'done'
// }

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}

const doWork = async() => {
    const sum = await add(10, 20)
    console.log(sum)
    const sum2 = await add(sum, 100)
    console.log(sum2)
    return sum2
}

doWork().then((result) => {
    console.log('result!', result)
}).catch((e) => {
    console.log('e',e)
})