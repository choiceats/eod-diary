import React, { Component } from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import TextField from 'material-ui/TextField'

import { updateDiaryFields, saveNewDiaryRequest } from '../store/actions'

export class NewDiaryForm extends Component {
  render() {
    const { name, description, dispatch } = this.props
    return (
      <div>
        <form style={{ padding: 24 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="new-diary-name"
                label="Name"
                margin="normal"
                onChange={e =>
                  dispatch(updateDiaryFields({ name: e.target.value }))
                }
                required
                value={name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="new-diary-description"
                label="Description"
                margin="normal"
                multiline
                onChange={e =>
                  dispatch(updateDiaryFields({ description: e.target.value }))
                }
                required
                rows={2}
                rowsMax={4}
                value={description}
              />
            </Grid>
          </Grid>
        </form>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', right: 15, bottom: 15 }}
          onClick={() => dispatch(saveNewDiaryRequest({ name, description }))}
          to="/"
          component={Link}
          disabled={!name.length || !description.length}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

//TODO: This component is "cheating" and handling the routing itself when the saga that intercepts the action should probably take control of routing

NewDiaryForm.propTypes = {
  name: string.isRequired,
  description: string.isRequired
}

const mapStateToProps = state => {
  const { name, description } = state.newDiary

  return {
    name,
    description
  }
}

export default connect(mapStateToProps)(NewDiaryForm)
