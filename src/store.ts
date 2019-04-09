import { AsyncStorage } from "react-native"
import uuidv4 from "uuid/v4"
import { Saveable } from "./saveable"
import Session from "./Session"

const APP_PREFIX = "@values:"
const KEY_SESSION = `${APP_PREFIX}session`
// const KEY_DAILY_NOTIFICATION_ENABLED = `${APP_PREFIX}daily-notification-enabled`
// const KEY_DAILY_NOTIFICATION_TIME = `${APP_PREFIX}daily-notification-time`

function getKeyWithUuid(key: string, uuid: string): string {
  return `${key}${uuid}`
}

// TODO make private
// async function setValueForKey(key: string, value: string): Promise<void> {
//   try {
//     await AsyncStorage.setItem(key, value)
//   } catch (err) {
//     console.error(err)
//   }
// }
// // TODO make private
// async function getValueForKey(key: string): Promise<string | null> {
//   try {
//     return await AsyncStorage.getItem(key)
//   } catch (err) {
//     console.error(err)
//   }
// }

function sessionStringToObject(json: string): Session {
  const rawThing = JSON.parse(json)
  // Object.assign to create the class version of the serialized object (with functions)
  const newThing: Session = Object.assign(new Session([]), JSON.parse(json))

  newThing.createdAt = new Date(rawThing.createdAt)
  newThing.updatedAt = new Date(rawThing.updatedAt)

  // TODO inflate Round objects 9/0

  return newThing
}

async function saveSession(thing: Session): Promise<Session> {
  const typeOfThing = "session"

  // TODO pull into separate function
  const alreadySaved = (thing as Saveable).uuid !== undefined
  if (!alreadySaved) {
    thing.uuid = getKeyWithUuid(KEY_SESSION, uuidv4())
    thing.createdAt = new Date()
    console.log(`SAVING NEW ${typeOfThing}: ${thing.uuid}`)
  } else {
    console.log(`UPDATING ${typeOfThing}: ${thing.uuid}`)
  }
  thing.updatedAt = new Date()

  try {
    const thingString = JSON.stringify(thing)
    console.log(`STORING the ${typeOfThing}`) //: ${thingString}`)
    // No matter what, NEVER save bad data.
    if (!thingString || thingString.length <= 0) {
      console.error(`ERROR: something went very wrong stringifying this ${typeOfThing}`)
      return thing
    }

    await AsyncStorage.setItem(thing.uuid, thingString)
    return thing
  } catch (error) {
    console.error(error)
    return thing
  }
}

async function getSession(key: string): Promise<Session> {
  try {
    const thingString = await AsyncStorage.getItem(key)
    if (!thingString) {
      return undefined
    }
    // console.log(`returning item from string: ${thingString}`)
    return sessionStringToObject(thingString)
  } catch (error) {
    console.error(error)
    return undefined
  }
}

async function getSessions(): Promise<Session[]> {
  try {
    let keys = await AsyncStorage.getAllKeys()
    keys = keys.filter(key => key.includes(KEY_SESSION))
    // console.log(`GOT ${keys.length} KEYS`)
    let rows = await AsyncStorage.multiGet(keys)

    // Its better to lose data than to brick the app
    if (!rows) {
      rows = []
    }

    // This filter removes "null", "undefined" which we should NEVER EVER EVER let get
    // back to theuser since it'll brick their app
    const thingStrings = rows.filter(n => n)
    let thingObjects: Session[] = thingStrings.map(([key, value]) => sessionStringToObject(value))
    thingObjects = thingObjects.sort(
      (a, b): number => {
        return a.createdAt < b.createdAt ? 1 : -1
      }
    )
    return thingObjects
  } catch (error) {
    console.error(error)
    return []
  }
}

async function deleteSession(item: Session): Promise<void> {
  console.log(`DELETING daily item uuid: ${item.uuid}`)
  await deleteItemWithKey(item.uuid)
}

async function deleteItemWithKey(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}

async function clearAllStored(): Promise<void> {
  console.log("REMOVING all keys")
  try {
    const keys = await AsyncStorage.getAllKeys()
    AsyncStorage.multiRemove(keys)
  } catch (error) {
    console.error(error)
  }
}

export default {
  saveSession,
  getSessions,
  deleteSession,
}
