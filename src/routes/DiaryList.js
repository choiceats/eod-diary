import React from 'react'
import firebase from 'firebase/app'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import db from '../services/firebase'
import { getCurrentUser } from '../services/user'
import StyledList from '../components/StyledList'
import Navbar from '../components/Navbar'

import './DiaryList.css'

export const SimpleList = ({ classes, diaries }) => {
  if (!diaries) {
    return null
  }

  return (
    <div className={classes.root}>
      <List component="nav">
        {Object.keys(diaries).map(diaryKey => (
          <Link key={diaryKey} to={`/diary/${diaryKey}`}>
            <ListItem button>
              <ListItemText>{diaries[diaryKey].name}</ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
}

const StyledSimpleList = StyledList(SimpleList)

export class DiaryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingStatus: 'loading',
      diaries: []
    }
  }

  async componentDidMount() {
    const currentUser = getCurrentUser()
    this.diariesRef = db.collection('diaries')
    const myDiaries = await this.diariesRef
      .where('createdBy', '==', currentUser.uid)
      .get()

    const diaryList = {}
    myDiaries.forEach(diaryData => (diaryList[diaryData.id] = diaryData.data()))

    console.log({ diaryList })
    this.setState({ diaries: diaryList })
  }

  render() {
    const { diaries } = this.state

    return (
      <React.Fragment>
        <Navbar title={'My Diaries'} />
        <StyledSimpleList diaries={diaries} />
        <Button
          variant="fab"
          color="primary"
          aria-label="add"
          to="/diary/new"
          component={Link}
          style={{ position: 'fixed', right: 15, bottom: 15 }}
        >
          <AddIcon />
        </Button>
      </React.Fragment>
    )
  }
}

export default DiaryList
