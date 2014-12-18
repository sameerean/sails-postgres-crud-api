/**
 * ContactController
 *
 * @description :: Server-side logic for managing contacts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     * `ContactController.create()`
     */
    create: function (req, res) {
        console.log("Inside create..............req.params = " + JSON.stringify(req.params.all()));

        var _newContact = {
            pid: req.param("contact").pid,
            firstName: req.param("contact").firstName,
            lastName: req.param("contact").lastName,
            dateOfBirth: new Date(req.param("contact").dateOfBirth),
            email: req.param("contact").email,
            phone: req.param("contact").phone,
            profileImageUrl: req.param("contact").profileImageUrl
        };
        return Contact.create(_newContact).then(function (_contact) {
            console.log("Contact created: " + JSON.stringify(_contact));
            return res.json({
                contact: _contact,
                status: "OK",
            });
        }).catch(function (err) {
            console.error("Error on ContactController.create");
            console.error(err);
            return res.json({
                status: "ERROR",
                statusDescription: err,
            });
        });

    },
    /**
     * `ContactController.update()`
     */
    update: function (req, res) {
        console.log("Inside update..............pid = " + req.param("pid"));
        console.log("Inside update..............firstName = " + req.param("contact").firstName);
        console.log("Inside update..............lastName = " + req.param("contact").lastName);
        console.log("Inside update..............dob = " + req.param("contact").dateOfBirth);

        return Contact.update({pid: req.param("pid")}, {
            firstName: req.param("contact").firstName,
            lastName: req.param("contact").lastName,
            dateOfBirth: new Date(req.param("contact").dateOfBirth),
            email: req.param("contact").email,
            phone: req.param("contact").phone,
            profileImageUrl: req.param("contact").profileImageUrl
        }).then(function (_contact) {
            return res.json({
                status: "OK",
                statusDescription: "Saved successfully!",
            });
            return res.redirect("contact");
        }).catch(function (err) {
            console.error("Error on ContactController.update");
            console.error(err);
            return res.json({
                status: "ERROR",
                statusDescription: err,
            });
//
//            return Contact.find().where({pid: req.param("pid")}).then(function (_contact) {
//                if (_contact && _contact.length > 0) {
//                    return res.view("contact/edit", {
//                        contact: _contact[0],
//                        status: 'Error',
//                        errorType: 'validation-error',
//                        statusDescription: err,
//                        title: 'Contact Details'
//                    });
//                } else {
//                    return res.view('500', {message: "Sorry, no Contact found with pid - " + req.param("pid")});
//                }
//            }).catch(function (err) {
//                return res.view('500', {message: "Sorry, no Contact found with pid - " + req.param("pid")});
//            });
        });

    },
    /**
     * `ContactController.delete()`
     */
    delete: function (req, res) {
        console.log("Inside delete..............");

        return Contact.find().where({pid: req.param("pid")}).then(function (_contact) {
            if (_contact && _contact.length > 0) {

                _contact[0].destroy().then(function (_contact) {
                    console.log("  successfully!!! _contact = " + _contact);
                    return res.json({
                        status: "OK",
                        statusDescription: "Deleted successfully!",
                    });
                }).catch(function (err) {
                    console.error(err);
                    return res.json({
                        status: "ERROR",
                        statusDescription: err,
                    });
                });
            } else {
                return res.json({
                    status: "ERROR",
                    statusDescription: "Sorry, no Contact found with pid - " + req.param("pid"),
                });
            }
        }).catch(function (err) {
            return res.json({
                status: "ERROR",
                statusDescription: err,
            });
        });


    },
    /**
     * `ContactController.find()`
     */
    find: function (req, res) {
        console.log("Inside find..............");
        var _pid = req.params.pid;
        console.log("Inside find.............. _pid = " + _pid);

        return Contact.find().where({pid: _pid}).then(function (_contact) {

            if (_contact && _contact.length > 0) {
                console.log("Inside find Found .... _contact = " + JSON.stringify(_contact));
//                _contact[0].id = null;
//                delete _contact[0].id;
                _contact[0].id = _contact[0].pid;
                return res.json({
                    status: 'OK',
                    contact: _contact[0]
                });
            } else {
                console.log("Inside find NOT Found .... ");
                return res.json({
                    status: 'ERROR',
                    statusDescription: 'No contact found with pid, ' + _pid,
                });
            }
        }).catch(function (err) {
            console.log("Inside find ERROR .... ");
                return res.json({
                    status: 'ERROR',
                    statusDescription: err,
                });
        });

    },
    /**
     * `ContactController.findall()`
     */
    findall: function (req, res) {
        console.log("Inside findall..............");

        return Contact.find().then(function (contacts) {
            console.log("ContactService.findAll -- contacts = " + contacts);
            for(var _idx = 0; _idx < contacts.length; _idx++) {
//                contacts[_idx].id= null;
//                delete contacts[_idx].id;
                contacts[_idx].id = contacts[_idx].pid;
                
            }
            return res.json({
                status: "OK",
                contact: contacts,
            });
        }).catch(function (err) {
            console.error("Error on ContactService.findAll");
            console.error(err);
            return res.json({
                status: "ERROR",
                statusDescription: err,
            });
        });
    },
    /**
     * `ContactController.findall()`
     */
    new : function (req, res) {
        console.log("Inside new..............");
        return res.view("contact/new", {
            contact: {
                pid: "",
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                email: "",
                phone: "",
                profileImageUrl: ""
            },
            status: 'OK',
            title: 'Add a new contact'
        });
    },
    showFind: function (req, res) {
        console.log("Inside showFind..............");
        res.view("contact/find", {
            title: "Search contacts"
        });
    },
    resetData: function (req, res) {
        ContactService.preloadData(function(_contacts) {
            return res.redirect("contact");
        });
    }

	
};

