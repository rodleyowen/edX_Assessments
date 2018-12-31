const csvjson = require('csvjson')
const fs = require('fs')
const path = require('path')

const csvconvertToJSON = (filename) => { console.log('Converting data ... ') 
      fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
         if (err) {
            console.log(`Error while reading the CSV file ...\n ${err.message}`)}
      const lines = data.split('\n')
      const headers = lines[0].split(',')
      
      const jsonContent = createJSON(lines, headers)
      const jsonFilename = path.parse(filename).name + '.json'
      fs.writeFile(path.join(__dirname,jsonFilename), jsonContent, (err) => {
         if (err) { console.log(`Error while writing the JSON file ...\n ${err.message}`)}
      console.log('File conversion completed ...')})
      })
}

const createJSON = (dataRows, dataHeaders) => {
      let results = []
      for (let i = 1, ilen = dataRows.length; i < ilen; i += 1) {
          let item = {}
          let dataColumns = dataRows[i].split(',')
          for (let x =1, xlen = dataHeaders.length; x < xlen; x += 1) { 
              item[dataHeaders[x]] = dataColumns[x]}
          results.push(item) }
      return JSON.stringify(results)
}

csvconvertToJSON(process.argv[2])

