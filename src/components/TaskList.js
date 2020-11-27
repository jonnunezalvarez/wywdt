import React, { useState, useEffect } from 'react'
import { FlatList, Text, TextInput, Button } from 'react-native'
import { v4 as uuidv4 } from 'uuid'

import AsyncStorage from '@react-native-async-storage/async-storage'

const saveData = async (task) => {
    try {
        console.log(`saving new task '${task}'`)
        await AsyncStorage.setItem(uuidv4(), task)
    } catch (e) {
        console.log(`Could not save the new task: ${e}`)
    }
}

const TaskList = () => {
    const [newTask, setNewTask] = useState('')
    const [tasks, setTasks] = useState([])

    const getData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const data = await AsyncStorage.multiGet(keys)
            setTasks(data)
        } catch (e) {
            console.log(`Could not get tasks: ${e}`)
        }
    }

    const removeTask = async (taskId) => {
        try {
            await AsyncStorage.removeItem(taskId)
        } catch(e) {
            console.log(`Could not remove task: ${taskId} - ${e}`)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <React.Fragment>
            <TextInput
                placeholder="Type here to add new task"
                onChangeText={newTask => setNewTask(newTask)}
                value={newTask}
            />
            <Button
                title={'Add'}
                onPress={async () => {
                    if (newTask && newTask !== '') {
                        await saveData(newTask)
                        await getData()
                    }
                }}
            />
            <FlatList
                data={tasks}
                renderItem={
                    ({ item }) =>
                        <React.Fragment>
                            <Text>{`=> ${item[1]}`}</Text>
                            <Button
                                title={'Delete'}
                                onPress={async () => {
                                    console.log(`Deleting task...${item[0]} : ${item[1]}`)
                                    await removeTask(item[0])
                                    await getData()
                                }}
                            />
                        </React.Fragment>

                }
            />
        </React.Fragment>
    )
}

export default TaskList