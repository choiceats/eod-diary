import React, { Component } from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import * as MaterialIcons from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'

import db from '../services/firebase'
import { getUsersMoods } from '../services/moods'
import Navbar from '../components/Navbar'

import { getCurrentUser } from '../services/user'

class NewEntryForm extends Component {
  constructor(props) {
    super(props)
    this.editorRef = React.createRef()
    this.state = {
      entry: this.props.entry,
      mood: '',
      moods: []
    }
  }

  async componentDidMount() {
    const { match } = this.props
    const { diaryId, entryId } = match.params
    const currentUser = getCurrentUser()
    const moods = await getUsersMoods(currentUser.id)
    this.setState({ moods: moods })
  }

  handleEntryChange(event) {
    const { value } = event.target
    this.setState({
      entry: value
    })
  }

  saveNewEntry() {
    const { entry, mood } = this.state
    const entryRef = db.collection('entries')
    const currentUser = getCurrentUser()
    const { diaryId } = this.props.match.params

    entryRef.add({
      diaryId,
      createdBy: currentUser.uid,
      created: Date.now(),
      entry: entry || '',
      mood: mood || ''
    })
  }

  updateEntry = event => {
    this.setState({ entry: event.target.value })
  }

  updateMood(mood) {
    this.setState(currState => ({
      mood: currState.mood === mood.value ? null : mood.value
    }))
  }

  render() {
    const { entry, mood, moods } = this.state
    const { diaryId } = this.props.match.params
    return (
      <div>
        <Navbar title="New Entry" />
        <Grid container>
          <Grid item>
            <Typography variant="headline" gutterBottom>
              Mood
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify={'space-around'} spacing={24}>
          {moods.map(userMood => {
            const Icon = MaterialIcons[userMood.icon]
            return (
              <Grid
                item
                xs={2}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  color: mood === userMood.value ? 'blue' : 'black'
                }}
              >
                <Icon onClick={() => this.updateMood(userMood)} />
              </Grid>
            )
          })}
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="headline" gutterBottom>
              Activities
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item>
            <Typography variant="headline" gutterBottom>
              Notes
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs={12} md={12}>
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
