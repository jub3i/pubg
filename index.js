const fs = require('fs')
const fileName = '886b02d4-be8c-11e8-8770-0a58646bcc0a-telemetry.json'
const telemetryRaw = fs.readFileSync(fileName, 'utf8')
const telemetryJson = JSON.parse(telemetryRaw)
const telemetryJsonPretty = prettyJson(telemetryJson)

console.log(typeof telemetryJson)
console.log(telemetryJson.length)

fs.writeFileSync(fileName + '.pretty.json', telemetryJsonPretty)

function prettyJson (json) {
  return JSON.stringify(json, null, 4)
}
