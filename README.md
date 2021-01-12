## Description
I made a Web Scraping API that scrap posts from http://depinfoskikda.com/etud_tableau_affichage.php and save them to json, then you can make a get rquest to localhost:5000/posts.js to get them.

the scraper wont run unless you call it
```console
$ node scraper.js
```
then it create file called posts.json.

then run the server :
```console
$ node index.js
```
## Getting Started

clone the repostry:

```console
$ git clone https://github.com/tahatiho/depinfoskikdaAPI.git
```

Install modules using npm:

```console
$ npm install 
```
## Dcoumentation I Used

hapiserver Getting Started :

[hapi.dev](https://hapi.dev/tutorials/gettingstarted/?lang=en_US)

coding train videos playlist (using express) :

[youtube.com](https://www.youtube.com/watch?v=P-Upi9TMrBk&list=PLRqwX-V7Uu6Yyn-fBtGHfN0_xCtBwUkBp)

dev tutorial for creating Web Scraping api with NodeJs and Cheerio :

[dev.to](https://dev.to/diass_le/tutorial-web-scraping-with-nodejs-and-cheerio-2jbh)

## Deploying to heroku

i used their Documentation :
[heroku.com](https://devcenter.heroku.com/articles/deploying-nodejs)

btw you need to change the host link from 'localhost' to '0.0.0.0' to make the api work in heroku