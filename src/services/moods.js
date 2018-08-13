const MOODS = [
  { value: 'verysatisfied', icon: 'SentimentVerySatisfied' },
  { value: 'satisfied', icon: 'SentimentSatisfied' },
  { value: 'neutral', icon: 'SentimentNeutral' },
  { value: 'dissatisfied', icon: 'SentimentDissatisfied' },
  { value: 'verydissatisfied', icon: 'SentimentVeryDissatisfied' }
]

export async function getUsersMoods(userId) {
  // Hardcode for now
  return Promise.resolve(MOODS)
}

export function getMoodIconFromValue(value) {
  const mood = MOODS.find(mood => mood.value === value)
  return mood ? mood.icon : null
}
