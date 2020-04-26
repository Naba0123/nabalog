import Typography from "typography"
import theme from "typography-theme-japanese-tofu"

// theme.headerFontFamily = [
//   "Hiragino Kaku Gothic Pro",
//   "ヒラギノ角ゴ Pro W3",
//   "メイリオ",
//   "Meiryo",
//   "ＭＳ Ｐゴシック",
//   "sans-serif",
// ]
// theme.bodyFontFamily = [
//   "Hiragino Kaku Gothic Pro",
//   "ヒラギノ角ゴ Pro W3",
//   "メイリオ",
//   "Meiryo",
//   "ＭＳ Ｐゴシック",
//   "sans-serif",
// ]

// const typography = new Typography(Wordpress2016)
const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
