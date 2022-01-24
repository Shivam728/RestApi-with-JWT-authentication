const http= require("http");
const app= require("./app");
const server = http.createServer(app);




app.listen(3000,function(){
    console.log("Server running on 3000");
})