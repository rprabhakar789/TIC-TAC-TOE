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
const useStyles = makeStyles((theme) => ({

  gamepage:{
    display:"block"
  },
  playerInfo:{
    display:"flex",
    margin:"auto",
    marginTop:"50px",
    justifyContent:"center",
    alignItems:"center"
  },
  button: {
    width:100,
    height:100,
    border:"1px solid grey",
  },
  active: {
    backgroundColor:"green",
    borderRadius:"5px",
  },
  scoreboard:{
    float:'left',
    margin:20,
    padding:20,
    justify:"flex-end"
  },
  resetButton:{
    marginTop:20
  },
  player:{
    border:"2px solid green"
  },
  playerName:{
    height:"40px",
    borderRadius:"10px",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  },
  turn:{
    border:"1px solid green",
    borderRadius:"5px"
  }

}));

function Tictactoe() {

 const classes = useStyles();
  let a = Array(10).fill("");
  let winningcells = []
  const [state, setState] = React.useState({
     turn: 0,
     cell:a,
     win:0,
     winner:0,
     filled:0,
     winningCells:[]
   });
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
  const didComplete=(key, turn, cell)=>{
    console.log(key)
    console.log(cell)
    var row = Math.floor(key/3);
    var col = key%3;
    console.log(row+" "+col);
    var sym = turn%2==0?'O':'X';
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
  return (
    <Grid className={classes.gamepage}>
    <Grid  className={classes.playerInfo}>
      <Grid item xs={3}
      className={classes.playerName+" "+(state.turn===0?classes.turn:"")}
      >
        Player1 (O)
      </Grid>
    <Grid item xs={3}>vs</Grid>
      <Grid item xs={3}
      className={classes.playerName+" "+(state.turn===1?classes.turn:"")}>
        Player2 (X)
      </Grid>
    </Grid>
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{marginTop:"50px"}}
    >
    <CongratulationsDialog
    selectedValue={selectedValue}
    open={open}
    onClose={handleClose}/>

      <div className="game-box" style={{display:"block"}}>
          <div className="box-row" style={{display:"flex"}}>
            <div className={ `${classes.button} + ${state.winningCells.indexOf(1)===-1 ? "" : classes.active}`} style={{ borderLeft:"none",borderTop:"none"}} onClick={(event)=>handleClick(event,1)}><h1>{state.cell[1]}</h1></div>
            <Box className={ `${classes.button} + ${state.winningCells.indexOf(2)===-1 ? "" : classes.active}`} style={{ borderTop:"none" }}   onClick={(event)=>handleClick(event,2)}><h1>{state.cell[2]}</h1></Box>
            <Box  className={ `${classes.button} +  ${state.winningCells.indexOf(3)===-1 ? "" : classes.active}`} style={{ borderRight:"none",borderTop:"none" }}  onClick={(event)=>handleClick(event,3)}><h1>{state.cell[3]}</h1></Box>
          </div>
          <div style={{display:"flex"}}>
            <Box className={ `${classes.button} +  ${state.winningCells.indexOf(4)===-1 ? "" : classes.active}`} style={{borderLeft:"none", }}onClick={(event)=>handleClick(event,4)}><h1>{state.cell[4]}</h1></Box>
            <Box className={ `${classes.button} +  ${state.winningCells.indexOf(5)===-1 ? "" : classes.active}`}  onClick={(event)=>handleClick(event,5)}><h1>{state.cell[5]}</h1></Box>
            <Box  className={ `${classes.button} +  ${state.winningCells.indexOf(6)===-1 ? "" : classes.active}`}style={{ borderRight:"none"}}onClick={(event)=>handleClick(event,6)}><h1>{state.cell[6]}</h1></Box>
          </div>
          <div style={{display:"flex"}}>
            <Box className={ `${classes.button} +  ${state.winningCells.indexOf(7)===-1 ? "" : classes.active}`} style={{borderLeft:"none",borderBottom:"none"}}  onClick={(event)=>handleClick(event,7)}><h1>{state.cell[7]}</h1></Box>
            <Box className={ `${classes.button} +  ${state.winningCells.indexOf(8)===-1 ? "" : classes.active}`}style={{ borderBottom:"none" }}onClick={(event)=>handleClick(event,8)}><h1>{state.cell[8]}</h1></Box>
            <Box  className={ `${classes.button} +  ${state.winningCells.indexOf(9)===-1 ? "" : classes.active}`}style={{ borderBottom:"none", borderRight:"none"}} onClick={(event)=>handleClick(event,9)}><h1>{state.cell[9]}</h1></Box>
          </div>
      </div>
      <Button  className={classes.resetButton} variant="contained" color="primary" onClick={(event)=>handleReset()}>Reset</Button>

    </Grid>
    </Grid>
  );
}

export default Tictactoe;
