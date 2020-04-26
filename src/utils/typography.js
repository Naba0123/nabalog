import Typography from "typography"
import theme from "typography-theme-japanese-tofu"

theme.headerFontFamily = [
  "Helvetica Neue",
  "Arial",
  "Hiragino Sans",
  "Hiragino Kak Gothic ProN",
  "BIZ UDPGothic",
  "Meiryo",
  "sans-serif",
]
theme.bodyFontFamily = [
  "Helvetica Neue",
  "Arial",
  "Hiragino Sans",
  "Hiragino Kak Gothic ProN",
  "BIZ UDPGothic",
  "Meiryo",
  "sans-serif",
]

// const typography = new Typography(Wordpress2016)
const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
