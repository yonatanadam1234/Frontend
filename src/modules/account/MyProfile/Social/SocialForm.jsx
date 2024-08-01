import React from 'react';
import { Button } from '@mui/material';
import AppGridContainer from '@crema/components/AppGridContainer';
import Grid from '@mui/material/Grid';
import IntlMessages from '@crema/helpers/IntlMessages';
import Box from '@mui/material/Box';
import ProfileConnection from './ProfileConnection';
import { Form } from 'formik';
import PropTypes from 'prop-types';
import AppTextField from '@crema/components/AppFormComponents/AppTextField';

const SocialForm = ({ social }) => {
  return (
    <Form autoComplete='off'>
      <AppGridContainer spacing={4}>
        <Grid item xs={12}>
          <Box
            sx={{
              position: 'relative',
              maxWidth: 550,
            }}
          >
            <AppGridContainer spacing={4}>
              <Grid item xs={12} md={6}>
                <AppTextField
                  name='email'
                  fullWidth
                  type='email'
                  label={<IntlMessages id='Enter Email' />}
                />
              </Grid>
        
            </AppGridContainer>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              mx: -5,
              mt: 3,
              px: 5,
              pt: 5,
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <ProfileConnection profileConnection={social} />
          </Box>
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
                position: 'relative',
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
                position: 'relative',
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

export default SocialForm;

SocialForm.propTypes = {
  social: PropTypes.array,
};
