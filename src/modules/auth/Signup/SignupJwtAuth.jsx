import { useState } from "react";
import Button from "@mui/material/Button";
import {
  Checkbox,
  IconButton,
  FormControlLabel,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";

import AppInfoView from "@crema/components/AppInfoView";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppTextField from "@crema/components/AppFormComponents/AppTextField";
import { useAuthMethod } from "@crema/hooks/AuthHooks";
import { Fonts } from "@crema/constants/AppEnums";
import { Link } from "react-router-dom";
import AuthWrapper from "../AuthWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { green, pink } from "@mui/material/colors";

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id="validation.nameRequired" />),
  email: yup
    .string()
    .email(<IntlMessages id="validation.emailFormat" />)
    .required(<IntlMessages id="validation.emailRequired" />),
  password: yup
    .string()
    .required(<IntlMessages id="validation.passwordRequired" />),
  terms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

const SignupJwtAuth = () => {
  const { handleSignup } = useAuthMethod();

  const [showPassword, setShowPassword] = useState(false);
  const [openTermsDialog, setOpenTermsDialog] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleOpenTermsDialog = () => {
    setOpenTermsDialog(true);
  };

  const handleCloseTermsDialog = () => {
    setOpenTermsDialog(false);
  };

  return (
    <>
      <ToastContainer />
      <AuthWrapper>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Box
            sx={{ flex: 1, display: "flex", flexDirection: "column", mb: 5 }}
          >
            <Formik
              validateOnChange={true}
              initialValues={{
                name: "",
                email: "",
                password: "",
                address: "a",
                terms: false,
              }}
              validationSchema={validationSchema}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                handleSignup(data);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values, handleChange }) => (
                <Form
                  style={{ textAlign: "left" }}
                  noValidate
                  autoComplete="off"
                >
                  <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                    <AppTextField
                      label={<IntlMessages id="common.name" />}
                      name="name"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                    <AppTextField
                      label={<IntlMessages id="common.email" />}
                      name="email"
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ mb: { xs: 4, xl: 5 } }}>
                    <AppTextField
                      label={<IntlMessages id="common.password" />}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      variant="outlined"
                      sx={{
                        width: "100%",
                        "& .MuiInputBase-input": {
                          fontSize: 14,
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      mb: { xs: 3, xl: 4 },
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="terms"
                          checked={values.terms}
                          onChange={handleChange}
                          sx={{
                            ml: -3,
                          }}
                        />
                      }
                      label={
                        <>
                          <Box
                            component="span"
                            sx={{ mr: 2, color: "grey.700" }}
                          >
                            <IntlMessages id="common.iAgreeTo" />
                          </Box>
                          <Box
                            component="span"
                            sx={{
                              color: (theme) => theme.palette.primary.main,
                              cursor: "pointer",
                            }}
                            onClick={handleOpenTermsDialog}
                          >
                            <IntlMessages id="common.termConditions" />
                          </Box>
                        </>
                      }
                    />
                    <ErrorMessage
                      name="terms"
                      component={FormHelperText}
                      error
                    />
                  </Box>

                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{
                        minWidth: 160,
                        fontWeight: Fonts.REGULAR,
                        fontSize: 16,
                        textTransform: "capitalize",
                        padding: "4px 16px 8px",
                      }}
                      type="submit"
                    >
                      <IntlMessages id="common.signup" />
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>

          <Box sx={{ color: "grey.700" }}>
            <span style={{ marginRight: 4 }}>
              <IntlMessages id="common.alreadyHaveAccount" />
            </span>
            <Box
              component="span"
              sx={{
                fontWeight: Fonts.MEDIUM,
                "& a": {
                  color: (theme) => theme.palette.primary.main,
                  textDecoration: "none",
                },
              }}
            >
              <Link to="/signIn">
                <IntlMessages id="common.signIn" />
              </Link>
            </Box>
          </Box>

          <AppInfoView />
        </Box>
      </AuthWrapper>

      <Dialog open={openTermsDialog} onClose={handleCloseTermsDialog}>
        <h1 style={{ margin:'20px'}}>Terms and Conditions</h1>
        <DialogContent sx={{padding:6}}>
          <p>
        <h3>Any Profit Terms And Conditions Added Hear</h3>
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsDialog}  style={{background:'green', color:'#fff', padding:'10px 25px'}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignupJwtAuth;
