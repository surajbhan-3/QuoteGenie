const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4500;

app.use(express.json());
app.use(cors());


app.post('/search-data', async (req, res) => {
    try {
        const {option,value} = req.query;
       let word=30;
        if(option == "story"){
             word=100;
        }
        
        
        let response = await fetch(`https://api.openai.com/v1/chat/completions`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `give me a short ${option} in ${word} words  on ${value}` }],
                max_tokens: 1000
            })
        });
  
        response = await response.json();
  
        // Check if response.choices is defined and not empty
        if (response.choices && response.choices.length > 0) {
            const data = response.choices[0].message.content;
            res.status(200).send({ result: data });
        } else {
            
            res.status(500).send({ msg: "No valid response from the API" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: error.message });
    }
  })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
