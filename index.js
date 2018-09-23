const fs = require('fs')
const fileName = '886b02d4-be8c-11e8-8770-0a58646bcc0a-telemetry.json'
const telemetryJson = fs.readFileSync(fileName, 'utf8')
const telemetry = JSON.parse(telemetryJson)

console.log('total events:' + telemetry.length)
const filteredJubei = filterTelemetryByName('jubei_za', telemetry)
const filteredBomz = filterTelemetryByName('bomz_za', telemetry)
console.log('jubei events:' + filteredJubei.length)
console.log('bomz events:' + filteredBomz.length)

// write some data
fs.writeFileSync(fileName + '.generated.pretty.json', prettyJson(telemetry))
fs.writeFileSync(fileName + '.generated.pretty.jubei.json', prettyJson(filteredJubei))
fs.writeFileSync(fileName + '.generated.pretty.bomz.json', prettyJson(filteredBomz))
fs.writeFileSync(fileName + '.generated.filteredEvents.jubei.txt', formatTelemetry(filteredJubei))
fs.writeFileSync(fileName + '.generated.filteredEvents.bomz.txt', formatTelemetry(filteredBomz))

// helper
function prettyJson (o) {
  return JSON.stringify(o, null, 4)
}

// helper
function filterTelemetryByName (name, telemetry) {
  const filtered = []

  telemetry.forEach(item => {
    if (item && item.character && item.character.name && item.character.name === name) {
      filtered.push(item)
    }

    if (item && item.name && item.name === name) {
      filtered.push(item)
    }

    if (item && item.victim && item.victim.name && item.victim.name === name) {
      filtered.push(item)
    }

    if (item && item.attacker && item.attacker.name && item.attacker.name === name) {
      filtered.push(item)
    }

    if (item && item.killer && item.killer.name && item.killer.name === name) {
      filtered.push(item)
    }
  })

  return filtered
}

// helper
function formatTelemetry (a) {
  let eventText = ''
  a.forEach(o => {
    eventText += o._D + ' ' + o._T

    if (o.common && o.common.isGame) eventText += ' stage:' + o.common.isGame

    if (o._T === 'LogPlayerAttack') {
      if (o.attacker && o.attacker.name) eventText += ' attacker:' + o.attacker.name
      if (o.victim && o.victim.name) eventText += ' victim:' + o.victim.name
    }

    if (o._T === 'LogPlayerTakeDamage') {
      if (o.attacker && o.attacker.name) eventText += ' attacker:' + o.attacker.name
      if (o.victim && o.victim.name) eventText += ' victim:' + o.victim.name
      if (o.damageTypeCategory) eventText += ' damageTypeCategory:' + o.damageTypeCategory
      if (o.damage) eventText += ' damage:' + o.damage
    }

    if (o._T === 'LogPlayerKill') {
      if (o.killer && o.killer.name) eventText += ' killer:' + o.killer.name
      if (o.victim && o.victim.name) eventText += ' victim:' + o.victim.name
    }

    eventText += '\n'
  })
  return eventText
}

/* event list

LogPlayerCreate
LogPlayerLogin
LogPlayerLogout

LogPlayerAttack
LogPlayerKill
LogArmorDestroy
LogPlayerMakeGroggy
LogPlayerTakeDamage
LogPlayerRevive
LogPlayerPosition

LogItemAttach
LogItemDetach
LogItemDrop
LogItemPickup
LogItemEquip
LogItemUnequip
LogItemUse

LogSwimStart
LogSwimEnd
LogVehicleRide
LogVehicleLeave
LogVehicleDestroy
LogWheelDestroy

LogCarePackageSpawn
LogCarePackageLand

LogMatchDefinition
LogMatchStart
LogMatchEnd
LogGameStatePeriodic
*/
