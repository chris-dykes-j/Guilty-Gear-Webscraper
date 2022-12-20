# Guilty Gear Web Scraper

December 20th, 2022

Update goals:
- [ ] Update to recent patch
- [ ] Add Sin Kiske to output
- [ ] Fix a weird bug with Jack-O's output sql

---

Web-scraper to pull Guilty Gear frame data from the Dustloop Website for a PostgreSQL database (https://dustloop.com/wiki/index.php).

The web scraper data is being used for a Web API I made: https://github.com/chris-dykes-j/Guilty-Gear-API

The project:
- Includes character frame data for Strive, Xrd Rev 2, and Accent Core Plus R
- Has three separate scripts for each of the games
- Provides sql scripts to initialize tables, and output scripts (to reduce excess traffic to Dustloop)

Initially based off of Ania Kubow's nodejs webscraper (https://github.com/kubowania/nodejs-webscraper).
