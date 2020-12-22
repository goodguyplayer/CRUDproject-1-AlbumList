const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("workshoptdc"))
            .catch(err => console.log(err))

const PAGE_SIZE	= 20;

module.exports = { insertOne, update, deleteOne, countAll, findOne, PAGE_SIZE }

// returns all
function findAll(page){
	const sizeSkip = PAGE_SIZE * (page - 1);
	return global.conn.collection("albums")
				.find({})
				.skip(sizeSkip)
				.limit(PAGE_SIZE)
				.toArray();
}

// Create new entry
function insertOne(albums, callback){
	global.conn.collection("albums").insert(albums, callback);	
}

// Update an album, in case you mistyped the name or something.
function update(id, albums, callback){
	global.conn.collection("albums").updateOne({_id: new ObjectId(id)}, {$set:albums}, callback);
}

// Delete an album. You monster.
function deleteOne(id, callback){
	global.conn.collection("albums").deleteOne({_id: new ObjectId(id)}, callback);
}

// Counts all instances of the document
function countAll(){  
    	return global.conn.collection("albums").countDocuments();
}

// find a specific one by ID
var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("albums").find(new ObjectId(id)).toArray(callback);
}

