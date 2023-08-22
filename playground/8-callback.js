const doWorkCallback = (callback) => {
    setTimeout(() => {
        // callback('This is error', undefined)
        callback(undefined, [1,4,7])
    }, 2000)
}

doWorkCallback((error, result) => {
    if(error) {
        return console.log('Error:', error)
    }

    console.log('Success:', result)
})


//
//                                  fulfilled
//                              /
//  Promise     --pending-->
//                              \
//                                  rejected
//
