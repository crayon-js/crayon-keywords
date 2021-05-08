import crayon, { addStyles } from 'https://deno.land/x/crayon/mod.ts'
import { Crayon } from 'https://deno.land/x/crayon/types.ts'
import { colorKeywords } from './styles.ts'
import { ColorKeyword } from './types.ts'

addStyles(colorKeywords)

export default crayon as Crayon<ColorKeyword>
export * from 'https://deno.land/x/crayon/mod.ts'
