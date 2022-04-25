/**
 * This class contains some of the API Features needed by many pages within our application
 */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /**
   * This is the filter() method. This method excludes the following fields in the URL:
   * ```javascript
   *  ['page', 'sort', 'limit', 'fields']
   * ```
   * The method uses a regex expression to match the field with the value passed.
   */

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  /**
   * The sort() method, is used to pass values to sort our documents/data.
   * By default, it sorts by the last updatedAt or (-updatedAt).
   */

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-updatedAt");
    }

    return this;
  }

  /**
   * The limitFields() method, limits the number of documents we want to return from a query.
   */

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  /**
   * The paginate() method, paginates values returned from the database, to ensure a user gets 100 documents per request.
   */

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
