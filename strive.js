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

characterLinks.test.forEach(link => { 
	axios.get(link)
		.then(res => {
			const HTML = res.data;
			const $ = cheerio.load(HTML);
			
			// Parse the url to get the name.
			const characterName = link
				.split('/')
				.at(5)
				.replace("_", " ");
			
			// Getting arrays ready.
			const temporary = [];
			const characterData = [];
			const attackData = [];

			// Taking table rows, extracting cells; regex to deal with whitespace from HTML.
			$(".cargoDynamicTable tr", HTML).each((_, element) => {
				let attack = $(element).text();
				
				attack.replace(/\t{8}/," undefined ") // For empty columns.
					.replace(/ +/g, "_") // Prevents some data points from separating into different columns.
					.replace(/\s+/g, " ") // To deal with excess whitespace.
					.replace("'", "''") // For SQL to insert '. This was Zato's fault.
					.substring(1); // Avoids an empty column.
				
				if (!attack.startsWith("Input") && !attack.startsWith("Name") // Ignore the table headers.
					&& !attack.startsWith("Dash_Cancel")) // Also ignore dash cancel.
					temporary.push(attack);
			});
			
			temporary.forEach(entry => {
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

			fs.writeFile(outputScript, insertQuery, error => {
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
	// tableRow.forEach(entry => entry.replace("_", " ")); // experiment.
	
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