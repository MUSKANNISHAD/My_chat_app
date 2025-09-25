import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; 
import mongoose  from "mongoose";
import chatRoutes from "./routes/chat.js";



const app=express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api", chatRoutes);


const PORT=process.env.PORT || 8080;

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected with Database!");
    } catch(err) {
        console.log("Failed to connect with Db", err);
    }
}

// app.post("/test",async(req,res)=>{ 
//   // res.send("hello from server");
//   const options={
//     method:"POST",
//     headers:{
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,

//   },
//   body:JSON.stringify({
//     model:"gpt-4o-mini",
//     messages:[{
//       role:"user",
//       content:req.body.message
//     }]
//   })
// };
// try{
//     console.log("API Key Loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");
//   const response=await fetch("https://api.openai.com/v1/chat/completions",options);
//   const data=await response.json();
//   console.log(data);
//    res.json(data.choices[0].message.content);
// }catch(err){
//   res.send(err);
// }
// });



app.listen(process.env.PORT || 8080, "0.0.0.0", () => {
  console.log("Server running...");
});
