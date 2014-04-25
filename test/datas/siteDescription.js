//Export the site description.
module.exports = {
    header: [{
        name: "accueil",
        url: "#route1",
        roles: ['TEST', 'PAPA'],
        pages: [{
            name: 'pageSansMenu',
            url: "#pageSansMenu",
            roles: ['PAPA', 'TEST']
        }, {
            name: 'pageSansMenu',
            url: "#pageSansMenu",
            roles: ['PAPA', 'TEST']
        }]
    }, {
        name: "administration",
        url: "#administration/audit/diagnostic",
        roles: ['TEST'],
        header: [{
            name: "audit",
            url: "#administration/audit/diagnostic",
            roles: ['ADMINISTRATION', 'TEST']
        }, {
            name: "other",
            url: "#administration/other/other",
            roles: ['ADMINISTRATION', 'TEST']
        }]
    }]
};