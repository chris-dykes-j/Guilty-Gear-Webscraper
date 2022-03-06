const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const app = express();
const PORT = 3000;

// There is probably a better way, but this works.
const character_links = [
	"https://dustloop.com/wiki/index.php?title=GGST/Ramlethal_Valentine/Frame_Data", /*
	"https://dustloop.com/wiki/index.php?title=GGST/Sol_Badguy/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Jack-O/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Nagoriyuki/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Millia_Rage/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Chipp_Zanuff/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Ky_Kiske/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/May/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Zato-1/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/I-No/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Happy_Chaos/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Baiken/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Anji_Mito/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Leo_Whitefang/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Faust/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Axl_Low/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Potemkin/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Giovanna/Frame_Data",
	"https://dustloop.com/wiki/index.php?title=GGST/Goldlewis_Dickinson/Frame_Data" */
];

let character_id = 1;
character_links.forEach(link => {
	axios.get(link)
		.then(res => {
			const HTML = res.data;
			const $ = cheerio.load(HTML);
			const move_data = [];
			const character_name = link.replace("https://dustloop.com/wiki/index.php?title=GGST/", "")
				.replace("/Frame_Data", "");
			console.log(character_name);

			$(".cargoDynamicTable tr", HTML).each((_, element) => {
				let attack = $(element).text().replace(/\s+/g, ' ').split(" ");
				if (attack[1] != "input" && attack[1] != "name") { move_data.push(attack) };
			});
			console.log(move_data);
			/*
					name: character_name,
					move_name: $(this).text(),
					input: $(".input-badge").text() ,
					damage: $(".attack-container "),
					guard: $,
					startup: $,
					active: $,
					recovery_frames: $,
					on_block: $,
					invulnerability: $ 
			*/
			
			let SQL_INSERT =
				`INSERT INTO characters VALUES (${character_id}, '${character_name.replace("_", " ")}');\n\n`;
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
