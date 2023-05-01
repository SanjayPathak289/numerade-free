const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const request = require("request");
const { log } = require("console");
app.set("view engine", "hbs")
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));


    

    app.post("/answer",async(req,res) => {

                let str;
                let quesTitle;
                try {
                    const response =  await axios.get(req.body.query)
                const html = response.data;
                        const searchword1 = /poster/;
                        const searchword2= /data-setup/;
                        var x = html.match(searchword1).index;
                        var y = html.match(searchword2).index;
                        var title1 = html.match("<title>").index;
                        var title2 = html.match("</title>").index;


                        str = html.substring(x+8,y);
                        str.trim();
                        if (str.search("/ask_previews/") === -1) {
                            str = str.replace("/ask_previews/", "/ask_video/")
                        }
                        else{
                            str = str.replace("/ask_previews/", "/encoded/")
                        }
                        str = str.replace("_large","");
                        str = str.replace('jpg"',"webm");
                        quesTitle = html.substring(title1+7,title2).trim()


                    res.render("answer",{
                        videoUrl : str,
                        quesTitle
                    })
                } catch (error) {
                    res.render("index",{
                        invalidLink : "Error"
                    })
                }
                

            })
            
app.get("/", (req,res) => {

    res.render("index")
})
app.listen(8000,(req,res) => {
    console.log("Server listening");
})