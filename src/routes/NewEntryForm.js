import React, { Component } from 'react'
import { string } from 'prop-types'
import * as firebase from 'firebase'

import { Link } from 'react-router-dom'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import TextField from 'material-ui/TextField'

class NewEntryForm extends Component {
  constructor(props) {
    super(props)

    const { diaryId } = props.match.params
    this.state = { entry: '' }
    this.entryRef = firebase.database().ref(`entries/${diaryId}`)
  }

  handleEntryChange(event) {
    const { value } = event.target
    this.setState({
      entry: value
    })
  }

  saveNewEntry() {
    const { entry } = this.state
    this.entryRef.push().set({
      createdBy: 'Nathan',
      created: Date.now(),
      entry
    })
  }

  render() {
    const { entry } = this.state
    return (
      <div>
        <form style={{ padding: 24 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="new-entry"
                label="Entry"
                margin="normal"
                onChange={e => this.handleEntryChange(e)}
                value={entry}
              />
            </Grid>
          </Grid>
        </form>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', right: 15, bottom: 15 }}
          onClick={() => this.saveNewEntry()}
          to="/"
          component={Link}
        >
          <AddIcon />
        </Button>
      </div>
    )
  }
}

NewEntryForm.propTypes = {
  name: string.isRequired,
  description: string.isRequired
}

export default NewEntryForm
