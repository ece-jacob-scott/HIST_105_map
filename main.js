// @ts-nocheck
// Pulse animation https://stackoverflow.com/questions/30949325/pulsating-color-change-on-svg-image

class MapEvent {
  constructor(root, elementIDs, info) {
    this.root = root;
    this.elementIDs = elementIDs;
    this.elements = elementIDs.map((id) => $(`#${id}`, this.root));
    this.info = info;
    this._infobox = $("#display");
  }

  setup() {
    /**
     * Attaches all the mouse hover events to the map object
     */
    // this.elementIDs.forEach(id => {
    //   $(`svg`, this.root).append(`<use id="use-${id}" href="#${id}" />`);
    // });
    this.elements.forEach((element) => {
      element.css("stroke", "red").css("stroke-width", "2.5");
      element.mouseover(() => {
        this._infobox.text(this.info);
        this.elements.forEach((e) => {
          e.css("stroke", "green");
        });
      });
      element.mouseout(() => {
        this._infobox.text("Please hover over a highlighted area");
        this.elements.forEach((e) => {
          e.css("stroke", "red");
        });
      });
    });
  }

  detach() {
    /**
     * Function that turns off the hover event handlers when the elements are
     * no longer needed.
     */
    // this.elementIDs.forEach(id => {
    //   $(`#use-${id}`, this.root).remove();
    // });
    this.elements.forEach((element) => {
      element
        .css("stroke", "black")
        .css("stroke-width", "1")
        .removeClass("hue")
        .off();
    });
  }
}

function init(root) {
  const chapters = {};

  return new Promise((res, rej) =>
    $.getJSON("./events.json").done((data) => {
      for (let key in data) {
        let key_number = key.split(".")[0];
        console.log(key);
        chapters[`chapter_${key_number}`] = {
          events: data[key].map((e) => new MapEvent(root, e.elements, e.info)),
          display_name: key,
        };
      }
      res(chapters);
    })
  );
}

let currentChapter = "chapter_1";

function main(chapters) {
  const chapterNumber = $("#chapter-number");

  // add options to the select
  Object.keys(chapters).forEach((e) => {
    const n = e.split("_")[1];
    chapterNumber.append(`<option value="${n}"> 
      ${chapters[e].display_name} 
    </option>`);
  });

  // initial setup for first chapter
  chapters[currentChapter].events.forEach((e) => {
    e.setup();
  });
  $("#display").text("Please hover over a highlighted area");

  // Setup for switching chapters
  chapterNumber.on("input", () => {
    chapters[currentChapter].events.forEach((e) => {
      e.detach();
    });
    currentChapter = `chapter_${chapterNumber.val()}`;
    chapters[currentChapter].events.forEach((e) => {
      e.setup();
    });
  });
}

const mySVG = document.getElementById("alphasvg");
mySVG.addEventListener(
  "load",
  function () {
    const svgDoc = mySVG.contentDocument;
    const svgRoot = svgDoc.documentElement;
    // Get all the events from ./events.json
    init(svgRoot).then((chapters) => {
      main(chapters);
    });
  },
  false
);
