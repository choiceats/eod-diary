import React, { Component } from 'react'
import { string } from 'prop-types'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import TextField from 'material-ui/TextField'

import { addDiary } from '../services/localStorage'
import { updateDiaryFields, saveNewDiary } from '../store/actions'

// TODO: Integrate with React Redux Saga rather directly saving to local storage.
// Replace with dirtySaveDiary usage with saveNewDiary, which in turn will fire off a saga.
function dirtySaveDiary({ name, description }) {
  addDiary({ name, description })
}

class NewDiaryForm extends Component {
  componentDidMount() {}

  render() {
    const { name, description, dispatch } = this.props
    return (
      <div>
        <form style={{ padding: 24 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="required"
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
                id="description"
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
          to="/"
          component={Link}
          onClick={() => dirtySaveDiary({ name, description })}
          disabled={!name.length || !description.length}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

NewDiaryForm.propTypes = {
  name: string.isRequired,
  description: string.isRequired
}

const mapStateToProps = (state, props) => {
  const { name, description } = state.newDiary

  return {
    name,
    description
  }
}

export default connect(mapStateToProps)(NewDiaryForm)
