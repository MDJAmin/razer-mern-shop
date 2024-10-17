class ApiFeatures {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
  }
  filters() {
    const queryObj = { ...this.queryString };
    const fieldsItems = ["page", "sort", "limit", "fields"];
    for (const key in fieldsItems) {
      delete queryObj[key];
    }
    this.model = this.model.find(queryObj.filters);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.model = this.model.sort(sortBy);
    } else {
      this.model = this.model.sort("-createdAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fieldsBy = this.queryString.fields.split(",").join(" ");
      console.log(fieldsBy);
      this.model = this.model.select(fieldsBy);
    } else {
      this.model = this.model.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = this.queryString.page * 1 || 1;
    let limit = this.queryString.limit * 1 || 20;
    let skip = (page - 1) * limit;
    this.model = this.model.skip(skip).limit(limit);
    return this;
  }
  populate() {
    if (this.queryString.populate) {
      const populateBy = this.queryString.populate.split(",").join(" ");
      this.model = this.model.populate(populateBy);
    }
    return this;
  }
  secondPopulate(p) {
    if (p) {
      this.model = this.model.populate(p);
    }
    return this;
  }
}
export default ApiFeatures;
