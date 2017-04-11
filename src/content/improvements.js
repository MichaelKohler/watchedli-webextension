const buildList = () => {
  const series = [];

  const activeSeriesDOMNodes = document.querySelectorAll('.show-tile:not(.is-inactive)');
  if (activeSeriesDOMNodes && activeSeriesDOMNodes.length > 0) {
    activeSeriesDOMNodes.forEach((node) => {
      const seriesInfo = getEpisodesInformation(node);
      series.push(seriesInfo);
    });
  }

  return series;
};

const getUnseenEpisodes = (node) => {
  const episodeList = node.querySelectorAll('.episodes-list li');
  const episodeInfos = [];

  for (const episode of episodeList) {
    const unseenLink = episode.querySelector('a.is-unseen');

    if (unseenLink) {
      const episodeInfo = {
        number: episode.querySelector('.e-count').innerHTML,
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

const createTableRow = (episode, seriesName, urlPattern) => {
  const tableRow = document.createElement('tr');

  const seriesCell = document.createElement('td');
  seriesCell.innerText = seriesName;
  tableRow.appendChild(seriesCell);

  const numberCell = document.createElement('td');
  numberCell.innerText = episode.number;
  tableRow.appendChild(numberCell);

  const nameCell = document.createElement('td');
  nameCell.innerText = episode.name;
  tableRow.appendChild(nameCell);

  const linkCell = document.createElement('td');
  const link = document.createElement('a');
  link.innerText = 'More info →';
  const searchTerm = seriesName + ' ' + episode.number;
  link.href = urlPattern.replace('%S', searchTerm);
  link.target = '_blank';
  linkCell.appendChild(link);
  tableRow.appendChild(linkCell);

  return tableRow;
};

const addTable = (list, urlPattern) => {
  const table = document.createElement('table');

  for (const series of list) {
    const seriesName = series.series;
    for (const listItem of series.episodes) {
      const tableRow = createTableRow(listItem, seriesName, urlPattern);
      table.appendChild(tableRow);
    }
  }

  const existingSection = document.querySelector('.unseen-episodes');

  if (!existingSection) {
    const content = document.querySelector('.info');

    const section = document.createElement('section');
    section.classList.add('unseen-episodes');

    const header = document.createElement('header');
    const title = document.createElement('h2');
    title.innerText = 'Unseen episodes';
    const shareButton = document.createElement('button');
    shareButton.id = 'shareButton';
    shareButton.innerText = 'Copy list to clipboard';

    header.appendChild(title);
    header.appendChild(shareButton);

    section.appendChild(header);
    section.appendChild(table);

    content.appendChild(section);
  }
};

const readURLPattern = () => {
  let url = 'https://google.com/?q=%S';
  const getting = browser.storage.local.get("url");

  return getting.then((config) => {
    if (config.url) {
      url = config.url;
    }
    return url;
  }, (err) => {
    console.log(`Error: ${error}`);
    return url;
  });
};

const copyList = () => {
  console.log('clicked, copying ...');
  const pseudoList = document.querySelector('#pseudo-list');
  pseudoList.select();
  document.execCommand('copy');
};

const attachCopyListener = () => {
  var copyButton = document.querySelector('#shareButton');
  copyButton.addEventListener('click', copyList);
};

const addHiddenCopyableList = (list) => {
  const episodeListElement = document.createElement('input');
  epsiodeListElement.id = 'pseudo-list';

  for (const listItem of list) {
    for (const episode of listItem.episodes) {
      episodeListElement.value += listItem.series + ' ' + episode.number + ',';
    }
  }

  const content = document.querySelector('.info');
  content.appendChild(episodeListElement);
};

const list = buildList();

readURLPattern().then((urlPattern) => {
  addTable(list, urlPattern);
  attachCopyListener();
  addHiddenCopyableList(list);
});
