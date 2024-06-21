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
  Typography,
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
import { GoDotFill } from "react-icons/go";



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

      <Dialog open={openTermsDialog} onClose={handleCloseTermsDialog} sx={{
        maxHeight: '90%',
        mt: '40px'
      }}>
        <DialogContent sx={{ padding: 8, fontSize: 20 }}>
          <Box sx={{ fontSize: 20 }}>
            <Typography variant="h1" gutterBottom sx={{ fontSize: 26, fontWeight: 600, marginBottom: 5 }}>
              Terms of Service
            </Typography>
            <hr />
            <hr style={{ marginBottom: '9px' }} />
            <Typography variant="h4" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              Terms and Conditions
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ fontSize: 16, marginBottom: 3 }}>
              Welcome to AnyProfit! These Terms and Conditions outline the rules and regulations for the use of our website and services.
            </Typography>
            <Typography variant="h5" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              By accessing this website or using our services, you accept these terms and conditions in full. Do not continue to use AnyProfit website or services if you do not accept all of the terms and conditions stated on this page.
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              1. Intellectual Property:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill /> The content, design, logos, trademarks, and other materials displayed on our website are owned by AnyProfit and protected by intellectual property laws. You may not use, reproduce, or distribute any of our intellectual property without our prior written consent.
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              2. User Responsibilities:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill /> You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You agree to accept responsibility for all activities that occur under your account.
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill /> You must not use our website or services for any unlawful or prohibited purpose, including but not limited to transmitting any harmful code, viruses, or malicious software.
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              3. Service Limitations:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill />  While we strive to provide accurate and up-to-date information, we do not warrant the completeness or accuracy of the content on our website. We reserve the right to modify or discontinue our services at any time without notice.
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              4. Limitation of Liability:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill />  In no event shall AnyProfit, its officers, directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of our website or services.
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              5. Governing Law:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill />  These terms and conditions are governed by and construed in accordance with the laws of [Your Country], and you submit to the exclusive jurisdiction of the courts in that country for the resolution of any disputes.
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              6. Changes to This Agreement:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill />  We reserve the right to update or modify these terms and conditions at any time without prior notice. By continuing to access or use our website and services after any revisions become effective, you agree to be bound by the updated terms and conditions.
            </Typography>

            <Typography variant="h3" gutterBottom sx={{ fontSize: 22, fontWeight: 600, marginBottom: 5 }}>
              7. Contact Us:
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill />  If you have any questions or concerns about these terms and conditions, please contact us at [support@AnyProfit.com].
            </Typography>
            <Typography variant="body1" gutterBottom sx={{ fontSize: 16, marginBottom: 5 }}>
              <GoDotFill />  These Terms and Conditions were last updated on [Date].
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTermsDialog} style={{ background: '#707070', color: '#fff', padding: '6px 30px', margin:'10px'}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignupJwtAuth;
