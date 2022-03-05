const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const character_links = [
	"https://dustloop.com/wiki/index.php?title=GGST/Ramlethal_Valentine",
	"https://dustloop.com/wiki/index.php?title=GGST/Sol_Badguy",
	/*
	"https://dustloop.com/wiki/index.php?title=GGST/Jack-O",
	"https://dustloop.com/wiki/index.php?title=GGST/Nagoriyuki",
	"https://dustloop.com/wiki/index.php?title=GGST/Millia_Rage",
	"https://dustloop.com/wiki/index.php?title=GGST/Chipp_Zanuff",
	"https://dustloop.com/wiki/index.php?title=GGST/Ky_Kiske",
	"https://dustloop.com/wiki/index.php?title=GGST/May",
	"https://dustloop.com/wiki/index.php?title=GGST/Zato-1",
	"https://dustloop.com/wiki/index.php?title=GGST/I-No",
	"https://dustloop.com/wiki/index.php?title=GGST/Happy_Chaos",
	"https://dustloop.com/wiki/index.php?title=GGST/Baiken",
	"https://dustloop.com/wiki/index.php?title=GGST/Anji_Mito",
	"https://dustloop.com/wiki/index.php?title=GGST/Leo_Whitefang",
	"https://dustloop.com/wiki/index.php?title=GGST/Faust",
	"https://dustloop.com/wiki/index.php?title=GGST/Axl_Low",
	"https://dustloop.com/wiki/index.php?title=GGST/Potemkin",
	"https://dustloop.com/wiki/index.php?title=GGST/Giovanna",
	"https://dustloop.com/wiki/index.php?title=GGST/Goldlewis_Dickinson"
	*/
];
const character_data = [];

character_links.forEach(link => {
	axios(link)
		.then(res => {
			const HTML = res.data;
			const $ = cheerio.load(HTML);
			const move_data = [];
			$(".mw-headline big", HTML).each(function () {
				move_data.push($(this).text())
			});
			character_data.push(move_data);
			console.log(character_data); // Data will output here with no problems, but...
		})
		.catch(error => {
			console.error(error);
		})
});
console.log(character_data); // ... data appears empty when called here.

app.listen(PORT, () => console.log(`Everything going well; Port ${PORT}`));
