# Guilty Gear Web Scraper

Currently undergoing an update. Unfinished.

Update goals:
- Be up to date with Dustloop pages
- Include more data to characters
- Include Xrd Rev 2, and Accent Core Plus R
- Output three scripts for each game instead of scripts for each character (less of a pain)
- Provide sql scripts to initialize tables
- Provide the output scripts (so Dustloop doesn't have to have excess traffic)

Web-scraper to pull Guilty Gear frame data from the Dustloop Website (https://dustloop.com/wiki/index.php) for a PostgreSQL database. Initially based off of Ania Kubow's nodejs webscraper (https://github.com/kubowania/nodejs-webscraper), I have made significant alterations specific to retrieving frame data.

The web scraper data is being used for a Web API I am working on (https://github.com/chris-dykes-j/Guilty-Gear-API).
