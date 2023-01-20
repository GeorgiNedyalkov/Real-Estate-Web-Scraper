const parseInput = require("./utils");
const axios = require("axios");
const { load } = require("cheerio");

async function getApartments(url) {
  const { data } = await axios.get(url);
  const $ = load(data);

  const topListings = [];
  const vipListings = [];

  const apartmentsContainer = $("#content_container");

  apartmentsContainer.find(".listtop-item").each((i, element) => {
    const $element = $(element);
    let topListing = {};
    let title = $element.find(".listtop-item-title").text();
    let parameters = $element.find(".ads-params-single").text();

    parameters = parseInput(parameters);

    topListing = {
      title,
      ...parameters,
    };

    topListings.push(topListing);
  });

  apartmentsContainer.find(".listvip-params").each((i, listing) => {
    const $listing = $(listing);
    let vipListing = {};

    let title = $listing
      .find(".listvip-item-header")
      .text()
      .replace(/\t/gm, "")
      .replace(/\n/gm, "");

    let parameters = $listing
      .find(".listvip-item-content")
      .text()
      .replace(/\n/g, "")
      .replace(/\t/g, "");

    const parsedParameters = parseInput(parameters);

    vipListing = {
      title,
      ...parsedParameters,
    };

    vipListings.push(vipListing);
  });

  return [...topListings, ...vipListings];
}

// get the first page
async function getFirstPage(url) {
  getApartments(url).then((data) => {
    return data;
  });
}

const oneBedUrl = `https://www.alo.bg/obiavi/imoti-prodajbi/apartamenti-stai/?region_id=2&location_ids=300&section_ids=23&p[413]=1574`;
const twoBedUrl = `https://www.alo.bg/obiavi/imoti-prodajbi/apartamenti-stai/?region_id=2&location_ids=300&section_ids=23&p[413]=1575`;
const threeBedUrl = `https://www.alo.bg/obiavi/imoti-prodajbi/apartamenti-stai/?region_id=2&location_ids=300&section_ids=23&p[413]=1576`;

getFirstPage(oneBedUrl);

module.exports = getApartments;
