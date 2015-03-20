var Words = {
    links : [],
    separator: "-->",

    init: function (class_name){
        Words.selector = class_name;
        $(Words.selector).each(function() {
            $(this).html(Words.render($(this).text()));
        });
    },

    render: function(sentence){
        l = []
        $(sentence.split(" ")).each(function(){
            l.push("<span class=\"word\" onclick=\"Words.click(this)\">" + this.trim() + "</span>");
        });
        return "<div class=\"words\">" + l.join("") + "</div>" + "<div class=\"results\"></div>";
    },

    click: function(elem){
        var results = $(elem).parent().parent().children('.results');
        var siblings = $(elem).parent().children('.active');

        if (siblings.length == 1){
            $(siblings[0]).removeClass("active");
            var to_add = $(siblings[0]).text() + Words.separator + $(elem).text();
            Words.links.push(to_add);
            to_add = "<span onclick=\"Words.del(this)\">" + to_add + "</span>";
            results.html(results.html() + to_add);
        }
        else{
            $(elem).addClass("active"); 
        }
    },

    del: function(elem){
        Words.links.pop(Words.links.indexOf($(elem).text()));
        $(elem).remove();

    },

    expo: function(){
        l = []
        $(Words.links).each((function(){
            x = this.split(Words.separator)
            for (i = 0; i < x.length; ++i) {
                x[i] = x[i].replace(/[^\w\s]/gi, '')
            }
            l.push(x.join(" "));
        }));
        window.open("data:text/txt;charset=utf-8," + escape(l.join("\n")));
    }


}