export const formatVotesCount = (num: number): string => {
  const suffixes = ['', 'K', 'M'];

  let c = 0;
  while (num >= 1000 && c < suffixes.length - 1) {
    num /= 1000;
    c++;
  }

  return num.toFixed(1).replace(/\.0$/, '') + suffixes[c];
};

export const formatTime = (mins: number): string => {
  const hs = Math.floor(mins / 60);
  const ms = mins % 60;

  return `${hs}h ${ms < 10 ? '0' : ''}${ms}m`;
};
