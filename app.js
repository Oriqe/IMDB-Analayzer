var express = require("express");
var path = require("path");
const fs = require('fs')
const write_stream = fs.createWriteStream('resources/data.js')
var routes = require("./routes")
var app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'resources')))
app.set("views", path.join(__dirname, "views"));
app.use(routes)

fetch = require("node-fetch");


async function scraping() {
    console.log("Please wait for a couple of seconds until the data-scraping is completed")
    
    const address = await fetch("https://docs.google.com/spreadsheets/d/1--FMdHdg_fnfBvebZwngB1pukZCrlPO5frcVazuP58Q/edit", {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "x-client-data": "CIm2yQEIorbJAQjBtskBCKmdygEIl6zKAQjquMoBCK3BygEIrMfKAQj2x8oBCLTLygEI3NXKAQjwl8sBCJeaywEYisHKAQ=="
        },
        "referrer": "https://docs.google.com/spreadsheets/d/1--FMdHdg_fnfBvebZwngB1pukZCrlPO5frcVazuP58Q/edit",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        })
        .then((response) => response.text())
      
    splitted = address.split("\\")
    const movie_links = []
    for (let i=0; i<splitted.length; i++) {
        let link = splitted[i]
        if (link.includes("imdb") && link.length<60) {
        link = link.replace('"', '')
        if (!link.includes('http')) {
            link = 'https://www.' + link
        }
        movie_links.push(link)
        }
    }
    
    const semi_final_list = []
    for (let i=0; i<movie_links.length; i++) {
        const imdb = fetch(movie_links[i], {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7",
            "cache-control": "max-age=0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        })
        
        semi_final_list.push(imdb)
    }
        
    const final_list = []
    for (let i=0; i<semi_final_list.length; i++) {
        let fulfilled = await semi_final_list[i]
        fulfilled = await fulfilled.text()
        
        let cumulative = fulfilled.slice(fulfilled.indexOf('<h4 class="inline">Cumulative Worldwide Gross:</h4>'), -1)
        cumulative = cumulative.slice(cumulative.indexOf('$')+1, cumulative.indexOf('</div>'))
        cumulative = cumulative.trim().replace(/,/g,"")
        let budget = fulfilled.slice(fulfilled.indexOf('<h4 class="inline">Budget:</h4>'), fulfilled.indexOf('<span class="attribute">(estimated)</span>'))
        budget = budget.slice(budget.indexOf('$')+1, -1).replace(/,/g,"").trim()
        
        if (budget.length<1 || cumulative.length<1){
        continue
        }
        fulfilled = fulfilled.slice(fulfilled.indexOf('<script type="application/ld+json">{'), -1)
        fulfilled = fulfilled.slice(0, fulfilled.indexOf("</script>")).replace('@', '')
        fulfilled = fulfilled.replace('<script type="application/ld+json">', '')
        fulfilled = `{\n  "budget": ${budget},\n  "roi": ${(cumulative/budget)*100},\n  "cumulative": ${cumulative},\n` + fulfilled.slice(1, -1) + '}' 
    
        final_list.push(fulfilled)
    }
    
    
    write_stream.write(`const movie_list = [${String(final_list)}];`)
    
    return final_list
      
    
    }
  


scraping.then(data => {
    app.listen(app.get("port"), function(){
      console.log('Finished scraping and writing, The server is available at http://127.0.0.1:3000/')
    })
  })
