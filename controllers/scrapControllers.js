const rp = require('request-promise');
const cheerio = require('cheerio');

let fetchMobiles = async (req, res, next) => {
    const url = req.body.url;
    rp(url)
        .then(function (html) {
            const $ = cheerio.load(html);
            const wikiName = [];
            $('._2kSfQ4').each(function (i, elem) {
                wikiName.push({
                    name: $(this).find($('.iUmrbN')).text(),
                    price: $(this).find($('._3o3r66')).text(),
                    specs: $(this).find($('.BXlZdc')).text()
                });
            })
            res.send(wikiName);
        })
        .catch(function (err) {
            res.status(301).send(err);
        })
};

let fetchShirts = async (req, res) => {
    const url = req.body.url;
    rp(url)
        .then(function (html) {
            const $ = cheerio.load(html);
            const wikiName = [];
            $('.product-desc-rating').each(function (i, elem) {
                wikiName.push({
                    name: $(this).find($('.product-title')).text(),
                    maxPrice: $(this).find($('.product-desc-price')).text(),
                    discountPrice: $(this).find($('.product-price')).text()
                });
            })
            res.send(wikiName);
        })
        .catch(function (err) {
            res.status(301).send(err);
        })
}

module.exports = {
    fetchMobiles,
    fetchShirts
};

