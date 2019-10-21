"use strict";

const board = (function() {
  let ckEditor;
  let table;
  let isFlag;

  return {
    init: function() {
      board.setting();
      board.ready();
    },

    setting: function() {
      ClassicEditor.create(document.querySelector("#editor"), {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote"
        ]
      })
        .then(editor => {
          ckEditor = editor;
        })
        .catch(error => console.error(error));
    },

    /**
     * @method on_init
     * @description sly
     */
    ready: function() {
      table = $("#datatable").DataTable({
        ordering: false,
        searching: false,
        paging: false,
        bInfo: false,
        ajax: {
          url: "/boards",
          dataSrc: function(json) {
            return json.map(e => {
              e.push("");
              return e;
            });
          }
        },
        columns: [
          {
            title: "번호",
            width: "10%",
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
              $(nTd).html(sData);
            }
          },
          {
            title: "제목",
            width: "50%",
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
              const [index, title, , ,] = oData;

              $(nTd).html(
                "<a href='#' onclick='board.openPopup(" +
                  index +
                  ")'>" +
                  title +
                  "</a>"
              );
            }
          },
          {
            title: "작성자",
            width: "10%"
          },
          {
            title: "작성일",
            width: "10%",
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
              $(nTd).html(moment(new Date(sData)).format("YYYY-MM-DD"));
            }
          },
          {
            title: "수정",
            width: "7%",
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
              const [index, title, name, , content] = oData;

              $(nTd)
                .html("")
                .append("<button type='button'>수정</button>")
                .children()
                .on("click", () => board.editRow(index, title, name, content));
            }
          },
          {
            title: "삭제",
            width: "7%",
            fnCreatedCell: function(nTd, sData, oData, iRow, iCol) {
              const [index, title, , , content] = oData;
              $(nTd)
                .html("")
                .append("<button type='button'>삭제</button>")
                .children()
                .on("click", () => board.deleteRow(index));
            }
          }
        ]
      });
      $("#datatable").after(
        '<button type="button" id="create" onclick="board.createRow()">글쓰기</button>'
      );
      $("#my_popup").popup({
        escape: false,
        blur: false,
        transition: "all 0.5s"
      });
    },

    openPopup: function(index) {
      isFlag = "get";
      axios
        .get(`/boards/${index}`)
        .then(function(res) {
          const { title, name, content } = res.data;

          $("#index").val(index);
          $(".popup-editor-title").val(title);
          $(".popup-editor-name").val(name);
          ckEditor.setData(content);
          $("#my_popup").popup("show");
        })
        .catch(function(err) {
          alert(err);
        });
    },

    closePopup: function(index) {
      $("#my_popup").popup("hide");
    },

    createRow: function(index) {
      isFlag = "create";
      $(".popup-editor-title").val("");
      $(".popup-editor-name").val("");
      ckEditor.setData("");
      $("#my_popup").popup("show");
    },

    editRow: function(index, title, name, content) {
      isFlag = "edit";
      $("#index").val(index);
      $(".popup-editor-title").val(title);
      $(".popup-editor-name").val(name);
      ckEditor.setData(content);
      $("#my_popup").popup("show");
    },

    deleteRow: function(index) {
      if (confirm("정말 삭제하시겠습니까??") == true) {
        axios
          .delete(`/boards/${index}`)
          .then(function(res) {
            if (table) table.ajax.reload();
          })
          .catch(function(err) {
            alert(err);
          });
      } else {
        return;
      }
    },

    uploadRow: function() {
      const data = {
        index: $("#index").val(),
        title: $("#title").val(),
        name: $("#name").val(),
        type: $("#type").val(),
        content: ckEditor.getData()
      };

      if (!data.title) {
        alert("제목을 입력하세요");
        return;
      }

      if (isFlag === "get") {
        board.closePopup();
        return;
      }

      const request =
        isFlag === "edit"
          ? axios.put(`/boards/${data.index}`, data)
          : axios.post("/boards", data);

      request
        .then(function(res) {
          if (table) table.ajax.reload();
          board.closePopup();
        })
        .catch(function(err) {
          alert(err);
        });
    }
  };
})();

document.addEventListener("DOMContentLoaded", function() {
  board.init();
});
