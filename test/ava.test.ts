import test from 'ava'
import mainCrayon from 'crayon.js'
import crayon, { colorKeywords } from '../lib/index.js'
import { ColorKeyword } from '../lib/types'

test('does it work', (t) => {
	for (const keyword in colorKeywords) {
		const color = colorKeywords[keyword]
		try {
			t.is(crayon[keyword as ColorKeyword]('test'), `${color}test\x1B[0m`)
		} catch (error) {
			t.fail(error)
		}
	}
})

test('extension works after instancing', (t) => {
	t.is(!!crayon()['olive'], true)
	t.is(!!crayon.instance(false, '')['olive'], true)
	t.is(!!crayon.instance(true, '')['olive'], true)
	t.is(!!crayon.clone(false)['olive'], true)
})

test('extension affects main instance', (t) => {
	t.is(!!(mainCrayon as any)['olive'], true)
})
