const pluralise = (count: number, word: string) => {
  if (count === 1) {
    return word;
  } else {
    return `${word}s`;
  }
}

export default pluralise;