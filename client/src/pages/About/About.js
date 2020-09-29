import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Accordion,
  Grid,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Navbar from "../../components/Navbar/Navbar";
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import "./About.css";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const About = ({ navbarTitle, pageTitle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Navbar navbarTitle={navbarTitle} />
      <div className={isMobile ? 'rootMobile' : 'root'}>
        <Grid container spacing={3}>
          {!isMobile ? <Grid item xs={12} md={2}></Grid> : null}
          <Grid item xs={12} md={8}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  How it works?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography paragraph>
                  <strong>Step 1: Registration</strong><br/>Register using our website or our mobile
                  application. After registration, you can now logged in to our android application.
                  <br></br>
                  <br></br><strong>Step 2: Payment</strong><br/>Users need to pay the membership fee first
                  before they can access some parts of the appication especially the Game Tab. If the user wants to pay the membership fee,
                  they need to go to the payment tab and follow the instruction there.
                  <br></br>
                  <br></br><strong>Step 3: Approval</strong><br/>Once Mobmon Team recieve and verified their payment,
                  users can instantly access the Game Tab to earn points.
                  <br></br>
                  <br></br><strong>Step 4: Earn Points</strong><br/>After successful approval of account, users can now
                  play all our available games in the application and start earning points.
                  <br></br>
                  <br></br><strong>Step 5: Payout</strong><br/>Once the users reach the minimum point count for payout,
                  they can now make a request on Payout Tab and wait until their request is approved by Mobmon Team.
                  <br></br>
                  <br></br><strong>Step 6: Requirements</strong><br/>If a user wants their payout request to be approved,
                  they need to have the minimum point count, they need to also invite another user to use the application and lastly,
                  the current day is the allowed day for payout. 
                  <br></br>
                  <br></br><strong>Step 7: Enjoy</strong><br/>Then, continue playing again and again to earn
                  more.
                  <br></br>
                  <br></br>Note: the game is playable even if you have no
                  internet or data. During registration and every request payout
                  need internet connection
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  About Mobmon
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Typography paragraph>
                    Mobmon stands for Mobile Money Maker
                  </Typography>
                  <Typography paragraph>
                    - is an app that can be use by anyone who wants to earn
                    money while playing different common game. Enjoy playing
                    while earning real money is the main concept why Mobmon is
                    build.
                  </Typography>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {!isMobile ? <Grid item xs={12} md={2}></Grid> : null}
        </Grid>{" "}
        {/* End of container grid */}
      </div>
    </>
  );
};
export default About;
