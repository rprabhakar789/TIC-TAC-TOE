import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box';
import { Grid, Nav, Drawer, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider'
import Tictactoe from './tic-tac-toe'
function App() {
  const options = ['Play with friend', 'Play with computer','Change Theme']
  const [state, setState] = React.useState({
   key:'0'
 });


     const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {options.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div className="App">
        <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Tic Tac Toe
                    </Typography>
                    <Grid container justify="flex-end">
                      <Button style={{display:"flex",float:"right"}} onClick={toggleDrawer('right', true)}>More</Button>
                      <Drawer
                        anchor='right'
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                      >
                      {list('right')}
                      </Drawer>
                    </Grid>


                </Toolbar>
          </AppBar>
      <Tictactoe/>
    </div>
  );
}

export default App;
