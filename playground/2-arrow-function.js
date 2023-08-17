// const square = function (x) {
//     return x * x
// }

// const square = (x) => {
//     return x * x
// }

// const square = (x) => x * x

// console.log(square(59))

const event = {
    name: 'Birthday Party',
    guestList: ['Manish', 'Vishal', 'Ravi'],
    printGuestList() {
        console.log('Guest List for ' + this.name)

        this.guestList.forEach((guest) =>  {
            console.log(guest + ' is present in the ' + this.name)
        })
    }
}

event.printGuestList()