const rp = require('request-promise');
const cheerio = require('cheerio');

const findUrl = async (url) => {
    let wikiName = [];
    return rp(url)
        .then(function (html) {
            const $ = cheerio.load(html);
            $('._2kSfQ4').each(function (i, elem) {
                wikiName.push('https://www.flipkart.com' + $(this).find('a').attr('href'));
            });
            return wikiName;
        })
        .catch(function (err) {
            return err;
        })

}

module.exports = findUrl;