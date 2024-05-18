import { getLevenshteinSimilarity } from './levenshtein';

const icons = [
  { name: 'asana', src: require('../assets/icons/asana.jpg') },
  { name: 'bliss', src: require('../assets/icons/bliss.jpg') },
  { name: 'chakrasana', src: require('../assets/icons/chakrasana.jpg') },
  { name: 'meditation', src: require('../assets/icons/meditation.jpg') },
  { name: 'power', src: require('../assets/icons/power.jpg') },
  { name: 'shavasana', src: require('../assets/icons/shavasana.jpg') },
  { name: 'standing', src: require('../assets/icons/standing.jpg') },
  { name: 'sunsalutation', src: require('../assets/icons/sunsalutation.jpg') }
];

const getBestMatchingIcon = (exerciseName) => {
  let bestMatch = null;
  let highestSimilarity = 0;

  icons.forEach(icon => {
    const similarity = getLevenshteinSimilarity(exerciseName, icon.name);
    if (similarity > highestSimilarity) {
      highestSimilarity = similarity;
      bestMatch = icon.src;
    }
  });

  if (highestSimilarity < 0.5) {
    bestMatch = icons[Math.floor(Math.random() * icons.length)].src;
  }

  return bestMatch;
};

export default getBestMatchingIcon;