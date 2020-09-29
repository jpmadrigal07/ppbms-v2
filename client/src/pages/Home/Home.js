import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import { withStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import Navbar from "../../components/Navbar/Navbar";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import "./Home.css";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}))(Tooltip);

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const Home = ({ navbarTitle, pageTitle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    document.title = pageTitle;
  }, []);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Navbar navbarTitle={navbarTitle} />
      <div className={isMobile ? "rootMobile" : "root"}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Grid item xs={12} md={12}>
              <Card className="content">
                <CardHeader
                  avatar={
                    <Avatar aria-label="profilePic" className="avatar" src="/philippine-peso.png">
                    </Avatar>
                  }
                  title="Mobmon"
                  subheader="September 6, 2020 8:00 am"
                />
                <CardMedia
                  component="img"
                  alt="Home Image"
                  height="300"
                  image="/images/homePic2.jpg"
                  title="Pre-registration is now open"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    We are now accepting pre-registration for our up coming Grand Launching on Nov 20, 2020 (tentative). We will always give you an update through your email for our up coming Grand Launching, promos and news. Thank you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card className="content">
                <CardHeader
                  avatar={
                    <Avatar aria-label="profilePic" className="avatar" src="/philippine-peso.png">
                    </Avatar>
                  }
                  title="Mobmon"
                  subheader="September 6, 2020 8:00 am"
                />
                <CardMedia
                  component="img"
                  alt="Home Image"
                  height="300"
                  image="/images/homePic1.jpg"
                  title="Earn Money"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    If you want to learn how to our app works, you can go to the About page. If you want to know what plans available for you, you can check the Plan page. If you want to contact us for any concern, go to the Contact page. If you want to get started, go to the Register page and create an account. Thank you.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card className="card-sidebar">
              <Typography
                variant="h5"
                className="registration-header-text"
                gutterBottom
              >
                <Box fontWeight="fontWeightBold">Download our App</Box>
              </Typography>
              <ClickAwayListener onClickAway={handleTooltipClose}>
                <div>
                  <BootstrapTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={handleTooltipClose}
                    open={open}
                    title="Sorry! Still not available for download."
                    placement="bottom"
                    arrow
                  >
                    <CardMedia
                      component="img"
                      alt="Home Image"
                      image="/images/app-store.png"
                      onClick={handleTooltipOpen}
                    />
                  </BootstrapTooltip>
                </div>
              </ClickAwayListener>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Home;
