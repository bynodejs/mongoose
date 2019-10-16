"use strict";

// require modules
const router = require("express").Router();

// require controllers
const board = require("../controllers/boards.ctrl");

/**
 * @url BASE_URL/boards/
 * @type GET
 * @description 게시판 리스트
 */
router.get("/", (req, res, next) => {
  board
    .get_board_list()
    .then(result => {
      let resultArray = [];

      result.forEach(val => {
        resultArray.push([
          val.board_id,
          val.title,
          val.name,
          val.date,
          val.content
        ]);
      });

      res.status(200).json(resultArray);
    })
    .catch(error => {
      next(error);
    });
});

/**
 * @url BASE_URL/boards/{board_id}/
 * @type GET
 * @description 게시판 상세
 */
router.get("/:board_id(\\d+)", (req, res, next) => {
  const { board_id } = req.params;

  board
    .get_board_detail(board_id)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      next(error);
    });
});

/**
 * @url BASE_URL/boards/
 * @type POST
 * @description 게시판 생성
 */
router.post("/", (req, res, next) => {
  const data = req.body;

  board
    .create_board(data)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      next(error);
    });
});

/**
 * @url BASE_URL/boards/{board_id}/
 * @type PUT
 * @description 게시판 수정
 */
router.put("/:board_id(\\d+)", (req, res, next) => {
  const { board_id } = req.params,
    data = req.body;

  board
    .update_board(board_id, data)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      next(error);
    });
});

/**
 * @url BASE_URL/boards/{board_id}/
 * @type DELETE
 * @description 게시판 삭제
 */
router.delete("/:board_id(\\d+)", (req, res, next) => {
  const { board_id } = req.params;

  board
    .delete_board(board_id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
