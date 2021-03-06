import React, { Component } from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

import db from '../services/firebase'
import { getCurrentUser } from '../services/user'
import EntryCard from '../components/EntryCard'
import Navbar from '../components/Navbar'
import Calendar from '../components/Calendar'

export class Diary extends Component {
  constructor(props) {
    super(props)
    this.state = { diary: null, entries: [] }
  }

  async componentDidMount() {
    const { match } = this.props
    const diaryId = match.params.diaryId
    const currentUser = getCurrentUser()

    this.entriesCollection = db.collection('entries')
    const entries = await this.entriesCollection
      .where('createdBy', '==', currentUser.uid)
      .where('diaryId', '==', diaryId)
      .get()

    const normalizedEntries = {}
    entries.forEach(entry => (normalizedEntries[entry.id] = entry.data()))

    this.setState({ entries: normalizedEntries })
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
        <Calendar />
      </React.Fragment>
    )
  }

  renderEntries(entries) {
    if (!entries) {
      return <div>No entries found</div>
    }

    const { match } = this.props
    const { diaryId } = match.params
    return (
      <div>
        {Object.keys(entries).map(entryKey => (
          <Link to={`/diary/${diaryId}/entry/${entryKey}`}>
            <EntryCard entryKey={entryKey} entry={entries[entryKey]} />
          </Link>
        ))}
      </div>
    )
  }
}

Diary.propTypes = {
  name: string
}

export default Diary
