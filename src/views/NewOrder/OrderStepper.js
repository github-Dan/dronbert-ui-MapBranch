import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';

import axios from 'axios';

import {
  useStripe,
  useElements,
  CardNumberElement
} from '@stripe/react-stripe-js';

import {
  ShipInfoForm,
  Recommend,
  PaymentForm,
  Checkout
} from './components';

function Copyright() {
  return (
    <Typography
      align="center"
      color="textSecondary"
      variant="body2"
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://material-ui.com/"
      >
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '75%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping information', 'Select solution', 'Review your order', 'Payment'];


function OrderStepper () {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo ] = useState({
    senderFirstName: 'Jack',
    senderLastName: 'Chan',
    senderAddress: '1600 Amphitheatre Parkway, Mountain View, CA, 94043',
    senderPhoneNumber: '1111111111',
    senderEmail: 'jack@gmail.com',
    recipientFirstName: 'Jeff',
    recipientLastName: 'Car',
    recipientAddress: '1 Hacker Way, Menlo Park, CA, 94025',
    recipientPhoneNumber: '2222222222',
    recipientEmail: 'jeff@gmail.com',
    packageWeight : '10',
    packageHeight : '10',
    packageLength : '10',
    packageWidth : '10',
    station: '1',
  });
  const [paid, setPaid] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (paid === true) {
      placeOrder();
    }
  }, [paid])

  function handleChange(newInfo) {
    const newOrderInfo = Object.assign(orderInfo, newInfo);
    setOrderInfo(newOrderInfo);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <ShipInfoForm handleChange={handleChange} orderInfo={orderInfo}/>;
      case 1:
        return <Recommend
          handleChange={handleChange}
          recommendations={orderInfo['recommendations']}/>;
      case 2:
        return <Checkout orderInfo={orderInfo}/>;
      case 3:
        return <PaymentForm handleChange={handleChange}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  const pay = async () => {
    setLoading(true);
    console.log('elements --> ', elements);
    const cardElement = elements.getElement(CardNumberElement);
    console.log('card element --> ', cardElement);
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log(error.message);
    } else {
      console.log(paymentMethod);
      // To change: the price should come from the state in real case
      const price = 10;

      console.log('already generate paymentMethod!');
      axios.post('http://localhost:5000/pay', {
        price: price,
        currency: 'usd',
        paymentMethodId: paymentMethod['id'],
      })
        .then(response => {
          console.log(response.data);
          handleChange({
            paid : true,
          });
          setPaid(true);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          handleChange({
            paid : false,
          });
        })
    }
  }

  const placeOrder = async () => {
    setLoading(true);
    await axios.post( 'http://localhost:5000/neworder', {
      "senderFisrtName": orderInfo['senderFisrtName'],
      "senderLastName": orderInfo['senderLastName'],
      "senderAddress": orderInfo['senderAddress'],
      "senderPhoneNumber": orderInfo['senderPhoneNumber'],
      "senderEmail": orderInfo['senderEmail'],
      "recipientFisrtName": orderInfo['recipientFisrtName'],
      "recipientLastName": orderInfo['recipientLastName'],
      "recipientAddress": orderInfo['recipientAddress'],
      "recipientPhoneNumber": orderInfo['recipientPhoneNumber'],
      "recipientEmail": orderInfo['recipientEmail'],
      "packageWeight" : orderInfo['packageWeight'],
      "packageHeight" : orderInfo['packageHeight'],
      "packageLength" : orderInfo['packageLength'],
      "packageWidth" : orderInfo['package-width'],
      "carrier" : orderInfo['solution']['carrier'],
      "totalCost" : orderInfo['solution']['price'],
      "deliveryTime": orderInfo['solution']['time'].concat('hr'),
      "fragile": orderInfo['fragile'],
    })
      .then((response) => {
        console.log('response from /neworder -->', response.data);
        const trackingID = response.data['tracking id'];
        if(trackingID) {
          handleChange({
            trackingID : trackingID,
          });
        }
        setLoading(false);
        setActiveStep(activeStep + 1);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }

  const getRecommendations = async () => {
    console.log('We are ready to get recommendations!');
    console.log('orderInfo before send to recommendation -->', orderInfo);
    setLoading(true);
    await axios.post('http://localhost:5000/recommendation', {
      'address': orderInfo['station'],
      'receiverAddr': orderInfo['recipientAddress'],
      'height' : orderInfo['packageHeight'],
      'length' : orderInfo['packageLength'],
      'width' : orderInfo['packageWidth'],
      'weight' : orderInfo['packageWeight'],
      'fragile' : orderInfo['fragile'],
    })
      .then((response) => {
        // It is very awkward to put two pieces of data into one object;
        // We should receive Json array here in the future;
        console.log('response from backend -->', response.data);
        handleChange({
          recommendations: response.data,
        });
        setLoading(false);
        setActiveStep(activeStep + 1);
      })
      .catch(error => {
        console.log(error);
      })
  }

  const handleNext = () => {
    console.log(activeStep);
    if (activeStep === 0) {
      getRecommendations();
    } else if (activeStep === 3) {
      pay();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  console.log('orderInfo -->', orderInfo);

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <form autoComplete="off" className={classes.form} onSubmit={e => { e.preventDefault(); handleNext() }}>
          <Typography
            align="center"
            component="h1"
            variant="h4"
          >
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            className={classes.stepper}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography
                  gutterBottom
                  variant="h5"
                >
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{orderInfo['trackingID']}. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
                <Link href="/dashboard">Track your package</Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button
                      className={classes.button}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    className={classes.button}
                    color="primary"
                    disabled={loading}
                    type="submit"
                    variant="contained"
                  >
                    {
                      loading
                        ?
                        <CircularProgress size={24} />
                        :
                        activeStep === steps.length - 1 ? 'Place your order' : 'Next'
                    }
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
          </form>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}

export default OrderStepper;
