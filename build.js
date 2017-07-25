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
  lumendark: 'https://raw.githubusercontent.com/Artoria-0x04/poi-theme-lumendark/master/lumendark.css',
  paperdark: 'https://raw.githubusercontent.com/ruiii/poi_theme_paper_dark/master/paperdark.css',
  papercyan: 'https://raw.githubusercontent.com/govizlora/theme-papercyan/master/papercyan.css',
  paperblack: 'https://raw.githubusercontent.com/Artoria-0x04/paperblack/master/css/paperblack.css',
  darklykai: 'https://raw.githubusercontent.com/magicae/sleepy/master/dist/sleepy.css',
}

const VIBRANT_THEME_LIST = {
  darkly: 'https://github.com/gnattu/poi-vibrancy-themes/blob/master/dists/darkly.css',
  darklykai: 'https://github.com/gnattu/poi-vibrancy-themes/blob/master/dists/darklykai.css',
  paperblack: 'https://github.com/gnattu/poi-vibrancy-themes/blob/master/dists/paperblack.css',
  papercyan: 'https://github.com/gnattu/poi-vibrancy-themes/blob/master/dists/papercyan.css',
  paperdark: 'https://github.com/gnattu/poi-vibrancy-themes/blob/master/dists/paperdark.css',
}

const THEMES = {
  normal: Object.keys(THEME_LIST),
  vibrant: Object.keys(VIBRANT_THEME_LIST),
}

const main = async () => {
  ensureDir(path.join(__dirname, 'dist'))
  await outputJson(path.join(__dirname, 'index.json'), THEMES)
  Object.keys(THEME_LIST).forEach(async (theme) => {
    try {
      const resp = await fetch(THEME_LIST[theme])
      let css = await resp.text()
      css = css.replace(/@import.*fonts.*;\n/g, '')
      css = css.replace(/@font-face[\s\S]*?}\n/g, '')
      css = css.replace(/^.glyph[\s\S]*?}\n/gm, '')
      const file = path.join(__dirname, 'dist', 'normal', `${theme}.css`)
      await outputFile(file, css)
      console.info('wrote ', file)
    } catch (e) {
      console.error(e.stack)
    }
  })
  Object.keys(VIBRANT_THEME_LIST).forEach(async (theme) => {
    try {
      const resp = await fetch(VIBRANT_THEME_LIST[theme])
      let css = await resp.text()
      css = css.replace(/@import.*fonts.*;\n/g, '')
      css = css.replace(/@font-face[\s\S]*?}\n/g, '')
      css = css.replace(/^.glyph[\s\S]*?}\n/gm, '')
      const file = path.join(__dirname, 'dist', 'vibrant', `${theme}.css`)
      await outputFile(file, css)
      console.info('wrote ', file)
    } catch (e) {
      console.error(e.stack)
    }
  })
}

main()
