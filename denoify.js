import { promises as fs } from 'fs'
const importExportRegex = /\s.+\sfrom\s("|'|`)(.+(?<!\.ts))\1/
const tsFileRegex = /^.*.ts*$/

const pureCrayonModuleRegex = /^crayon.js$/
const crayonModuleRegex = /^[^@]?crayon\.js(.*)$/

fs
	.readdir('src', {
		withFileTypes: true,
		encoding: 'utf-8',
	})
	.then((files) => {
		files = files.filter((file) => tsFileRegex.test(file.name))
		files.forEach(denoify)
	})
	.catch((error) => {
		console.log(`couldn't open src/`, error)
	})

const denoify = async (file) => {
	let fileContent = (await fs.readFile(`src/${file.name}`)).toString()

	let importMatches = fileContent.match(importExportRegex)
	while (importMatches?.length) {
		const importMatch = importMatches[0]
		const importedFile = importMatches[2]

		const crayonModule = importedFile.match(crayonModuleRegex)

		if (pureCrayonModuleRegex.test(importedFile))
			fileContent = fileContent.replace(
				importMatch,
				importMatch.replace(importedFile, 'https://deno.land/x/crayon/mod.ts')
			)
		else if (crayonModule?.length) {
			fileContent = fileContent.replace(
				importMatch,
				importMatch.replace(
					importedFile,
					`https://deno.land/x/crayon${crayonModule[1].replace('/lib', '')}.ts`
				)
			)
		} else
			fileContent = fileContent.replace(
				importMatch,
				importMatch.replace(importedFile, importedFile + '.ts')
			)

		importMatches = fileContent.match(importExportRegex)
	}

	console.log(`minified ${file.name}`)

	fs.writeFile(`./deno_lib/${file.name}`, fileContent)
}
