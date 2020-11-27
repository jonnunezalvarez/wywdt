import React, { useState } from 'react'
import { FlatList, Text, TextInput, Button } from 'react-native'

const TaskList = () => {
    // TODO delete
    const initialTasks = [
        { id: '1', task: 'Code Review' },
        { id: '2', task: 'Finish wordings' },
        { id: '3', task: 'Continue with Guide +- 1 hour' },
        { id: '4', task: 'Deploy service XXX to integration for testing' }
    ]

    const [newTask, setNewTask] = useState('')
    const [tasks, setTasks] = useState(initialTasks)


    return (
        <React.Fragment>
            <TextInput
                placeholder="Type here to add new task"
                onChangeText={newTask => setNewTask(newTask)}
                value={newTask}
            />
            <Button
                title={'Add'}
                onPress={() => { 
                    if (newTask && newTask !== '') {
                        setTasks([...tasks, { id: `${tasks.length + 1}`, task: newTask }]) 
                        console.log('haha')
                        setNewTask('')
                    }
                }}
            />
            <FlatList
                data={tasks}
                renderItem={
                    ({ item }) => <Text>{item.id}. {item.task}</Text>
                }
            />
        </React.Fragment>
    )
}

export default TaskList