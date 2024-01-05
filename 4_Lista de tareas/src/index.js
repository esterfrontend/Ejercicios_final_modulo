// Remove task when is completed
const completedTask = (button) => {
    const task = button.parentElement
    task.remove()
}

// Add new task
const taskList = document.querySelector('#taskList')
const createTaskButton = document.querySelector('#createTaskButton')
let titleNewTask = document.querySelector('#titleNewTask')

createTaskButton.addEventListener('click', (e) => {
    e.preventDefault()

    titleNewTask = document.querySelector('#titleNewTask')
    let descriptionNewTask = document.querySelector('#descriptionNewTask')

    if(titleNewTask.value) {
        // Create item
        const listItem = document.createElement('li')
        taskList.appendChild(listItem).classList.add('task')

        // Create button
        const completedTaskButton = document.createElement('button')
        completedTaskButton.setAttribute('click', 'completedTask(this)')
        listItem.appendChild(completedTaskButton)
        
        // Create div
        const itemContainer = document.createElement('div')
        listItem.appendChild(itemContainer)

        // Create title
        const taskTitle = document.createElement('h3')
        taskTitle.textContent = titleNewTask.value
        itemContainer.appendChild(taskTitle)
        
        // Create description
        if(descriptionNewTask) {
            const taskDescription = document.createElement('p')
            taskDescription.textContent = descriptionNewTask.value
            itemContainer.appendChild(taskDescription)
        }

    }

    // Reset form
    titleNewTask.value = ''
    descriptionNewTask.value = ''
    createTaskButton.setAttribute('disabled', '')
})

// Remove all tasks
const completeAllTasks = document.querySelector('#completeAllTasks') 

completeAllTasks.addEventListener('click', () => {
    const allTasksArr = document.querySelectorAll('.task')
    allTasksArr.forEach(element => {
        element.remove()
    });
})

// Disable button if title is empty
titleNewTask.addEventListener('input', () => {
    if (!titleNewTask.value.trim().length) {
        createTaskButton.setAttribute('disabled', '')
    } else {
        createTaskButton.removeAttribute('disabled')    
    }
})
