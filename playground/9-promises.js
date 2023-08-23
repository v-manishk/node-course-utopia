// const doWorkPromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve([7,4,1])
//         reject('Something went Wrong!')
//     }, 2000)
// })

// doWorkPromise.then((result) => {
//     console.log('Success!', result)
// }).catch((error) => {
//     console.log('Error!', error)
// })


// Simulating and Learning Promise Chaining

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b)
        }, 2000)
    })
}


// method call without Promise Chaining
// add(2, 3).then((sum) => {
//     console.log(sum)

//     add(10, sum).then((sum2) => {
//         console.log(sum2)
//     }).catch((e) => {
//         console.log(e)
//     })
// }).catch(() => {
//     console.log(e)
// })

// method call with Promise Chaining
add(2, 4).then((sum) => {
    console.log(sum)

    return add(10, sum)
}).then((sum2) => {
    console.log(sum2)
}).catch((e) => {
    console.lof(sum3)
})