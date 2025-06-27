import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
    id: string;
    title: string;
    desc: string;
    mat: string;
    prof: string;
    date: Date;
};

const useStorage = () => {

    const get = async (id: string): Promise<Task[]> => {
        try {
            //procura a atividade pelo id
            const task = await AsyncStorage.getItem(id)
            return JSON.parse(task ?? '[]') || []
        } catch (err) {
            alert("erro ao buscar a tarefa: " + err)
            return []
        }
    }

    const save = async (id: string, value: Task): Promise<void> => {
        try {
            let tasks = await get(id)
            tasks.push(value)
            await AsyncStorage.setItem(id, JSON.stringify(tasks))
        } catch (err) {
            alert("não foi possível inserir a tarefa: " + err)
        }
    }

    const remove = async (id: string, itemId: string): Promise<Task[]> => {
        try {
            let tasks = await get(id);
            let myTasks = tasks.filter((task) => task.id !== itemId);
            await AsyncStorage.setItem(id, JSON.stringify(myTasks));
            return myTasks;
        } catch (err) {
            alert("não foi possível deletar a tarefa: " + err);
            return [];
        }
    };


    return {
        get,
        save,
        remove
    }
}

export default useStorage;