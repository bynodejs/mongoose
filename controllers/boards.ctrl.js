"use strict";

// require models
const boardModel = require("../models/boards.model");

module.exports = {
  get_board_list() {
    return new Promise((resolve, reject) => {
      boardModel
        .find()
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  get_board_detail(board_id) {
    return new Promise((resolve, reject) => {
      boardModel
        .findOne({ board_id })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  create_board(data) {
    return new Promise((resolve, reject) => {
      boardModel
        .create(data)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  update_board(board_id, data) {
    return new Promise((resolve, reject) => {
      boardModel
        .findOneAndUpdate({ board_id }, data)
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  delete_board(board_id) {
    return new Promise((resolve, reject) => {
      boardModel
        .findOneAndDelete({ board_id })
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
