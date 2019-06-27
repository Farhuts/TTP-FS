'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'user1@gmail.com',
      userName: 'Codi',
      password: '123',
      balance: 5000
    }),
    User.create({
      email: 'user2@gmail.com',
      userName: 'Lola',
      password: '111',
      balance: 5000
    }),
    User.create({
      email: 'user3@gmail.com',
      userName: 'Mola',
      password: '222',
      balance: 5000
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

module.exports = seed
