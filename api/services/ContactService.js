var contactsRepo = require('../../init-data/contacts.js');
//import contactsList from '/init-data/contacts';

module.exports = {
    preloadData: function (_next) {
        console.log(">>>>>>>>>>>>>>> preloading data.......");

        Contact.findOrCreateEach(["pid"], contactsRepo.contactList).then(function (_contacts) {
            console.log("Contact created: " + JSON.stringify(_contacts));
            if (_next) {
                _next(_contacts);
            }
        }).catch(function (err) {
            console.error("Error on ContactService.preloadData");
            console.error(err);
            console.error(JSON.stringify(err));
        });

    }
};