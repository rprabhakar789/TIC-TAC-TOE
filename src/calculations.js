import React, { useState, useEffect, useRef } from "react";
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Nav, Button,Container, Card, Box} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CongratulationsDialog from './CongratulationsDialog'
//import { red, blue } from 'material-ui/colors'
export const didComplete=(key, turn, cell)=>{
    console.log(key)
    console.log(cell)
    var row = Math.floor(key/3);
    var col = key%3;
    console.log(row+" "+col);
    var sym = turn%2==0?'O':'X';
    var winningcells;
    if(
      cell[row*3+1]==sym&&
      cell[row*3+2]==sym&&
      cell[row*3+3]==sym
    ){
        winningcells=[row*3+1, row*3+2, row*3+3]
        return true;
    }

    if(
      cell[col+1]==sym&&
      cell[4+col]==sym&&
      cell[7+col]==sym
    )
    {
      winningcells=[col+1, col+4, col+7]
      return true;
    }
    if(row==col&&
      cell[1]==sym&&
      cell[5]==sym&&
      cell[9]==sym
    )
    {
      winningcells=[1, 5, 9]
      return true;
    }
    if(row+col==2&&
      cell[3]==sym&&
      cell[5]==sym&&
      cell[7]==sym
    )
    {
      winningcells=[3, 5, 7]
      return true;
    }
    return false;
  }
export const updateCell=(props)=>{
  console.log(props.state.winningCells);
  var key = props.state.key;
  if(props.state.win==1)
  {
    return;
  }
  if(props.state.cell[props.key]!="")
  {
    return;
  }

  var a = props.state.cell;
  var winningcells = props.state.winningCells
  a[key]=(props.state.turn==0?'O':'X');

  var didWin = didComplete(key-1,props.state.turn,a);
  console.log("didWin " +didWin)
  if(didWin===true)
  {
    props.setState({
      turn: 1-props.state.turn,
      cell:a,
      win:1,
      winner:props.state.turn+1,
      filled:props.state.filled+1,
      winningCells: winningcells
    })
  }
  else{
    console.log("didn't win yet")
    props.setState({
      turn: 1-props.state.turn,
      cell:a,
      win:0,
      winner:0,
      filled:props.state.filled+1,
      winningCells: props.state.winningCells
    })
  }
}
export const computersTurn=(cells)=>
{
  let emptyCells=[];
  for(let i=0;i<9;i++)
  {
    if(cells[i]=="")
    {
      emptyCells.push(i);
    }
  }
  console.log("empty cells")
  console.log(emptyCells)
}
export function WithFriend(props) {

  let a = Array(10).fill("");
  let winningcells = []
  const [state, setState] = React.useState(props.state);
  const [players,setPlayers]=React.useState({
    player1:"Player 1",
    player2:"Player 2"
  })
  const [editable,setEditable]=React.useState({
    edit1:false,
    edit2:false
  })

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  useEffect(() => {
    console.log("we won")
    console.log(state.winningCells)
}, [state.winningCells])
  const handleClick=(event,key)=>{
    console.log(key);
    console.log("winningcells");
    console.log(state.winningCells);
    if(state.win==1)
    {
      return;
    }
    if(state.cell[key]!="")
    {
      return;
    }

    a = state.cell;
    winningcells = state.winningCells
    a[key]=(state.turn==0?'O':'X');

    var didWin = didComplete(key-1,state.turn,a);
    console.log("didWin " +didWin)
    if(didWin===true)
    {
      console.log("winning cells")
      console.log(winningcells)
      setState({
        turn: 1-state.turn,
        cell:a,
        win:1,
        winner:state.turn+1,
        filled:state.filled+1,
        winningCells: winningcells
      },()=>{
        console.log("state: ")
        console.log(state.winningCells);
      })
    }
    else{
      console.log("didn't win yet")
      setState({
        turn: 1-state.turn,
        cell:a,
        win:0,
        winner:0,
        filled:state.filled+1,
        winningCells: state.winningCells
      })
    }

  }
  const handleReset=()=>{
    a = Array(10).fill("");
    setState({
      turn: 0,
      cell:a,
      win:0,
      winner:0,
      filled:0,
      winningCells:[]
    })
  }
  const changeEdit1 = () =>
  {
    setEditable({
      edit1: true,
      edit2: false
     })
  }
  const changePlayer1=(event)=>{
    setPlayers({
      player1:event.target.value,
      player2:state.player2
    })
  }
  const changePlayer2=(event)=>{
    setPlayers({
      player2:event.target.value,
      player1:state.player1
    })
  }
  if(state.win===1){
    console.log("will show congratulations dialog")
    return(
    <CongratulationsDialog 
    selectedValue={state.winner}
    open={state.win===1}
    onClose={handleReset}/>
    )
  }
}

