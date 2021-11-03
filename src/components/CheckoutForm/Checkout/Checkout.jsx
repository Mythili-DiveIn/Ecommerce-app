import React from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core';
import useStyles from './styles';


const Checkout = () => {
    const classes = useStyles();
    const steps = ['Shipping address', 'Payment details'];

    return (
            <>
              <CssBaseline />
              <div className={classes.toolbar} />
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography variant="h4" align="center">Checkout</Typography>
                  <Stepper className={classes.stepper}>
                    {steps.map((step) => (
                      <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Paper>
              </main>
            </>
    )
}

export default Checkout
