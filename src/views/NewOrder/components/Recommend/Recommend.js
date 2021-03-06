import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Box from '@material-ui/core/Box';

/* function Copyright() {
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
} */

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbartype: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(3, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));


/* const footers = [
  {
    type: 'Company',
    time: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    type: 'Features',
    time: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    type: 'Resources',
    time: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    type: 'Legal',
    time: ['Privacy policy', 'Terms of use'],
  },
]; */

const Recommend = (props) => {
  const { handleChange } = props;
  const recommendations = props.recommendations.sort((a, b) => 
    (Number(a['price']) > Number(b['price']) ? 1 : -1)).map((option, index) => {
    if (index === 0) {
      return Object.assign(option, {
        type: 'Cheapest',
      });
    }
    if (option['dispatch within: '] === '30 mins'){
      return Object.assign(option, {
        type: 'Fastest',
      })
    } else {
      return Object.assign(option, {
        type: 'Balanced',
      })
    }
  });
  const classes = useStyles();
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    handleChange({
      solution: recommendations[selected],
    });
  },[selected])

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container
        className={classes.heroContent}
        component="main"
        maxWidth="sm"
      >
        <Typography
          align="center"
          color="textPrimary"
          component="h1"
          gutterBottom
          variant="h2"
        >
          Select your solution
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container
        component="main"
        maxWidth="md"
      >
        <Grid
          alignItems="center"
          justify="center"
          container
          spacing={5}
        >
          {recommendations.map((option, index) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={index}
              md={4}
              sm={6}
              xs={12}
            >
              <Card>
                <CardHeader
                  className={classes.cardHeader}
                  subheader={option.subheader}
                  subheaderTypographyProps={{ align: 'center' }}
                  title={option.type}
                  titleTypographyProps={{ align: 'center' }}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography
                      color="textPrimary"
                      component="h2"
                      variant="h4"
                    >
                      ${option.price}
                    </Typography>
                  </div>
                  <div className={classes.cardPricing}>
                  <Typography
                    align="center"
                    component="h2"
                    variant="h4"
                  >
                    dispatch within: {option['dispatch within: ']}
                  </Typography>
                  </div>
                  <div className={classes.cardPricing}>
                  <Typography
                    align="center"
                    component="h2"
                    variant="h4"
                  >
                    {option.carrier}
                  </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setSelected(index);
                    }}
                    variant={index === selected ? 'contained' : 'outlined'}
                  >
                    Pick me!
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
    </React.Fragment>
  );
}

export default Recommend;
