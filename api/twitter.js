const Twit = require('twit');

// Your Twitter API credentials


//bearer token AAAAAAAAAAAAAAAAAAAAAC5xpQEAAAAAoMoIvaM6eUfJCxqMFNKET9Y0Nn4%3D2tQrj0uOGBMNdfx9rx9vJt1TOLApmBeQk2cSDL9bgbPHdAeilY
//api key Flcys0YIYp82yOhHCd5Rs0FFE
//api key secret 5tS1iSKHrkndAFs4POFTENY6B1RTnjfnnKe3wqxCt5BX5gOsd2
//access token 1050420592195846144-pZuuTUhQSlKJAWAj4GhsPbPGN4l07H
//access token secret W6zml2HOZTyWAn1OAlQaG74HHWow8wiQEQbxDCyRKRXyY
const config = {
  consumer_key: 'Flcys0YIYp82yOhHCd5Rs0FFE',
  consumer_secret: '5tS1iSKHrkndAFs4POFTENY6B1RTnjfnnKe3wqxCt5BX5gOsd2',
  access_token: '1050420592195846144-pZuuTUhQSlKJAWAj4GhsPbPGN4l07H',
  access_token_secret: 'W6zml2HOZTyWAn1OAlQaG74HHWow8wiQEQbxDCyRKRXyY',
};
async function getMentions(twtHandle){
const T = new Twit(config);

// Screen name of your Twitter account
const screenName = twtHandle;

// Calculate the time 24 hours ago
const twentyFourHoursAgo = new Date();
twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

// Get mentions within the last 24 hours
T.get('statuses/mentions_timeline', { screen_name: screenName }, (err, data, response) => {
  if (!err) {
    const filteredMentions = data.filter(mention => new Date(mention.created_at) > twentyFourHoursAgo);
    const mentionsCount = filteredMentions.length;
    console.log(`You've been mentioned ${mentionsCount} times in the last 24 hours.`);
    return mentionsCount
  } else {
    console.error('Error:', err);
  }
});
}
module.exports = { getMentions }
// T.get('tweets/search/recent', { query: `to:${screenName} since:${twentyFourHoursAgo.toISOString()}` }, (err, data, response) => {
//     if (!err) {
//       const mentionsCount = data.meta.result_count;
//       console.log(`You've been mentioned ${mentionsCount} times in the last 24 hours.`);
//       return mentionsCount
//     } else {
//       console.error('Error:', err);
//     }
//   });