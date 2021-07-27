import React from 'react';
import {
  Box,
  Grid,
  Paper,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@material-ui/core';
import { useTheme } from '../context/theme.context';

function AdminThemeControl() {
  const { themeVariant, setLight, setDark } = useTheme();

  const changeVariant = (event) => {
    switch (event.target.value) {
      case 'light':
        setLight();
        break;
      case 'dark':
        setDark();
        break
      default:
        break;
    }
  }

  return (
    <Box component={Paper} variant="outlined" style={{ width: '100%' }} p={3}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Theme</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={themeVariant} onChange={changeVariant}>
          <Grid container direction="row" justifyContent="space-evenly" alignItems="center">
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </Grid>
        </RadioGroup>
        <FormHelperText>You may need to refresh to view changes</FormHelperText>
      </FormControl>
    </Box>
  );
}

export default AdminThemeControl;