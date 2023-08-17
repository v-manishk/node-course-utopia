//
// Goal: Create method to get incomplete tasks
//
// 1. Define getTasksToDo method
// 2. Use filter to to return just the incompleted tasks (arrow function)
// 3. Test your work by running the script

const tasks = {
    tasks: [{
        text: 'Grocery shopping',
        completed: true
    },{
        text: 'Clean yard',
        completed: false
    }, {
        text: 'Film course',
        completed: false
    }],

    getTasksToDo() {

        return this.tasks.filter((task) => task.completed === false)

        // return this.tasks.filter((task) => {
        //     return task.completed === false
        // })

        // const pendingTask = this.tasks.filter((task) => {
        //     return task.completed === false
        // })
        // return pendingTask

        // const newTask = []
        // this.tasks.forEach((task) => {
        //     if (task.completed === false) {
        //         newTask.push(task)
        //     }
        // })
        // return newTask
    }
}

console.log(tasks.getTasksToDo())