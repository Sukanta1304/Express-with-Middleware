const express= require("express");
const fs= require("fs")

const app= express();
app.use(express.json());

const validator= (req,res,next)=>{
const {id,title,content,author} = req.body;
if(isNaN(id)|| !isNaN(title)|| !isNaN(content)|| !isNaN(author)){
    return res.status(401).send("Validation Failed")
}
 next()
}
const logger= (req,res,next)=>{
    const method= req.method;
    const route= req.url;
    const userAgent= req.header("user-agent")
    const data = method+" "+ route+" "+userAgent + "     ";
    fs.appendFileSync("./logs.txt",data)
    next()
}

const guard=(req,res,next)=>{
    const password= req.headers["password"]
if(password!=="54123"){
    return res.status(401).send("You are not authorised to do this operation")
}
next()
}

app.get("/",logger,(req,res)=>{
    const data = fs.readFileSync("./posts.json", {encoding:"utf-8"});
    const Data= JSON.parse(data);
    const posts = Data.posts ;
    res.send(posts);
})
app.post("/posts/create",validator,(req,res)=>{
const userdata= JSON.stringify(req.body);
const data = fs.readFileSync("./posts.json", {encoding:"utf-8"});
const Data = JSON.parse(data);
const posts= Data.posts ;
const new_post = [...posts,JSON.parse(userdata)];
Data.posts= new_post ;
const updated= JSON.stringify(Data);
fs.writeFileSync("./posts.json",updated, "utf-8");
res.send("new post created successfully")
})
app.put("/posts/:id",guard,(req,res)=>{
    let {id}= req.params;
    let {title,content,author}= req.body;
    let data = fs.readFileSync("./posts.json",{encoding:"utf-8"});
    let Data= JSON.parse(data);
    let posts= Data.posts;
    let post= posts.find((p)=>p.id==parseInt(id));
    if(post != undefined){
        post.title= title,
        post.content= content,
        post.author= author

        Data.posts= [...posts];
        fs.writeFileSync("./posts.json",JSON.stringify(Data))
        res.send("product updated")
    }else{
        res.status(404).send("post not found");
    }
})
app.delete("/posts/:id",guard,(req,res)=>{
    let {id}= req.params;
    let data = fs.readFileSync("./posts.json",{encoding:"utf-8"});
    let Data= JSON.parse(data);
    let posts= Data.posts;
    let index= posts.findIndex((p)=> p.id===parseInt(id));
    if(index>=0){
        posts.splice(index,1);
        Data.posts= posts;
        fs.writeFileSync("./posts.json", JSON.stringify(Data));
        res.send("successfully deleted")
    }else{
        res.status(404).send("Product dosen't exist")
    }

})
app.listen(7000,()=>{
    console.log("App started")
})