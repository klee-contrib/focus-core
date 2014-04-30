/*global _*/
//Default params.
var defaultParams = {paysCode: {name: 'paysCode', value:":codePays"}};
//Export the site description.
module.exports = function(params) {
    var p = _.extend({}, defaultParams, params);
    return {
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
            url: "#administration/audit/diagnosticd",
            roles: ['TEST'],
            headers: [{
                name: "audit",
                url: "#administration/audit/diagnostic",
                roles: ['ADMINISTRATION', 'TEST'],
                requiredParams: ['paysCode'],
                headers: [{
                    name: 'testParamRequis',
                    url: "#testParamRequis" + p.paysCode.value,
                    roles: ['PAPA', 'TEST']
                }],
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
};