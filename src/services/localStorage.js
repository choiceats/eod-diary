import uuidv1 from 'uuid/v1'

export const setItem = window.localStorage.setItem.bind(window.localStorage)
export const getItem = window.localStorage.getItem.bind(window.localStorage)

export const fetchDiaries = () => getItem('diaries')

export const addDiary = ({ name, description }) => {
  const diaries = JSON.parse(fetchDiaries() || '[]')
  const newDiary = {
    name,
    description,
    id: uuidv1(),
    entries: []
  }
  setItem('diaries', JSON.stringify([...diaries, newDiary]))
  return newDiary
}
