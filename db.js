const mongoose = require('mongoose');
const mongoURI='mongodb://gofood:gofood123456@ac-kmebbau-shard-00-00.oidcuyq.mongodb.net:27017,ac-kmebbau-shard-00-01.oidcuyq.mongodb.net:27017,ac-kmebbau-shard-00-02.oidcuyq.mongodb.net:27017/?ssl=true&replicaSet=atlas-12ueyk-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'
port=5000
const mongoDB=async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser: true},async(err,result)=>{
        if(err)console.log("---",err)
        else{
            console.log("Connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray( async function(err,data){
                const foodCategory= await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                    if(err){
                            console.log(err);
                        }
                        else{
                            global.food_items=data;
                            global.foodCategory=catData;
                        } 
                })
                // if(err){
                //     console.log(err);
                // }
                // else{
                //     global.food_items=data;
                // }
            })
        }
      
    });
}

module.exports=mongoDB;