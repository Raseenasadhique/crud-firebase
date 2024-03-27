<template>
  <div class="todo">
    <div class="title has-text-centered">TODO</div>

    <form @submit.prevent="addTodo">
      <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input v-model="newTodoContent" class="input" type="text" placeholder="Add a todo" />
        </p>
        <p class="control">
          <button :disabled="!newTodoContent" class="button is-info">Add</button>
        </p>
      </div>
    </form>

    <div div v-for="todo in todos" class="card mb-5" :class="{'has-background-success-light':todo.done}" v-bind:key="todo">
      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{'has-text-success line-through':todo.done}">
              {{ todo.content }}
            </div>
            <div class="column is-5 has-text-right">
              <button @click="toggleDone(todo.id)" class="button is-light" :class="todo.done?'is-success':'is-light'">&check;</button>
              <button @click="deleteTodo(todo.id)" class="button is-danger ml-2">&cross;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
// import { v4 as uuidv4 } from 'uuid';
import { collection, onSnapshot,addDoc,deleteDoc,doc,updateDoc, orderBy, query} from "firebase/firestore";
import { db } from "@/firebase";


const todosCollectionRef=collection(db,'todos')
const todoCollectionQuery=query(todosCollectionRef,orderBy('date','desc'))


const todos = ref([
  // {
  //   id: "id1",
  //   content: "New Todo",
  //   done: false,
  // },
  // {
  //   id: "id2",
  //   content: "Update Todo",
  //   done: true,
  // },
]);

onMounted(()=>{
  
//   const querySnapshot = await getDocs(collection(db, "todos"));
//   let fbTodos=[]
//   querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
//   const todo={
//     id:doc.id,
//     content:doc.data().content,
//     done:doc.data().done
//   }
//   fbTodos.push(todo)
// });
  
// todos.value=fbTodos
  
  // console.log('mounted');

  onSnapshot(todoCollectionQuery ,(querySnapshot) => {
  const fbTodos = [];
  querySnapshot.forEach((doc) => {
    const todo={
    id:doc.id,
    content:doc.data().content,
    done:doc.data().done
  }

  fbTodos.push(todo)
  });
 todos.value=fbTodos
});

})


const newTodoContent = ref("");

const addTodo = () => {
  addDoc(todosCollectionRef, {
 content:newTodoContent.value,
 done:false,
 date:Date.now()
});

//  const newTodo={
//   id: uuidv4(),
//     content: newTodoContent.value,
//     done: false,
//  }
//  todos.value.unshift(newTodo);
 newTodoContent.value='';
 console.log('newTodo',addTodo);
//  console.log('newTodo',addDoc);
};


const deleteTodo=id=>{
  deleteDoc(doc(todosCollectionRef, id));

}

const toggleDone=id=>{
 
  const index=todos.value.findIndex(todo=>todo.id===id)
  // todos.value[index].done=!todos.value[index].done

  // const washingtonRef = doc(db, "cities", "DC");

// Set the "capital" field of the city 'DC'
 updateDoc(doc(todosCollectionRef,id), {
  done:!todos.value[index].done
});
  console.log('index',index);
}

// export default {

// }
</script>

<style>
@import "bulma/css/bulma.min.css";

.todo {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
.line-through{
  text-decoration: line-through;
}
</style>