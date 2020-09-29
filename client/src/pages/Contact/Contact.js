import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SvgIcon from "@material-ui/core/SvgIcon";
import {
  Typography,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Button,
  Paper,
} from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitterSquare,
  faInstagramSquare,
} from "@fortawesome/free-brands-svg-icons";
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMessage } from "../../lib/services/contact";
import { useSnackbar } from "notistack";
import _ from "lodash";
import "./Contact.css";
//Styles for UIS
const useStyles = makeStyles((theme) => ({}));

//Custom svg messenger icon
const MessengerIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z" />
    </SvgIcon>
  );
};

//
const Contact = ({ navbarTitle, pageTitle }) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const [messageContent,setMessageContent]=useState([]);
  const [name,setName] =useState("");
  const [emailAddress,setEmailAddress]=useState("");
  const [message,setMessage]=useState("");
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    document.title = pageTitle;
    return () => {
      resetLocalState()
    }
  }, []);

  const resetLocalState = () => {
    setisLoading(false);
    setName("");
    setEmailAddress("");
    setMessage("");
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setisLoading(true);
    if (
      name === "" ||
      emailAddress === "" ||
      message === ""
    ) {
      showSnackbar("Please complete all the inputs.", "warning");
      setisLoading(false);
    } else {
      try {
        const res = await createMessage({
          name: name,
          emailAddress: emailAddress,
          message: message,
        });
        if (!_.isNil(res.data) && res.data !== "") {
          if (!res.data.isSuccess) {
            showSnackbar("Something went wrong.", "error");
          } else {
            resetLocalState()
            showSnackbar("Message has been sent. Thank you.", "success");
          }
          setisLoading(false);
        } else {
          showSnackbar("Unkown error occured.", "error");
        }
      } catch (err) {
        showSnackbar(err.message, "error");
        setisLoading(false);
      }
    }
  };
  const showSnackbar = (message, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(message, { variant });
  };
  return (
    <>
      <Navbar navbarTitle={navbarTitle} />
      <div className={isMobile ? 'rootMobile bgimage' : 'root bgimage'}>
        <Grid container className={isMobile ? '' : 'container-contact'} >
          <Grid item xs={12} md={9}>
            <Card className="card-contact">
              <Typography variant="h4">Get In Touch</Typography>
              <Typography variant="body1" color="textSecondary" mt>
                We are always happy to answer your concerns.
              </Typography>
              <form onSubmit={sendMessage} noValidate className="contact-form">
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Name"
                      variant="outlined"
                      fullWidth="true"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth="true"
                      value={emailAddress}
                      onChange={(e)=>setEmailAddress(e.target.value)}
                    ></TextField>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      label="Message"
                      variant="outlined"
                      fullWidth="true"
                      fullWidth="true"
                      value={message}
                      onChange={(e)=>setMessage(e.target.value)}
                    ></TextField>
                  </Grid>
                </Grid>
                <Button
                  disabled={isLoading}
                  type="submit"
                  size="large"
                  color="primary"
                  variant="contained"
                  className="submit-contact-button-left"
                >
                  {isLoading ? (
                    <CircularProgress color="secondary" size="1.6rem" />
                  ) : (
                    "Send"
                  )}
                </Button>
              </form>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card className="card-contact" style={{ backgroundColor: "#212121" }}>
              <div className="connect-with-us-contact margin-top-contact-30">
                <Typography
                  variant="h4"
                  align="center"
                  style={{ color: "#ffffff" }}
                >
                  Connect with us!
                </Typography>
              </div>
              <div className="connect-with-us-contact margin-top-contact-3">
                <FontAwesomeIcon
                  icon={faInstagramSquare}
                  size="3x"
                  style={{ color: "#ffffff", margin: '10px' }}
                />
                <FontAwesomeIcon
                  icon={faFacebookSquare}
                  size="3x"
                  style={{ color: "#ffffff", margin: '10px' }}
                />
                <FontAwesomeIcon
                  icon={faTwitterSquare}
                  size="3x"
                  style={{ color: "#ffffff", margin: '10px' }}
                />
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Contact;
