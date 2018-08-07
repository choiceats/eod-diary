import React, { Component } from 'react'
import { string } from 'prop-types'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import VerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import SatisfiedIcon from '@material-ui/icons/SentimentSatisfied'
import DissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import NeutralIcon from '@material-ui/icons/SentimentNeutral'
import VeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied'

import Navbar from '../components/Navbar'

import { getCurrentUser } from '../services/user'

class NewEntryForm extends Component {
  constructor(props) {
    super(props)
    this.editorRef = React.createRef()
    this.state = { entry: this.props.entry }
  }

  async componentDidMount() {
    const { match } = this.props
    const { diaryId, entryId } = match.params
    const currentUser = getCurrentUser()

    const entryRef = firebase
      .database()
      .ref(`entries/${currentUser.uid}/${diaryId}`)

    this.entryRef = entryId === 'new' ? entryRef.push() : ''
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
      entry,
      mood: 'satisfied'
    })
  }

  updateEntry = event => {
    this.setState({ entry: event.target.value })
  }

  render() {
    const { entry } = this.state
    const { diaryId } = this.props.match.params
    return (
      <div>
        <Navbar title="New Entry" />
        <Grid
          container
          justify={'space-around'}
          spacing={24}
          style={{ marginTop: 15 }}
        >
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <VerySatisfiedIcon />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <SatisfiedIcon />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <NeutralIcon />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <DissatisfiedIcon />
          </Grid>
          <Grid
            item
            xs={2}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <VeryDissatisfiedIcon />
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <textarea onChange={this.updateEntry}>{entry}</textarea>
          </Grid>
        </Grid>
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          style={{ position: 'fixed', right: 15, bottom: 15 }}
          onClick={() => this.saveNewEntry()}
          to={`/diary/${diaryId}`}
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
