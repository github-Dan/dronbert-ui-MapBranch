// import React from 'react';
import React, {useState, useEffect} from 'react'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Button
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '140px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

function ActiveOrderList(props) {
  // console.log("props->",props)

  const [state, setState] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  return ( 
    <div >
      {/* {
        <Button onClick={() => { updateList() }} variant="contained" color="secondary">click to update   
        </Button>
      } */}
       

    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Active Order List:"
      />
      <Divider />

      {/* <FormGroup row> */}
      <FormGroup>
          {/* <FormControlLabel
            control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
            label="Active Order #1"
          />
          <FormControlLabel
            control={<Switch checked={state.checkedB} onChange={handleChange} name="checkedB" />}
            label="Active Order #2"
          />
           <FormControlLabel
            control={<Switch checked={state.checkedC} onChange={handleChange} name="checkedC" />}
            label="Active Order #3"
          /> */}

          {
          // Array.from(posts).map((element,index) =>
            props.activeorderlist.map((element,index) =>
              <Button 
                color="primary"
                key={index}   
                onClick={() => { props.toggleActive(index) }}>{element['Tracking ID']}
              </Button>)
          // posts.map(post => <Button variant="contained" color="primary" key={post.id}>{post.name}</Button>)
          }
        </FormGroup>
        {/* {
          // Array.from(posts).map((element,index) =>
          props.activeorderlist.map((element,index) =>
            <Button color="primary"
              onClick={() => { toggleActive(index) }}   
              key={index}>{element.Recipient}
            </Button>)
          // posts.map(post => <Button variant="contained" color="primary" key={post.id}>{post.name}</Button>)
        } */}

      {/* <FormGroup row> */}
      {/* <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Active Order #1"
        />
        <FormControlLabel
          control={<Checkbox checked={state.checkedA} onChange={handleChange} name="checkedA" />}
          label="Active Order #2"
        />
      </FormGroup> */}

      {/* <CardContent>
        <Button color="primary" href="#contained-buttons">
          Active Order #1
        </Button>
        <br/>
        <Button color="primary" href="#contained-buttons">
          Active Order #2
        </Button>
       </CardContent> */}

      
      {/* <BootstrapButton variant="contained" color="primary" disableRipple className={classes.margin}>
        Active Order #1
      </BootstrapButton> */}
      {/* <div className={classes.chartContainer}>
          Order#1 : ...
          <br/>
          Order#2 : ...
      </div> */}
      {/* <div className={classes.stats} /> */}
    </Card>
    </div>
  );
}

ActiveOrderList.propTypes = {
  className: PropTypes.string
};

export default ActiveOrderList;
