import { connect } from "mongoose"

const mongo = process.env.MONGODB_URL
if(!mongo){
    console.log("url not found")
}
let cache = global.mongoose
if(!cache){
    cache = global.mongoose = {conn:null , promise:null}
}

const ConnectDb = async()=> {
if(cache.conn){
    return cache.conn
}

if(!cache.promise){
  cache.promise = connect(mongo!).then((c)=>c.connection)
}

try{
  cache.conn=await cache.promise
}catch(error){
console.log(error)
}
return cache.conn
}
 export default ConnectDb