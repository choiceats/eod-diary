import React from 'react'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { getCurrentUser } from '../services/user'
import StyledList from '../components/StyledList'
import Navbar from '../components/Navbar'

import './DiaryList.css'

export const SimpleList = ({ classes, diaries }) => (
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
const StyledSimpleList = StyledList(SimpleList)

export class DiaryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingStatus: 'loading',
      diaries: []
    }
  }

  componentDidMount() {
    const currentUser = getCurrentUser()
    this.diaryListRef = firebase.database().ref(`diaries/${currentUser.uid}`)
    this.diaryListRef.on('value', snap => {
      this.setState({ diaries: snap.val() })
    })
  }

  componentWillUnmount() {
    this.diaryListRef.off('value')
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
