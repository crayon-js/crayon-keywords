import crayon, { addStyles } from 'crayon.js'
import { Crayon } from 'crayon.js/lib/types'
import { colorKeywords } from './styles'
import { ColorKeyword } from './types'

addStyles(colorKeywords)

export default crayon as Crayon<ColorKeyword>
export * from 'crayon.js'
