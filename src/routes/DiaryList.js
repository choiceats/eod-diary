import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Grid from 'material-ui/Grid'

import { loadDiaries } from '../store/actions'

import './DiaryList.css'

const listStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
})

const SimpleList = ({ classes, diaries }) => (
  <div className={classes.root}>
    <List component="nav">
      {diaries.map((d, i) => (
        <Link to={`/diary/${d.id}`}>
          <ListItem key={i} button>
            <ListItemText>{d.description}</ListItemText>
          </ListItem>
        </Link>
      ))}
    </List>
  </div>
)
const StyledList = withStyles(listStyles)(SimpleList)

class DiaryList extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadDiaries())
  }

  render() {
    const { diaries } = this.props

    return (
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
    )
  }
}

DiaryList.defaultProps = {
  diaries: []
}

const mapStateToProps = ({ diaries }) => ({ diaries })

export default connect(mapStateToProps)(DiaryList)
