import { Button, FormControl, Input, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react';
import './Todo.css';
import { db } from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState();
    const [input2, setInput2] = useState(props.todo.deadline);

    const updateTodo = (event) => {
        event.preventDefault();
        //update the todo with new input text
        if (input ) {
            db.collection('todos').doc(props.todo.id).set({
                todo: input,
                deadline: input2
            }, { merge: true })

            setOpen(false);
            setInput();
        }
        else {
            window.alert("Can't update with empty input value");
        }
    }

    return (
        <>
            <Modal style={{
                top: `0`,
                left: `0`,
                right: `0`,
                bottom: `0`,
                margin: 'auto',
                positon: 'absolute',
                modalBorder: '20px',
                borderRadius: "500px",
                display: 'flex',
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center',
                
            }}
                open={open}
                onClose={e => setOpen(false)}
            >
                <div className={classes.paper} 
                style={{
                    width:'200px',
                }}
                >
                    <h1>Update todo </h1>
                    <form>
                        <FormControl >
                            <Input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)} />
                            </FormControl>
                            <FormControl>
                                
                            <Input
                                value={input2} onChange={event => setInput2(event.target.value)
                                }
                                // placeholder={props.todo.deadline}
                                id="datetime-local"
                                label="Next appointment"
                                type="datetime-local"
                                defaultValue={props.todo.deadline}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: false,
                                }}
                                style={{
                                    // marginTop: "16px",
                                }}
                            />
                        </FormControl>
                        <Button style={{
                            marginLeft: "35px",
                            marginTop:"5px"
                        }}
                            disabled={!input} variant="contained" type="submit" onClick={updateTodo}>Update todo</Button>
                    </form>
                </div>

            </Modal>
            <List className="todo__list"
                style={{
                    display: "flex",
                    alignItems: "center",
                    width: "60%",
                    margin: "auto",
                    padding: "10px",
                    marginBottom: "15px",

                }}>

                <ListItem >

                    <ListItemAvatar>
                    </ListItemAvatar>
                    <ListItemText className="listitem" primary={props.todo.todo} secondary={props.todo.deadline}
                    />



                </ListItem>
                <Button className="editme" onClick={e => { setOpen(true) }}>Edit Me</Button>


                <DeleteIcon className="dlt"
                    onClick={event => db.collection('todos').doc(props.todo.id).delete()} />

            </List>
        </>
    )
}

export default Todo
