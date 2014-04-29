//Export the site description.
module.exports = {
    name: "home",
    roles: ['TEST'],
    headers: [{
        name: "accueil",
        url: "#route1",
        roles: ['TEST', 'PAPA'],
        pages: [{
            name: 'pageSansMenu',
            url: "#pageSansMenu",
            roles: ['PAPA', 'TEST']
        }, {
            name: 'pageSansMenu11',
            url: "#pageSansMenu11",
            roles: ['PAPA', 'TEST']
        }]
    }, {
        name: "administration",
        url: "#administration/audit/diagnostic",
        roles: ['TEST'],
        headers: [{
            name: "audit",
            url: "#administration/audit/diagnostic",
            roles: ['ADMINISTRATION', 'TEST'],
            pages: [{
                name: 'pageSansMenu777',
                url: "#ppppageSansMenu777",
                roles: ['PAPA', 'TEST']
            }, {
                name: 'pageSansMenu121212',
                url: "#pppppppageSansMenu102121",
                roles: ['PAPA', 'TEST']
            }]
        }, {
            name: "other",
            url: "#administration/other/other",
            roles: ['ADMINISTRATION', 'TEST']
        }]
    }]
};