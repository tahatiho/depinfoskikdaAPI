const cheerio = require("cheerio");
const axios = require("axios").default;

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
	.find("td").find('center').text().trim();
	
	const author = selector 
	.find("td").find('p').text().trim();
	
	const attachment = selector 
	.find("td").find("a").prop('href');  
	
	const category = selector 
	.prop('class');
	
	if(title == ''){
		
	}
	else{
	return {
	title,
	description,
	author,
	attachment,
	category,
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

module.exports = scrap;