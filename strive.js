const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// Important constants
const characterLinks = require("./character-links.json");
const outputScript = "./output-sql/strive-move-data.sql";
const characterTable = "strive_characters";
const moveTable = "strive_move_list";
const gatlingTable = "strive_gatling_table"; 

// Most important part:
console.log("Heaven or Hell");

// SQL variables
let characterId = 1;
let moveId = 1;
let gatlingId = 1;

characterLinks.strive.forEach(link => { 
	axios.get(link)
		.then(res => {
			const HTML = res.data;
			const $ = cheerio.load(HTML);

			// Character Data: 
			let characterInfo = [];
			let tempCharacter = [];
			
			$(".cargoTable tr", HTML).each((_, element) => {
				const characterData = $(element)
					.text()
					.replace(/ +/g, "_")
					.substring(1);
				
				if (!characterData.startsWith("ame", 0) && !characterData.startsWith("ump", 0))
					tempCharacter.push(characterData);

				tempCharacter.forEach(entry => characterInfo.push(entry.split(" ")));
			});
			
			// Move Data:
			let attackData = [];
			let tempAttack = [];
			
			// Taking table rows, extracting cells; regex to deal with whitespace from HTML.
			$(".cargoDynamicTable tr", HTML).each((_, element) => {
				const attack = $(element)
					.text()
					.replace(/ +/g, "_") // Prevents some data points from separating into different columns.
					
					// To deal with empty columns. Ugly but works for now. Need to figure out an elegent method to deal with this. Having issues with loops.
					.replace(/\t{24}/g," - ".repeat(5))
					.replace(/\t{20}/g," - ".repeat(4)) 
					.replace(/\t{16}/g," - ".repeat(3)) 
					.replace(/\t{12}/g," - ".repeat(2)) 
					.replace(/\t{8}/g," - ")
					
					.replace(/\s+/g, " ") // To deal with excess whitespace. Helps with first column.
					.replace(/'/g, "''") // For SQL to insert '. Thanks I-no.
					.substring(1); // Avoids an empty column.
				
				if (!attack.startsWith("Input", 0) && !attack.startsWith("Name", 0) // Ignore the table headers.
					&& !attack.startsWith("Dash_Cancel")) // Also ignore dash cancel.
					tempAttack.push(attack);
			});
			
			tempAttack.forEach(entry => {
				const attack = entry.split(" ");
				attackData.push(attack);
			});

			// Gatling Data:
			let tempGatling = [];
			let gatlingData = [];
			
			$(".wikitable tr", HTML).each((_, element) => {
				const gatling = $(element)
					.text()
					.replace(/ /g, "_")
					.replace(/\n/g, " ");
				tempGatling.push(gatling);
			});
			
			// Maybe could be better.
			tempGatling.forEach(entry => {
				const element = entry.split("\t\t\t\t");
				element.forEach(gatling => {
					if (/Guard:/g.test(gatling))
						gatlingData.push(gatling.split(" "));
				})
			});
			
			// Query preparation:
			const character = formatCharacterData(characterInfo[0][0]);
			let insertQuery =
				'\n' + `INSERT INTO ${characterTable} VALUES (${characterId}, '${character.name}', ` +
				`'${character.defense}', '${character.guts}', '${character.prejump}', '${character.weight}', '${character.backDash}', ` +
				`'${character.forwardDash}', '${character.umo}', '${character.riscMult}', '${character.tensionGain}');\n\n`;
			
			attackData.forEach(tableRow => {
				const attack = formatAttackData(tableRow); // Formats the data for output.
				insertQuery +=
					`INSERT INTO ${moveTable} VALUES (${moveId}, ${characterId}, '${attack.input}', '${attack.moveName}', '${attack.damage}', ` +
					`'${attack.guard}', '${attack.startup}', '${attack.active}', '${attack.recoveryFrames}', '${attack.onBlock}', ` +
					`'${attack.onHit}', '${attack.level}', '${attack.counterType}', '${attack.invulnerability}', '${attack.baseComboScaling}', ` +
					`'${attack.riscGain}', '${attack.riscLoss}');\n`;
				moveId++;
			});
			
			gatlingData.forEach(tableRow => {
				const gatling = formatGatlingData(tableRow);
				insertQuery +=
					`INSERT INTO ${gatlingTable} VALUES (${gatlingId}, ${characterId}, '${gatling.name}', '${gatling.p}', '${gatling.k}', ` +
					`'${gatling.s}', '${gatling.h}', '${gatling.d}', '${gatling.cancel}');\n`;
				gatlingId++;
			});
			
			characterId++;

			fs.existsSync()
			
			fs.appendFile(outputScript, insertQuery, error => {
				if (error)
					console.log(error);
				else 
					console.log(character.name);
			});
		})
		.catch(error => {
			console.error(error);
		})
});

const formatAttackData = (data) => {
	const tableRow = data.map(item => item.replace(/_/g, " "));
	
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
		attack.onBlock = "wins";
	
	return attack;
};

const formatCharacterData = (data) => {
	const tableRow = data
		.split(/\n/g)
		.map(item => item.replace(/_/g, " ")
	);
	
	let i = 0;
	return {
		name: tableRow[i++],
		defense: tableRow[i++],
		guts: tableRow[i++],
		prejump: tableRow[i++],
		weight: tableRow[i++],
		backDash: tableRow[i++],
		forwardDash: tableRow[i++],
		umo: tableRow[i++],
		riscMult: tableRow[i++],
		tensionGain: tableRow[i]
	};
};

const formatGatlingData = (data) => {
	const tableRow = data.map(item => item.replace(/_/g, " "));
	let i = 3;
	return {
		name: tableRow[1].replace(/G.*/, ""),
		p: tableRow[i++],
		k: tableRow[i++],
		s: tableRow[i++],
		h: tableRow[i++],
		d: tableRow[i++],
		cancel: tableRow[i]
	};
};