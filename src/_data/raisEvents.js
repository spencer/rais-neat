// import the client we just created
const client = require('../../utils').contentfulClient;
const { DateTime } = require("luxon");

module.exports = async () => {
	// create a request for all entries that match our post type. 
	// we can use the `order` property to sort them reverse-chronologically by their event date.
  const raisEvents = await client.getEntries({
    content_type: 'raisEvent',
    order: 'fields.eventDate',
  });
  
  // remap data to add year dynamically from eventDate via Luxon.
  let data = raisEvents.items.map(item => {
    item.fields.eventYear = DateTime.fromISO(item.fields.eventDate).toFormat("yyyy");
    return item;
  });

  return data;
};