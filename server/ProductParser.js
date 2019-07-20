
const regexProductName = /<span id="productTitle" class="a-size-large">\s*(.+?(?=\s*<))/g;
const regexProductDimensions = /Product Dimensions<\/td><td class="value">(\d+\.\d+ x \d+\.\d+ x \d+\.\d+ \w+)<\/td><\/tr>/g;
const regexProductRank = /Amazon Best Sellers Rank<\/td><td class="value">\s*#(\d+) in (.*?(?=\s\())\s\(<a/g;

exports.parse = siteString => {
    const name = regexProductName.exec(siteString);
    const dimensions = regexProductDimensions.exec(siteString);
    const rank = regexProductRank.exec(siteString);

    return {'name': name ? name[1] : "",
            'category': rank ? rank[2] : "",
            'rank':  rank ? rank[1] : "",
            'dimensions': dimensions ? dimensions[1] : ""};
};