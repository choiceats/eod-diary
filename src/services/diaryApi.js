import firebase from 'firebase/app'
import uuidv1 from 'uuid/v1'

export const addDiary = async ({ name, description }) => {
  const diariesRef = firebase.database().ref('diaries')
  const newDiary = diariesRef.push()

  return await newDiary.set({
    name,
    description,
    entries: []
  })
}

export const addEntryToDiary = async entry => {
  return {
    entry,
    id: uuidv1()
  }
}
