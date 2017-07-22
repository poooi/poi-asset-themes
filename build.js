const path = require('path')
const fetch = require('node-fetch')
const { outputFile, outputJson, ensureDir } = require('fs-extra')

const THEME_LIST = {
  __default__: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css',
  darkly: 'https://bootswatch.com/darkly/bootstrap.css',
  flatly: 'https://bootswatch.com/flatly/bootstrap.css',
  lumen: 'https://bootswatch.com/lumen/bootstrap.css',
  paper: 'https://bootswatch.com/paper/bootstrap.css',
  slate: 'https://bootswatch.com/slate/bootstrap.css',
  superhero: 'https://bootswatch.com/superhero/bootstrap.css',
  united: 'https://bootswatch.com/united/bootstrap.css',
  lumendark: 'https://raw.githubusercontent.com/PHELiOX/poi-theme-lumendark/master/lumendark.css',
  paperdark: 'https://raw.githubusercontent.com/ruiii/poi_theme_paper_dark/master/paperdark.css',
  papercyan: 'https://raw.githubusercontent.com/govizlora/theme-papercyan/master/papercyan.css',
  paperblack: 'https://raw.githubusercontent.com/PHELiOX/paperblack/master/css/paperblack.css',
  darklykai: 'https://raw.githubusercontent.com/magicae/sleepy/master/dist/sleepy.css',
}


const main = async () => {
  ensureDir(path.join(__dirname, 'dist'))
  await outputJson(path.join(__dirname, 'index.json'), Object.keys(THEME_LIST))
  Object.keys(THEME_LIST).forEach(async (theme) => {
    try {
      const resp = await fetch(THEME_LIST[theme])
      let css = await resp.text()
      css = css.replace(/@import.*fonts.*;\n/g, '')
      css = css.replace(/@font-face[\s\S]*?}\n/g, '')
      css = css.replace(/^.glyph[\s\S]*?}\n/gm, '')
      const file = path.join(__dirname, 'dist', `${theme}.css`)
      await outputFile(file, css)
      console.info('wrote ', file)
    } catch (e) {
      console.error(e.stack)
    }
  })
}

main()
