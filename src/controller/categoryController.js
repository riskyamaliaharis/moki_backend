const { showCategory } = require("../model/categoryModel");

const helper = require("../helper/response");
const qs = require("querystring");

module.exports = {
  showCategoryTable: async (req, res) => {
    try {
      const showCategoryTable = await showCategory();
      res.status(200).send(showCategoryTable);
    } catch {
      res.status(400).send("Failed to show");
    }
  },
};
