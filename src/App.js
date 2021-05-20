import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import { db } from './firebase';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
// import DateTime from './datetime.js'


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const classes = useStyles();

  //when the app loads , we need to listen to the datbase and fetch new todos as they get added/remove

  useEffect(()=>{
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot=>{
      console.log(snapshot.docs.map(doc => doc.data()));
      setTodos(snapshot.docs.map(doc => ({id : doc.id,todo:doc.data().todo, deadline :doc.data().deadline})));
    })
  },[])


  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault(); // will stop the refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      deadline : input2,
    })

    setTodos([...todos, (input,input2)]);   // append (input) to todos
    setInput('');   //clear up the input after enter
    setInput2('');   //clear up the input after enter
  };

  return (
    <div className="App">
      <h1>Todo-App</h1>
      <form className = "formadd" >
        <FormControl >
          <InputLabel htmlFor="my-input">Write a todo</InputLabel>
          <Input 
        value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <FormControl >
      <Input
      value={input2} onChange={event => setInput2(event.target.value)}
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: false,
        }}
        style ={{
          marginTop:"16px",
          marginLeft:"15px",
        }}
      />
        
        </FormControl>
        <Button style ={{
          marginTop:"10px",
          marginLeft:"15px",
        }} disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
          Add todo
        </Button>
      </form>

      <ul className = "ul">
      {todos.map((todo,deadline) => (
        <Todo todo={todo}  deadline = {deadline}/>
      ))}
      </ul>

      <h4 className="myself"
      style={{
        // position:"reltive",
        bottom:"0",
        marginTop:"20px",
        left:"0%",
        display:"block",
        width:"100%"
        // marginLeft:"-400px",
        
      }}>This app is created by  <a href = "https://instagram.com/anuj_gusain108" target ="_blank" rel ="noreferrer"> Anuj Gusain</a> </h4>
    </div>
  );
}

export default App;
