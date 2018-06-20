import React, { Component } from 'react'
import { string } from 'prop-types'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import Quill from 'quill'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import Navbar from '../components/Navbar'

import { getCurrentUser } from '../services/user'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

class NewEntryForm extends Component {
  constructor(props) {
    super(props)

    const { diaryId } = props.match.params
    const currentUser = getCurrentUser()
    this.entryRef = firebase
      .database()
      .ref(`entries/${currentUser.uid}/${diaryId}`)
    this.editorRef = React.createRef()
  }

  componentDidMount() {
    this.quillEditor = new Quill(this.editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike']]
      }
    })
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
      rawHTML: this.quillEditor.root.innerHTML
    })
  }

  render() {
    const { diaryId } = this.props.match.params
    return (
      <div>
        <Navbar title="New Entry" />
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
