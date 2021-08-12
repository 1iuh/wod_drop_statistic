const { author, dependencies, repository, version } = require('../package.json')

module.exports = {
  name: 'WoD_Drops_Statistics',
  namespace: '1iuh',
  version: version,
  author: author,
  source: repository.url,
  // 'license': 'MIT',
  match: [
    'http*://*.world-of-dungeons.org/wod/spiel//dungeon/report.php*',
    'http*://*.world-of-dungeons.org/wod/spiel/dungeon/report.php*'
  ],
  require: [
    `https://cdn.jsdelivr.net/npm/jquery@${dependencies.jquery}/dist/jquery.min.js`,
    `https://cdn.jsdelivr.net/npm/axios@${dependencies.axios}/dist/axios.min.js`,
    `https://cdn.jsdelivr.net/npm/axios-userscript-adapter@${dependencies['axios-userscript-adapter']}/dist/axiosGmxhrAdapter.min.js`,
  ],
  grant: [
    'GM.xmlHttpRequest'
  ],
  connect: [
      'www.wodgroup.top'
  ],
  'run-at': 'document-end'
}
