const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
require('dotenv').config()

const port = process.env.PORT || 9000
const app = express()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@anonto96.bxfwp.mongodb.net/?retryWrites=true&w=majority&appName=Anonto96`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    const db = client.db('AssignHub')
    const assignmentCollection = db.collection('assignments')
    const submissionsCollection = db.collection('submissions')

    // save a assignment data to db
    app.post('/create-assignments', async(req,res)=>{
      const assignmentData = req.body
      const result = await assignmentCollection.insertOne(assignmentData)
      res.send(result)
    })
    // get all assignment data
    app.get('/allAssignments', async(req, res) =>{
      const result = await assignmentCollection.find().toArray()
      res.send(result)
    })
    // get all assignment posted by specific user
    app.get('/allAssignments/:email',async(req,res)=>{
      const email = req.params.email
      const query = {email: email}
      const result = await assignmentCollection.find(query).toArray()
      res.send(result)
    })
    // delete a data
    app.delete('/assignment/:id',async(req, res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await assignmentCollection.deleteOne(query)
      res.send(result)
    })
    // get a single job from db
    app.get('/assignment/:id',async(req,res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await assignmentCollection.findOne(query)
      res.send(result)
    })
    // update and insert a specific data to database
    app.put('/update-assignment/:id', async(req,res)=>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const assignmentData = req.body
      const updated = {
        $set: assignmentData
      }
      // options is optional..it saves data if it is not existed in the database 
      const options = {upsert: true}

      const result = await assignmentCollection.updateOne(query,updated,options)
      res.send(result)
    })

    // save a submission data to db
    app.post('/add-submission', async(req,res)=>{
      const submissionData = req.body
      // checking if a submission data is already exist
      const query = {
        email: submissionData.email, jobId: submissionData.jobId
      }
      const alreadyExist = await submissionsCollection.findOne(query)
      if(alreadyExist) return res.status(400).send('you have already placed a submission')

      const result = await submissionsCollection.insertOne(submissionData)
      res.send(result)
    })
    // get all submission data submitted by specific user
    app.get('/allSubmissions/:email',async(req,res)=>{
      const email = req.params.email
      const query = {submittedBy: email}
      const result = await submissionsCollection.find(query).toArray()
      res.send(result)
    })
    // get all submission data submitted on a specific users assignment
    app.get('/allPendingSubmissions/:email',async(req,res)=>{
      const email = req.params.email
      const query = {email: email}
      const result = await submissionsCollection.find(query).toArray()
      res.send(result)
    })


    // Send a ping to confirm a successful connection
    // await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir)
app.get('/', (req, res) => {
  res.send('Hello from Server....')
})

app.listen(port, () => console.log(`Server running on port ${port}`))
