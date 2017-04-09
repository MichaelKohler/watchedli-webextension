const buildList = () => {
  const series = [];

  const activeSeriesDOMNodes = document.querySelectorAll('.show-tile:not(.is-inactive)');
  if (activeSeriesDOMNodes && activeSeriesDOMNodes.length > 0) {
    activeSeriesDOMNodes.forEach((node) => {
      const seriesInfo = getEpisodesInformation(node);
      console.log(seriesInfo);
      series.push(seriesInfo);
    });

    console.log(series);
  }
};

const getUnseenEpisodes = (node) => {
  const episodeList = node.querySelectorAll('.episodes-list li');
  const episodeInfos = [];

  for (const episode of episodeList) {
    const unseenLink = episode.querySelector('a.is-unseen');

    if (unseenLink) {
      const episodeInfo = {
        title: episode.querySelector('.e-count').innerHTML,
        name: episode.querySelector('.e-title').innerHTML
      };
      episodeInfos.push(episodeInfo);
    }
  }

  return episodeInfos;
};

const getEpisodesInformation = (node) => {
  return {
    series: node.querySelector('h2').innerHTML,
    episodes: getUnseenEpisodes(node)
  };
};

const createTableRow = (episode) => {
  return episode;
};

const addTable = (list) => {
  // TODO
};

console.log('lets start that thing!!');
const list = buildList();
addTable(list);
