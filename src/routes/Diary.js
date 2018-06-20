import React, { Component } from 'react'
import { arrayOf, string } from 'prop-types'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import { getCurrentUser } from '../services/user'
import EntryCard from '../components/EntryCard'
import Navbar from '../components/Navbar'

export class Diary extends Component {
  constructor(props) {
    super(props)
    this.state = { diary: null, entries: [] }
  }

  componentDidMount() {
    const { match } = this.props
    const diaryId = match.params.diaryId
    const currentUser = getCurrentUser()
    const fbDb = firebase.database()
    this.diaryRef = fbDb.ref(`diaries/${currentUser.uid}/${diaryId}`)
    this.diaryRef.on('value', snap => {
      this.setState({ diary: snap.val() })
    })

    this.entriesRef = fbDb.ref(`entries/${currentUser.uid}/${diaryId}`)
    this.entriesRef.on('value', snap => {
      this.setState({ entries: snap.val() })
    })
  }

  componentWillUnmount() {
    this.diaryRef.off('value')
  }

  render() {
    const { match } = this.props
    const { diaryId } = match.params
    const { entries, diary } = this.state

    return (
      <React.Fragment>
        <Navbar title={diary && diary.name} />
        {this.renderEntries(entries)}
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          to={`/diary/${diaryId}/entry/new`}
          component={Link}
          style={{ position: 'fixed', right: 15, bottom: 15 }}
        >
          <AddIcon />
        </Button>
      </React.Fragment>
    )
  }

  renderEntries(entries) {
    if (!entries) {
      return <div>No entries found</div>
    }

    return (
      <div>
        {Object.keys(entries).map(entryKey => (
          <EntryCard entryKey={entryKey} entry={entries[entryKey]} />
        ))}
      </div>
    )
  }
}

Diary.propTypes = {
  entries: arrayOf(string),
  name: string
}

export default Diary
