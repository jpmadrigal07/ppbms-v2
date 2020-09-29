import React, { useEffect, useState } from "react";
import {
  TextField,
  Card,
  Typography,
  Grid,
  MenuItem,
  Button,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faGooglePlusSquare,
} from "@fortawesome/free-brands-svg-icons";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./Registration.css";
import { createAccount } from "../../lib/services/register";
import _ from "lodash";
import { useSnackbar } from "notistack";
import validator from "validator";
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useHistory } from "react-router-dom";

const Registration = ({ navbarTitle, pageTitle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [successCreate, setSuccessCreate] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [gender, setGender] = useState("Male");
  const [genders, setGenders] = useState(["Male", "Female"]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const resetLocalState = () => {
    setisLoading(false);
    setSuccessCreate(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setGender("Male");
  };

  useEffect(() => {
    document.title = pageTitle;
    const query = new URLSearchParams(window.location.search);
    const qFirstName = !_.isNil(query.get("firstName"))
      ? query.get("firstName")
      : "";
    const qLastName = !_.isNil(query.get("lastName"))
      ? query.get("lastName")
      : "";
    const qEmail = !_.isNil(query.get("email"))
      ? query.get("email")
      : "";
    const qProfilePicture = !_.isNil(query.get("profilePicture"))
      ? query.get("profilePicture")
      : "";
    setFirstName(qFirstName);
    setLastName(qLastName);
    setEmail(qEmail);
    setProfilePicture(qProfilePicture);
    return () => {
      resetLocalState()
    }
  }, []);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handlerGoHome = () => {
    history.push("/");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setisLoading(true);
    if (
      username === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      gender === ""
    ) {
      showSnackbar("Please complete all the inputs.", "warning");
      setisLoading(false);
    } else if (!validator.isEmail(email)) {
      showSnackbar("Invalid email.", "warning");
      setisLoading(false);
    } else {
      try {
        const res = await createAccount({
          username: username,
          password: password,
          firstName: firstName,
          lastName: lastName,
          email: email,
          gender: gender,
          profilePicture: profilePicture,
          role: "Visitor",
        });
        if (!_.isNil(res.data) && res.data !== "") {
          if (!res.data.isSuccess) {
            if (res.data.dbRes.code === 11000) {
              showSnackbar(
                "Username or email is already in use.",
                "error"
              );
            } else {
              showSnackbar("Something went wrong.", "error");
            }
          } else {
            setSuccessCreate(true);
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

  const renderForm = () => {
    return (
      <>
        <Typography
          variant="h4"
          className="registration-header-text"
          gutterBottom
        >
          Create Account
        </Typography>
        <Alert severity="info" className="registration-alert-info">
          <AlertTitle>Announcement</AlertTitle>
          This is only a pre registration. Do not worry, we will keep you posted
          through your email about the date of grand launching of our mobile
          appication.
        </Alert>
        <Button
          size="large"
          variant="contained"
          disabled={isLoading}
          color="primary"
          className="fb-create-button"
          href={`/auth/facebook`}
        >
          <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
          &nbsp;&nbsp;Create Using Facebook
        </Button>
        <Button
          size="large"
          variant="contained"
          disabled={isLoading}
          color="primary"
          className="google-create-button"
          href={`/auth/google`}
        >
          <FontAwesomeIcon icon={faGooglePlusSquare} size="lg" />
          &nbsp;&nbsp;Create Using Google
        </Button>
        <Typography variant="body1" align="center" gutterBottom>
          or
        </Typography>
        <form noValidate onSubmit={handleCreate}>
          <div>
            <TextField
              required
              className="registration-inputs"
              id="outlined-required"
              label="First Name"
              variant="outlined"
              fullWidth="true"
              disabled={isLoading}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />

            <TextField
              required
              className="registration-inputs"
              id="outlined-required"
              label="Last Name"
              variant="outlined"
              fullWidth="true"
              disabled={isLoading}
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />

            <TextField
              required
              className="registration-inputs"
              id="outlined-required"
              label="Email"
              variant="outlined"
              fullWidth="true"
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <TextField
              required
              className="registration-inputs"
              id="outlined-required"
              label="Username"
              variant="outlined"
              fullWidth="true"
              disabled={isLoading}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <TextField
              required
              className="registration-inputs"
              id="outlined-required"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth="true"
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <TextField
              select
              className="registration-inputs"
              label="Gender"
              value={gender}
              onChange={handleGenderChange}
              variant="outlined"
              fullWidth="true"
              disabled={isLoading}
            >
              {genders.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button
              disabled={isLoading}
              size="large"
              variant="contained"
              color="primary"
              className="submit-button-left"
              type="submit"
            >
              {isLoading ? (
                <CircularProgress color="secondary" size="1.6rem" />
              ) : (
                "Create"
              )}
            </Button>
          </div>
        </form>
      </>
    );
  };

  const renderSuccessCreate = () => {
    return (
      <>
        <div className="success-register">
          <FontAwesomeIcon
            className="success-icon-regsiter"
            size="5x"
            icon={faCheckCircle}
          />
        </div>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          className="success-text-regsiter"
        >
          Account created!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Thank you for joining <strong>{firstName}</strong>! We will notify you
          through your email when our mobile application is ready.
        </Typography>
        <br />
        <div className="success-register">
          <Button
            size="large"
            variant="contained"
            color="default"
            onClick={() => handlerGoHome()}
          >
            See Announcements
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Navbar navbarTitle={navbarTitle} />
      <div className={isMobile ? 'rootMobile' : 'root'}>
        <Grid container spacing={3}>
        {!isMobile ? <Grid item xs={12} md={4}></Grid> : null}
          <Grid item xs={12} md={4}>
            <Card className="card-registration">
              {successCreate ? renderSuccessCreate() : renderForm()}
            </Card>
          </Grid>
        {!isMobile ? <Grid item xs={12} md={4}></Grid> : null}
        </Grid>
      </div>
    </>
  );
};

export default Registration;