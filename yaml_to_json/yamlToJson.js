#!/usr/bin/env node

const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const glob = require('glob')

const readYamlReturnJson = (file) => yaml.safeLoad(fs.readFileSync(file, 'utf-8'))
const logUsage = (code) => {
  console.log("\tyamlToJSON.js INPUT_DIR [OUTPUT_DIR]")
  console.log("\t- if OUTPUT_DIR is omitted then STDOUT will be used")
  process.exit(code)
}

const args = process.argv
if (args.length == 2) {
  logUsage(0)
}

let inputDir, outputDir
try {
  inputDir = path.resolve(args[2])
} catch (e) {
  console.error(e)
  logUsage(1)
}
try {
  outputDir = path.resolve(args[3])
} catch (e) {
  // console.log("OUTPUT_DIR not specified (or errored), writing to STDOUT")
}

glob(`${inputDir}/*.recipe`, (err, files) => {
  if (err) console.error(err) && process.exit(1)
  console.log(files.join('\n'))
  const recipes = files.map(readYamlReturnJson)
  const jsonContent = 'window.recipes = ' + JSON.stringify(recipes)

  if (outputDir) fs.writeFileSync(`${outputDir}/recipes.js`, jsonContent)
  else console.log(jsonContent)
})
