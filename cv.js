Router.route('/', function () {
    // render the Home template with a custom data context
    //this.render('Home', {data: {title: 'My Title'}});
    //this.next()
});

var data = [
    {
        title: "Développeur de plate-forme SaaS",
        where: "Digitaleo – Bruz",
        from: "07/2009",
        to: "12/2011",
    },
    {
        title: "Ingénieur d’étude et de développement de solution SasS - Orange Business Services",
        where: "Néo-Soft – Paris",
        from: "01/2012",
        to: "06/2013",
    },
    {
        title: "Ingénieur d’étude et de développement de plate-forme SaaS",
        where: "IJENKO - Boulogne-Billancourt",
        from: "07/2013",
        to: "présent",
    },
    {

    }
];


if (Meteor.isClient) {
    Template.links.helpers({
        links: [
            { id: "github", url: "https://github.com/itscaro", title: "Github" },
            { id: "linkedin", url: "https://www.linkedin.com/in/itscaro", title: "Linkedin" },
            { id: "viadeo", url: "http://www.viadeo.com/profile/0021r0s83i1nh0pu", title: "Viadeo" },
            { id: "cv", url: "http://1drv.ms/20YI3no", title: "CV" },
        ]
    });

    //$("section #experience div").load("get_template/exp");
    $.get("get_template/exp", function (data) {
        $("section#experience div").html(data)
    })

    $.get("get_template/perso", function (data) {
        $("section#personal").html(data)
    })
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        for (var i in data) {
            if (Object.keys(data[i]).length == 0) {
                data.splice(i, 1)
            } else {
                try {
                    data[i].description = Assets.getText('exp' + i + '.html')
                } catch (e) {
                    data.splice(i, 1)
                }
            }
        }
        data.reverse()

        var datas = {
            exp: data,
            perso: {
                html: Assets.getText('perso.html')
            }
        }

        Router.map(function () {
            this.route('serverFile', {
                where: 'server',
                path: '/get_template/:templatename',

                action: function () {
                    try {
                        var templatename = this.params.templatename;

                        this.response.writeHead(200, { 'Content-Type': 'text/html' });
                        this.response.end(Handlebars.templates[templatename]({ data: datas[templatename] }));
                    } catch (e) {
                        this.response.writeHead(200, { 'Content-Type': 'text/html' });
                        this.response.end()
                    }
                }
            });
        });
    });
}
