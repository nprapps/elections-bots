const { WebClient } = require('@slack/web-api');
require('dotenv').config()

//* ID of the channel you want to send the message to
//! Change this to the main elex channel when ready
const channelId = "C06TYKYGGM9";
const web = new WebClient(process.env.SLACK_TOKEN);

(async () => {
    try {
        await web.chat.postMessage({
            channel: channelId,
            //! TODO: replace with data from API
            text: "Hello from the script"
        });

        console.log("Message has been posted");
    }
    catch (error) {
        console.error(error);
    }
})();