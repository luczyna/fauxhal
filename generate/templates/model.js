module.exports = function(data) {
  {{goodness}}

  if (data.date === undefined) {
    this.date = new Date();
  } else {
    this.date = data.date;
  }

  if (data._id === undefined) {
    this._id = Math.floor(Math.random() * 100000);
  } else {
    this._id = data._id;
  }
};
