import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default function App() {
  // State of the App
  const [todos, setTodos] = useState([
    // { id: 'irfbifif', task: "first Todo", completed: false },
    // { id: 'jijbiuve', task: "Second Todo", completed: false },
    // { id: 'ifdninifd', task: "Second Todo", completed: false },
  ]);
  const [textInput, setTextInput] = useState('')

  const addTodo=()=>{
    if(textInput == ''){
      alert('Please enter a Todo')
    }else{
      const newTodo = {
        id: Math.random().toString(),
        task: textInput,
        completed: false,
      }
      setTodos([newTodo, ...todos]);
      setTextInput('')
    };
  };


  const markTodo =(todoId)=>{
      alert('Todo Done');
    const newTodos = todos.map((item)=>{
      if(item.id === todoId){
        return {...item, completed: true}
      }
      return item;
    });
    setTodos(newTodos);
  };
  const deleteTodo = (todoId) => {
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  };
  const clearAllTodos = () =>{
    Alert.alert('Confirm', 'All Todos cleared', [
      {text: 'Ok', onPress: ()=> setTodos([]) },
    ]
      )
    setTodos([]);
  }

  return (
   
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar style="auto" />
      {/* Head */}
      <View style={styles.head}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
          Todo App
        </Text>
        <AntDesign name="delete" size={24} color="white" onPress={clearAllTodos} />
      </View>

    {/* Add input */}
      <View style={styles.bottom}>
        <View style={styles.input}>
          <TextInput placeholder="Add a Todo" 
          value={textInput}
          onChangeText={text=> setTextInput(text)} />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.button}>
            <Ionicons name="add-circle" size={40} color="green" />
          </View>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ padding: 20, paddingBottom: 100, color: "black" }}
        data={todos}
        keyExtractor={({index, id}) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.list}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textDecorationLine: item?.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {item.task}
                </Text>
              </View>
              {
               !item?.completed && (
                <TouchableOpacity style={[{right: 20},styles.doneIcon]}
                 onPress={()=>markTodo(item?.id)} >
                <FontAwesome name="check-circle" size={30} color="green" />
              </TouchableOpacity>
               )
              }
              <TouchableOpacity style={[styles.doneIcon]} onPress={()=>deleteTodo(item?.id)}>
                <AntDesign name="delete" size={30} color="red" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
  },

  list: {
    padding: 20,
    color: "white",
    backgroundColor: "white",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 7,
    marginVertical: 10,
    alignItems: "center",
    
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "blue"
  },

  doneIcon: {
    alignItems: "center",
    justifyContent: "center",
  },

  bottom: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 'auto',
    backgroundColor: "blue",
    color: "white",
    width: "100%",
  },

  input: {
    backgroundColor: "white",
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 30,
    height: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    width: 50,
    color: "green",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
