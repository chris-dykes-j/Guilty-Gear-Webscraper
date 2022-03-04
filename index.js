const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;

axios
	.get("https://dustloop.com/wiki/index.php?title=GGST/Ramlethal_Valentine")
	.then(res => {
		const HTML = res.data;
		const $ = cheerio.load(HTML);
		const element = $(".attack-container").text();
		console.log(element);
	})
	.catch(error => {
		console.error(error);
	});

app.listen(PORT, () => console.log(`Everything going well; Port ${PORT}`));

/*
app.get("/", (req, res) => {

});
*/