class MapEvent {
  constructor(root, elementIDs, info) {
    this.root = root;
    this.elements = elementIDs.map(id => $(`#${id}`, this.root));
    this.info = info;
    this._infobox = $("#display");
  }

  setup() {
    /*
    Attaches all the mouse hover events to the map object
    */
    this.elements.forEach(element => {
      element.css("stroke", "red").css("stroke-width", "2");
      element.mouseover(() => {
        this._infobox.text(this.info);
        this.elements.forEach(e => {
          e.css("stroke", "green");
        });
      });
      element.mouseout(() => {
        this._infobox.text("Please hover over a highlighted area");
        this.elements.forEach(e => {
          e.css("stroke", "red");
        });
      });
    });
  }
}

function main(root) {
  const chapter_one = [
    new MapEvent(
      root,
      ["ES"],
      `[32,000-16,000 BC] 
       Cro-Magnon artists painted thousands of pictures of animals on the walls
       of the Pyrenees Mountains.`
    ),
    new MapEvent(
      root,
      ["FR", "DE", "IT"],
      `[768–814 AD] 
      Charlemagne unites most of Europe and promoted the spread of Chrisianity 
      throughout his pagan empire.`
    ),
    new MapEvent(
      root,
      ["EG"],
      `[3000 BC] 
      Start of the Bronze age which saw pictographic systems of writing. Also in
      Sumer there were early studies of astronomy, metrology, and mathematics.`
    )
  ];

  chapter_one.forEach(e => {
    e.setup();
  });
}

const mySVG = document.getElementById("alphasvg");
mySVG.addEventListener(
  "load",
  function() {
    const svgDoc = mySVG.contentDocument;
    const svgRoot = svgDoc.documentElement;
    main(svgRoot);
  },
  false
);
