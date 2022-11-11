const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Important constants
const characterLinks = require("./character-links.json");
const outputScript = "./output-sql/strive-move-data.sql";
const characterTable = "strive_characters";
const moveTable = "strive_move_list";
const gatlingTable = "strive_gatling_table"; // implement later...

// Most important part:
console.log("Heaven or Hell");

// ID variables for SQL.
let characterId = 1;
let moveId = 1;

characterLinks.strive.forEach(link => { 
	axios.get(link)
		.then(res => {
			const HTML = res.data;
			const $ = cheerio.load(HTML);

			// Getting arrays ready.
			const characterInfo = [];
			const temporaryCharacter = [];
			const attackData = [];
			const temporaryAttack = [];
			
			// Parse the url to get the name.
			const characterName = link
				.split('/')
				.at(5)
				.replace("_", " ");

			// Taking table rows, extracting cells; regex to deal with whitespace from HTML.
			$(".cargoDynamicTable tr", HTML).each((_, element) => {
				const attack = $(element)
					.text()
					.replace(/ +/g, "_") // Prevents some data points from separating into different columns.
					
					// To deal with empty columns. Ugly but works for now. Need to figure out an elegent method to deal with this. Having issues with loops.
					.replace(/\t{24}/g," undefined ".repeat(5))
					.replace(/\t{20}/g," undefined ".repeat(4)) 
					.replace(/\t{16}/g," undefined ".repeat(3)) 
					.replace(/\t{12}/g," undefined ".repeat(2)) 
					.replace(/\t{8}/g," undefined ")
					
					.replace(/\s+/g, " ") // To deal with excess whitespace. Helps with first column.
					.replace("'", "''") // For SQL to insert '. This was Zato's fault.
					.substring(1); // Avoids an empty column.
				
				if (!attack.startsWith("Input") && !attack.startsWith("Name") // Ignore the table headers.
					&& !attack.startsWith("Dash_Cancel")) // Also ignore dash cancel.
					temporaryAttack.push(attack);
			});
			
			temporaryAttack.forEach(entry => {
				const attack = entry.split(" ");
				attackData.push(attack);
			});

			let insertQuery = `INSERT INTO ${characterTable} VALUES (${characterId}, '${characterName}');\n\n`;

			// Formats all attack data for SQL file.
			attackData.forEach(tableRow => {
				const attack = formatData(tableRow); // Formats the data for output.
				insertQuery +=
					`INSERT INTO ${moveTable} VALUES (${moveId}, ${characterId}, '${attack.input}', '${attack.moveName}', '${attack.damage}', ` +
					`'${attack.guard}', '${attack.startup}', '${attack.active}', '${attack.recoveryFrames}', '${attack.onBlock}', ` +
					`'${attack.onHit}', '${attack.level}', '${attack.counterType}', '${attack.invulnerability}', '${attack.baseComboScaling}', ` +
					`'${attack.riscGain}', '${attack.riscLoss}');\n\n`;
				moveId++;
			});
			characterId++;

			fs.appendFile(outputScript, insertQuery, error => {
				if (error)
					console.log(error);
				else 
					console.log(characterName);
			});
		})
		.catch(error => {
			console.error(error);
		})
});

// console.log("Strive web scrape complete.")

const formatData = (tableRow) => {
	let i = 0;
  // Checking if second row contains an Attack name.
	if (!tableRow[1].match(/^\d/)) i++;
	
	let attack = {
		input: tableRow[0], // Zero in all instances
		moveName: tableRow[i++],
		damage: tableRow[i++],
		guard: tableRow[i++],
		startup: tableRow[i++],
		active: tableRow[i++],
		recoveryFrames: tableRow[i++],
		onBlock: tableRow[i++],
		onHit: tableRow[i++],
		level: tableRow[i++],
		counterType: tableRow[i++],
		invulnerability: tableRow[i++],
		baseComboScaling: tableRow[i++],
		riscGain: tableRow[i++],
		riscLoss: tableRow[i]
	};
	
	if (tableRow[0].includes("Throw")) // For fun.
		attack.onBlock = "Beats block";
	
	return attack;
};

/* WIP for extra character data
$(".cargoTable tr", HTML).each((_, element) => {
  const characterData = $(element)
    .text()
    .replace(/ +/g, "_")
    .replace(/\t{16}/g," undefined ".repeat(3))
    .replace(/\t{12}/g," undefined ".repeat(2))
    .replace(/\t{8}/g," undefined ")
    .replace(/\s+/g, " ")
    .replace("'", "''");
  
  if (!characterData.startsWith("38"))
    temporaryCharacter.push(characterData);
  
  temporaryCharacter.forEach(entry => {
    const info = entry.split(" ")
    characterInfo.push(info)
  });
});
characterInfo.forEach(e => console.log(e.toString())) */
