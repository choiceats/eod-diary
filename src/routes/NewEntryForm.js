import React, { Component } from 'react'
import { string } from 'prop-types'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import Quill from 'quill'

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

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

class NewEntryForm extends Component {
  constructor(props) {
    super(props)
    this.editorRef = React.createRef()
  }

  async componentDidMount() {
    const { match } = this.props
    const { diaryId, entryId } = match.params
    const currentUser = getCurrentUser()
    console.log(match.params)
    this.quillEditor = new Quill(this.editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike']]
      }
    })

    const entryRef = firebase
      .database()
      .ref(`entries/${currentUser.uid}/${diaryId}`)

    this.entryRef = entryId === 'new' ? entryRef.push() : ''

    this.quillEditor.setContents(this.props.entry)
  }

  handleEntryChange(event) {
    const { value } = event.target
    this.setState({
      entry: value
    })
  }

  saveNewEntry() {
    this.entryRef.push().set({
      createdBy: 'Nathan',
      created: Date.now(),
      entry: this.quillEditor.getContents(),
      mood: 'satisfied'
    })
  }

  render() {
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
            <div ref={this.editorRef} />
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
