import uuidv1 from 'uuid/v1'

export const setItem = window.localStorage.setItem.bind(window.localStorage)
export const getItem = window.localStorage.getItem.bind(window.localStorage)

export const fetchDiaries = () => JSON.parse(getItem('diaries') || '[]')

export const fetchEntries = id => {
  const diaries = JSON.parse(getItem('diaries') || '[]')
  const diary = diaries.find(d => (d.id = id))
  const diaryEntries = diary && diary.entries

  return Array.isArray(diaryEntries) ? diaryEntries : null
}

export const addDiary = ({ name, description }) => {
  const diaries = fetchDiaries()
  const newDiary = {
    name,
    description,
    id: uuidv1(),
    entries: []
  }
  setItem('diaries', JSON.stringify([...diaries, newDiary]))
  return newDiary
}
