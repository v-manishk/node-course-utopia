
// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId 

const { MongoClient, ObjectId } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
// console.log('Hello')

// MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
//     console.log('Hello1')

//     if (error) {
//         return console.log('Failed ')
//     }

//     // console.log('Connected')

    // const db = client.db(databaseName)
//     db.collection('documents').inserOne({
//         name: 'Manish',
//         age: 22
//     }), (error, result) => {
//         if (error) {
//             return console.log('Unable to print')
//         }

//         console.log(result.ops)
//     }
// })


const client = new MongoClient(connectionURL);




async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');


  const db = client.db(databaseName)
  // const insertResult = await db.collection('task').insertOne({
  //   _id: id,
  //   description: 'Mnaihs',
  //   completed: false
  // })
  // // const insertResult = await db.collection('task').insertMany([{ description: 'Complete this nodejs tutorial', completed: false }, { description: 'finish backend course', completed: false }, {description: 'finish basic java', completed: true}]);
  // console.log('Inserted documents =>', insertResult);

  // const findResult = await db.collection('task').countDocuments({ completed : false});
  // console.log('Found documents => ', findResult)

  // await db.collection('documents').insertMany([
  //   {
  //     name: 'axy',
  //     age: 30
  //   }, {
  //     name: 'asd',
  //     age: 30
  //   }
  // ]).then((result) => {
  //   console.log('Success!', result)
  // }).catch((error) => {
  //   console.log('Error!', error)
  // })

  await db.collection('documents').deleteMany({
    age: 30
  }).then((result) => {
    console.log('Success!', result)
  }).catch((error) => {
    console.log('Error!', error)
  })

  // await db.collection('documents').updateOne({
  //   name: 'Ram'
  // }, {
  //   $inc: {
  //     age: -2
  //   }
  // }).then((result) => {
  //   console.log('Updated:', result)
  // }).catch((error) => {
  //   console.log('Error!', error)
  // })

  // await db.collection('documents').updateMany({
  //   }, {
  //     $inc: {
  //       age: +2
  //     }
  //   }).then((result) => {
  //     console.log('Updated:', result)
  //   }).catch((error) => {
  //     console.log('Error!', error)
  //   })


  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());