const cheerio = require("cheerio");
const axios = require("axios").default;
const fs = require('fs');
const fethHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

const extractPosts = selector => {
	
	const title = selector
	.find("td").find('b').text().trim();
	
	const description = selector 
	.find("td").find('center').text().replace(title,'').replace('(pièce jointe)','').trim();
	
	const authorAndDate = selector 
	.find("td").find('p').text();

	
	const attachment = selector 
	.find("td").find("a").prop('href');  
	
	const category = selector 
	.prop('class').replace('affichage','').trim();
	var author = authorAndDate.substring(
		0, 
		authorAndDate.lastIndexOf("(")
	).trim();
	var date = authorAndDate.substring(
		authorAndDate.lastIndexOf("(") + 1, 
		authorAndDate.lastIndexOf(")")
	).replace('affiché le','').trim();

	if(title == ''){
		
	}
	else{
	return {
	title,
	description,
	author,
	attachment,
	category,
	date
	};}
};

const scrap = async () => {
  const Url =
"http://depinfoskikda.com/etud_tableau_affichage.php";
  const html = await fethHtml(Url);

  const selector = cheerio.load(html);

  const searchResults = selector("body>section>center>div>div>div>div>table>tbody>tr");

  const posts = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      return extractPosts(elementSelector);
    })
    .get();
	
	return posts;
};
(async() => {
	console.log('getting data from depinfoskikda.com')
	const posts = await scrap() 

	var jsonData = {
		"posts" : posts,
	}
 
	// stringify JSON Object
	var jsonContent = JSON.stringify(jsonData);

	fs.writeFile("posts.json", jsonContent, 'utf8', function (err) {
		if (err) {
			console.log("An error occured while writing JSON Object to File.");
			return console.log(err);
		}
	 
		console.log("data has been saved.");
	});
  })()
