const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// All the characters!
const characterLinks = require("character-links.json");

console.log("Heaven or Hell.");

// ID variables for SQL.
let characterId = 1;
let moveId = 1;

characterLinks.links.forEach(link => {
	axios.get(link)
		.then(res => {
			const HTML = res.data;
			const $ = cheerio.load(HTML);
			const characterName = link.replace("https://dustloop.com/wiki/index.php?title=GGST/", "")
				.replace("/Frame_Data", "");

			// Taking table rows, extracting cells; regex to deal with whitespace from HTML.
			const temporary = [];
			const moveData = [];
			$(".cargoDynamicTable tr", HTML).each((_, element) => {
				const attack = $(element).text()
					.replace(/ +/g, "_")
					.replace(/\s+/g, " ")
					.replace("'", "''")
					.substring(1);
				if (!attack.startsWith("input") && !attack.startsWith("name")) { temporary.push(attack) }
			});
			temporary.forEach(entry => {
				const attack = entry.split(" ");
				moveData.push(attack);
			});

			let insertQuery = `INSERT INTO characters VALUES (${characterId}, `
				+ `'${characterName.replace("_", " ")}');\n\n`;

			// Formats all attack data for SQL file.
			moveData.forEach(attack => {
				m = format_data(attack);
				insertQuery += `INSERT INTO move_list VALUES (${moveId}, ${characterId}, '${m.input}', `
					+ `'${m.moveName}', '${m.damage}',	'${m.guard}', '${m.startup}', '${m.active}', '${m.recovery_frames}', '${m.on_block}');\n`;
				moveId++;
			});
			characterId++;

			fs.writeFile(`./sql/${characterName.toLowerCase()}.sql`, insertQuery, error => {
				if (error) { console.log(error); }
				else { console.log(characterName.replace("_", " ")); }
			});
		})
		.catch(error => {
			console.error(error);
		})
});

// Function for formatting attack data.
// It could be prettier, but it's ok.
function format_data(attack) {
	let input = attack[0];
	let move_name, damage, guard, startup, active, recovery_frames, on_block;
	if (attack[0].includes("Throw")) {
		move_name = attack[0];
		damage = attack[1];
		guard = attack[2];
		startup = attack[3];
		active = attack[4];
		recovery_frames = attack[5];
		on_block = "NULL";
	} else {
		if (attack[1].match(/^\d/)) {
			move_name = attack[0];
			damage = attack[1];
			guard = attack[2];
			startup = attack[3];
			active = attack[4];
			recovery_frames = attack[5];
			on_block = attack[6]
		} else {
			move_name = attack[1];
			damage = attack[2];
			guard = attack[3];
			startup = attack[4];
			active = attack[5];
			recovery_frames = attack[6];
			on_block = attack[7]
		}
	}
	const attackObject = {
		input, moveName: move_name, damage, guard, startup, active, recovery_frames, on_block
	};
	return attackObject;
}
