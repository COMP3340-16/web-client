import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import RecipeTypeTag from './RecipeTypeTag.component';

const useStyles = makeStyles((theme) => ({
  borderTop: {
    borderTop: '1px solid grey'
  },
  accordions: {
    width: "70%"
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function RecipeDisplay({ recipe }) {
  const classes = useStyles();

  return (
    <Box component={Paper} variant="outlined" p={2}>
      <Grid container direction="column" alignItems="center" spacing={3}>
        <Grid item>
          <Typography variant="h4">
            {recipe.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <u>Author:</u> {recipe.user?.username}
          </Typography>
        </Grid>
        <Grid item>
          <RecipeTypeTag type={recipe.type} />
        </Grid>

        <Grid item className={classes.accordions}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6">
                Ingredients
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.center}>
              <List>
                {recipe.ingredients
                  .map((ingredient) => (
                    <ListItem key={ingredient} className={classes.borderTop}>
                      <ListItemText primary={ingredient} />
                      <ListItemSecondaryAction>
                        <Checkbox edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography variant="h6">
                Instructions
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.center}>
              <List>
                {recipe.instructions.split('.')
                  .map((instruction) => instruction.trim())
                  .filter((instruction) => instruction.length > 1)
                  .map((instruction, idx) => (
                    <ListItem key={instruction} className={classes.borderTop}>
                      <ListItemText primary={`${idx + 1}. ${instruction}`} />
                      <ListItemSecondaryAction>
                        <Checkbox edge="end" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* <Grid item>
          <Typography variant="h5" align="center">
            Ingredients
          </Typography>
          <List>
            {recipe.ingredients
              .map((ingredient) => (
                <ListItem key={ingredient} className={classes.borderTop}>
                  <ListItemText primary={ingredient} />
                  <ListItemSecondaryAction>
                    <Checkbox edge="end" />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Grid>

        <Grid item>
          <Typography variant="h5" align="center">
            Instructions
          </Typography>
          <List>
            {recipe.instructions.split('.')
              .map((instruction) => instruction.trim())
              .filter((instruction) => instruction.length > 1)
              .map((instruction, idx) => (
                <ListItem key={instruction} className={classes.borderTop}>
                  <ListItemText primary={`${idx + 1}. ${instruction}`} />
                  <ListItemSecondaryAction>
                    <Checkbox edge="end" />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
          </List>
        </Grid> */}
      </Grid>
    </Box>
  );
}
RecipeDisplay.propTypes = {
  recipe: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructions: PropTypes.string.isRequired,
  }).isRequired,
}

export default RecipeDisplay;