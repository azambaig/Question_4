const rp = require('request-promise');
const cheerio = require('cheerio');

let fetchData = async (req, res, next) => {
    const url = req.body.url;
    rp(url)
        .then(function (html) {
            const $ = cheerio.load(html);
            const wikiName = [];
            $('._2kSfQ4').each(function (i, elem) {
                wikiName[i] = {
                    name: $(this).find($('.iUmrbN')).text(),
                    price: $(this).find($('._3o3r66')).text(),
                    specs: $(this).find($('.BXlZdc')).text()
                };
            })
            res.send(wikiName);
        })
        .catch(function (err) {
            res.status(301).send(err);
        })
};

module.exports = {
    fetchData
};

