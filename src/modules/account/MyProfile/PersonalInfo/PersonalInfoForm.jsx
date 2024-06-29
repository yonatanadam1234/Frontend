import React, { useState, useEffect } from 'react';
import { alpha, Box, Button, IconButton, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useDropzone } from 'react-dropzone';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import { Fonts } from '@crema/constants/AppEnums';
import { useJWTAuth } from '../../../../@crema/services/auth';

const AvatarViewWrapper = styled('div')(({ theme }) => {
  return {
    position: 'elative',
    cursor: 'pointer',
    '&.edit-icon': {
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: '50%',
      width: 26,
      height: 26,
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.4s ease',
      cursor: 'pointer',
      '&.MuiSvgIcon-root': {
        fontSize: 16,
      },
    },
    '&.dropzone': {
      outline: 0,
      '&:hover.edit-icon, &:focus.edit-icon': {
        display: 'flex',
      },
    },
  };
});

const PersonalInfoForm = ({ values, setFieldValue }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { user } = useJWTAuth();
  const imageBaseURL = `https://squid-app-oqakh.ondigitalocean.app/image/${user?.image}`;
  
  console.log("🚀 ~ PersonalInfoForm ~ imageBaseURL:", imageBaseURL)
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFieldValue('photoURL', acceptedFiles[0]);
      setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
    },
  });

  return (
    <Form noValidate autoComplete='off'>
      <Typography
        component='h3'
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id='common.personalInfo' />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: { xs: 5, lg: 6 },
        }}
      >
        <AvatarViewWrapper {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <label htmlFor='icon-button-file'>
            <Avatar
              sx={{
                width: { xs: 50, lg: 64 },
                height: { xs: 50, lg: 64 },
                cursor: 'pointer',
              }}
              src={selectedImage || imageBaseURL}
            />
           
          </label>
        </AvatarViewWrapper>
        <Box
          sx={{
            ml: 4,
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {user.name}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {user.email}
          </Typography>
        </Box>
      </Box>
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={6}>
          <AppTextField
            name='name'
            fullWidth
            label={<IntlMessages id='Name' />}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <AppTextField
            name='email'
            fullWidth
            label={<IntlMessages id='common.email' />}
          />
        </Grid>

        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Button
              sx={{
                position: 'elative',
                minWidth: 100,
              }}
              color='primary'
              variant='contained'
              type='submit'
            >
              <IntlMessages id='common.saveChanges' />
            </Button>
            <Button
              sx={{
                position: 'elative',
                minWidth: 100,
                ml: 2.5,
              }}
              color='primary'
              variant='outlined'
              type='cancel'
            >
              <IntlMessages id='common.cancel' />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default PersonalInfoForm;
PersonalInfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
};