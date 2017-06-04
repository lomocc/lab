var panel;

function setup(yymmdd, desc, prev, next, links) {
    document.title = yymmdd;
    panel = QuickSettings.create(10, 10, yymmdd);

    var prevNext = '';
    if(prev) {
        prevNext += '<a href="' + prev + '.html">PREV</a>';
        if(next) {
            prevNext += " - ";
        }
    }
    if(next) {
        prevNext += '<a href="' + next + '.html">NEXT</a>'
    }

    panel
        .addHTML("Source, Comments, Social", '<a href="https://github.com/lomocc/lab/blob/master/src/' + yymmdd + '.js"><img src="imgs/github.png"></a>')
        .addHTML("hide", "H key toggles panel")
        .addHTML("prev_next", prevNext)
        .addHTML("Description", desc);

        if(links) {
            panel.addHTML("Links", "");
            for(var i = 0; i < links.length; i++) {
                panel.addHTML("link" + i, links[i]);
            }
        }
    panel
        .hideAllTitles()
        .showTitle("Source, Comments, Social")
        .showTitle("Description")
        .setKey("h");

    if(links) {
        panel.showTitle("Links");
    }

    var script = document.createElement("script");
    script.src = yymmdd + ".js";
    document.body.appendChild(script);
}
