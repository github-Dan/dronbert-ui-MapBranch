import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  Divider,
  CardActions,
  FormControlLabel,
  Switch,
  CircularProgress
} from '@material-ui/core';

import axios from 'axios';

import {
  ActiveOrderList,
  PackageMap,
  TimeStamp,
  TrackingBar,
  OrderDetail,
} from './components';
import { indexOf } from 'underscore';
import { string } from 'prop-types';
import { getGeneratedNameForNode } from 'typescript';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    height: '75%',
  },
  cardContent: {
    justifyContent: 'center',
  },
  actions: {
    justifyContent: 'flex-end',
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  const [loadingDetail, setLoadingDetail] = useState(false);

  const [showDetail, setShowDetail] = useState(false);
  // const [activeorderlist, setactiveorderlist] = useState([{order_id: 'abc'}]);
  const [activeorderlist, setactiveorderlist] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(0);
  const [trackingInfo, setTrackingInfo] = useState({});
  const [trackingID, setTrackingID] = useState(0);
  const [geo, setGeo] = useState();
  const [orderDetail, setOrderDetail] = useState({});
  
  // console.log('dash selectedOrder->',selectedOrder)

  const toggleDetail = (event) => {
    setLoadingDetail(true);
    setShowDetail(event.target.checked)
  }

  const getOrderDetail = async () => {

    await axios.post('http://localhost:5000/detail', {
      order_id : 'abc',
    })
      .then(response => {
        console.log(response.data);
        setOrderDetail(response.data);
        setLoadingDetail(false);
      })
      .catch(error => console.log(error));
  }

  // get order detail as an effect of switching on showDetail
  useEffect(() => {
    if (showDetail === true) {
      getOrderDetail();
    }
  }, [showDetail])

  //fetch active order list data
  useEffect(() => {
    // console.log('useEffect called')
    axios.post('http://localhost:5000/activeorder',{
      user_id : 'abc'
    })
      .then(res => {
        // console.log('res->',res)
        // console.log('data->',res.data)
        setactiveorderlist(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
  },[setactiveorderlist])
  console.log('Dash activeorderlist->',activeorderlist)

  //fetch tracking info
  useEffect(() => {
    // console.log('Tracking useEffect called')
    const tracking_id=getTrackingID()
    // console.log('tracking_id',tracking_id)
    axios.post('http://localhost:5000/tracking',{
      // tracking_id : '1111',
      tracking_id : tracking_id
    })
      .then(res => {
        // console.log('Tracking res->',res)
        // console.log('Tracking data->',res.data)
        setTrackingInfo(res.data)
        console.log('trackingInfo-->',trackingInfo)
      })
      .catch(err =>{
        console.log(err)
      })
      // getGeo()
  },[selectedOrder,activeorderlist])

  useEffect(() => {
    if (trackingInfo !== undefined){
      setGeo(trackingInfo['current location'])
    }
  }, [trackingInfo])
  // console.log('GEO-->',geo)

  const getTrackingID = () => {
    // console.log('getTrackingID');
    // console.log('Track activeorderlist->',activeorderlist)
    // console.log('Track selectedOrder->',selectedOrder)
    const activeorder = activeorderlist[selectedOrder]
    // console.log('activeorder -->',activeorder)
    if (activeorder !== undefined) {
      // console.log('Tracking ID -->',activeorder['Tracking ID'])
      return activeorder['Tracking ID']
    }
  }

  const toggleActive=(index) =>{
    // console.log('toggleActive called')
    // console.log('props.activeorderlist->',activeorderlist)
    // console.log('activeorderlist [index]',activeorderlist[index])
    // console.log('AL index->',index)
    setSelectedOrder(index)
  }


  const renderOrderDetail = () => {
    console.log(loadingDetail);
    console.log(orderDetail);
    if (activeorderlist.length === 0) {
      return <span> You don't have any active orders! </span>;
    }
    if (loadingDetail) {
      return <CircularProgress color="secondary" />;
    }
    return <OrderDetail orderDetail={orderDetail}/>;
  }


  return (
    <Grid
      alignItems="stretch"
      container
      spacing={1}
    >
      <Grid
        item
        lg={8}
        md={12}
        xl={9}
        xs={12}
      >
        <Box className={classes.root}>
          <Card >
            <CardHeader
              title="Order#1"
            />
            <Divider />
            <CardContent className={classes.cardContent}>
              <Grid
                container
                direction="column"
              >
                <Grid
                  item
                  xl={12}
                >
                  <TrackingBar />
                </Grid>
                <Grid
                  item
                  xl={12}
                >
                  {showDetail ? renderOrderDetail(): <PackageMap trackingInfo={trackingInfo}/>}
                </Grid>
              </Grid>
            </CardContent>

            <CardActions className={classes.actions}>
              <FormControlLabel
                control={<Switch
                  checked={showDetail}
                  color="secondary"
                  onChange={toggleDetail}
                  name="checkedA" />}
                label="View Detail"
              />
            </CardActions>
          </Card>
        </Box>
      </Grid>

      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        
        <Box className={classes.root}>
          <Card>
            <CardHeader title = "arrive in:"/>
            <Divider />
            <CardContent>
              <TimeStamp />
              <ActiveOrderList 
                activeorderlist={activeorderlist} 
                selectedOrder = {selectedOrder}
                setactiveorderlist={setactiveorderlist}
                setSelectedOrder = {setSelectedOrder}
                toggleActive={toggleActive}
                
              />
            </CardContent>
            <CardActions>
              <Button
                color="primary"
                size="small"
                variant="text"
              >
                View all history {/*<ArrowRightIcon />*/}
              </Button>
            </CardActions>
          </Card>
        </Box>
      </Grid>

    </Grid>
  );
};

export default Dashboard;
