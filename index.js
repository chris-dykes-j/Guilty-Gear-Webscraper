const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const app = express();
const PORT = 3000;

const character_links = [
	"https://dustloop.com/wiki/index.php?title=GGST/Ramlethal_Valentine",
	"https://dustloop.com/wiki/index.php?title=GGST/Sol_Badguy",
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
];

let character_id = 1;
character_links.forEach(link => {
	axios(link)
		.then(res => {
			const HTML = res.data;
			const $ = cheerio.load(HTML);
			const move_data = [];
			const character_name = $("#fpflexsection th span").text();

			$(".mw-headline big", HTML).each(function () {
				move_data.push({
					//name: character_name,
					move_name: $(this).text(), /*
					input: $(".input-badge").text(),
					damage: $(".attack-container "),
					guard: $,
					startup: $,
					active: $,
					recovery_frames: $,
					on_block: $,
					invulnerability: $ */
				})
			});
			console.log(move_data);

			let SQL_INSERT =
				`INSERT INTO characters VALUES (${character_id}, '${character_name});\n\n`;
			/*SQL_INSERT +=
				`INSERT INTO move_list VALUES (${move_id}, ${character_id}, ${move_name}, ${input},
					${damage},	${guard}, ${startup}, ${active}, ${recovery_frames}, ${on_block}, ${invulnerability};\n`;
			*/
			character_id++;

			fs.writeFile(`./sql/${character_name}.sql`, SQL_INSERT, error => {
				if (error) { console.log (error); return; }
			});
		})
		.catch(error => {
			console.error(error);
		})
});

app.listen(PORT, () => console.log(`Heaven or Hell. Port ${PORT}`));
