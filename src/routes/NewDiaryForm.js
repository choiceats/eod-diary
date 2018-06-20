import React, { Component } from 'react'
import { string } from 'prop-types'
import * as firebase from 'firebase'

import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import TextField from '@material-ui/core/TextField'

import { getCurrentUser } from '../services/user'

export class NewDiaryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      diary: {
        name: '',
        description: ''
      }
    }
  }

  componentDidMount() {
    const currentUser = getCurrentUser()
    this.diaryRef = firebase.database().ref(`diaries/${currentUser.uid}`)
  }

  handleNameChange(event) {
    const { value } = event.target
    this.setState(prevState => ({
      diary: {
        ...prevState.diary,
        name: value
      }
    }))
  }

  handleDescriptionChange(event) {
    const { value } = event.target
    this.setState(prevState => ({
      diary: {
        ...prevState.diary,
        description: value
      }
    }))
  }

  handleSaveDiary() {
    const newDiaryRef = this.diaryRef.push()
    newDiaryRef.set({
      username: 'Nathan',
      created: Date.now(),
      name: this.state.diary.name,
      description: this.state.diary.description
    })
  }

  render() {
    const { name, description } = this.state.diary
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
                onChange={e => this.handleNameChange(e)}
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
                onChange={e => this.handleDescriptionChange(e)}
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
          onClick={() => this.handleSaveDiary()}
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

NewDiaryForm.propTypes = {
  name: string.isRequired,
  description: string.isRequired
}

export default NewDiaryForm
