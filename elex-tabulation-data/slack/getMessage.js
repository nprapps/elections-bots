const { sendMessageToSlack } = require("./sendMessageToSlack");

function outputItem(item, header = false) {
  const obj = {
    type: "rich_text_section",
    elements: [
      {
        type: "text",
        text: item,
        style: {
          bold: header,
          italic: header,
        },
      },
    ],
  };

  return obj;
}

function getMessage(obj, title, type = "default") {
  let blocks = [
    {
      type: "rich_text",
      elements: [],
    },
  ];

  let bulletItem = {
    type: "rich_text_list",
    style: "bullet",
    elements: [],
  };

  let header = outputItem(`${title}:`, true);
  blocks[0].elements.push(header);

  if (type === "compact") {
    Object.keys(obj).map((office) => {
      let listItem = outputItem(`${office}: ${obj[office].join(", ")}`);
      bulletItem.elements.push(listItem);
    });
    blocks[0].elements.push(bulletItem);
  } else {
    Object.keys(obj).map((office) => {
      obj[office].map((o) => {
        let listItem = outputItem(`${office}: ${o}`);
        bulletItem.elements.push(listItem);
      });
    });

    blocks[0].elements.push(bulletItem);
  }

  sendMessageToSlack(blocks);
}

module.exports = {
  getMessage,
};
