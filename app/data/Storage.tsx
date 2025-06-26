import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  title: string;
  desc: string;
  mat: string;
  prof: string;
  date: Date;
};

const useStorage = ()=>{

    const get = async(id: string):Promise<Task[]>=>{
        try {
            //procura a atividade pelo id
            const task = await AsyncStorage.getItem(id)
            return JSON.parse(task ?? '[]') || []
        }catch(err){
            alert("erro ao buscar a tarefa: "+ err)
            return []
        }
    }

    const save = async(id:string, value: Task): Promise<void>=>{
        try{
            let tasks = await get(id)
            tasks.push(value)
            await AsyncStorage.setItem(id, JSON.stringify(tasks))
        }catch(err){
            alert("não foi possível inserir a tarefa: "+ err)
        }
    }

    const remove = async(id:string, item: Task)=>{
        try{
            //procura a atividade pelo id
            let tasks = await get(id)
            //filtra as tasks dentro da variável my task, retornando todos os valores, menos o selecionado
            let myTasks = tasks.filter((task: Task)=>{
                return(
                    task !== item 
                )
            })
            //seta todos os itens atuais no banco
            await AsyncStorage.setItem(id, JSON.stringify(myTasks))
            //retorna a lista de tarefas sem a tarefa selecionada
            return myTasks
        }catch(err){
            alert("não foi possível deletar a tarefa: "+ err)
        }
    }

    return{
        get,
        save,
        remove
    }
}

export default useStorage;