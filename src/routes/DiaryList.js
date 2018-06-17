import React from 'react'
import * as firebase from 'firebase'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Grid from 'material-ui/Grid'

import Navbar from '../components/Navbar'

import './DiaryList.css'

const listStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

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
const StyledList = withStyles(listStyles)(SimpleList)

export class DiaryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loadingStatus: 'loading',
      diaries: []
    }
  }

  componentDidMount() {
    this.diaryListRef = firebase.database().ref('diaries')
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
        <Grid container className="diaryList">
          <StyledList diaries={diaries} />
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
        </Grid>
      </React.Fragment>
    )
  }
}

export default DiaryList
