const rp = require('request-promise');
const cheerio = require('cheerio');
const findUrl = require('../controllers/findUrl');

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

let fetchAllMobiles = async (req, res) => {
    const url = req.body.url

    const allUrl = await findUrl(url);

    const wikiDetail = [];
    for (let j = 0; j < allUrl.length; j++) {
        await rp(allUrl[j])
            .then(function (html) {
                const $ = cheerio.load(html);
                $('.col-7-12').each(function (i, elem) {
                    wikiDetail.push({
                        name: $(this).find($('._3wU53n')).text(),
                        specs: {
                            spec1: $(this).find($('.tVe95H')).slice(1, 2).text(),
                            spec2: $(this).find($('.tVe95H')).slice(2, 3).text(),
                            spec3: $(this).find($('.tVe95H')).slice(3, 4).text(),
                            spec4: $(this).find($('.tVe95H')).slice(4, 5).text(),
                            spec5: $(this).find($('.tVe95H')).slice(5, 6).text()
                        }
                    })
                })
            })
            .catch(function (err) {
                res.status(301).send(err);
            })
    }
    res.send(wikiDetail);
}

module.exports = {
    fetchMobiles,
    fetchShirts,
    fetchAllMobiles
};

