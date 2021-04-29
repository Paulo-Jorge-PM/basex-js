function xpathQuery(xml, xpath) {
var xml = jQuery.parseXML(xml);
var extracted = "";
if (xml.evaluate) {
    var nodes = xml.evaluate(xpath.toLowerCase(), xml, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();
    while (result) {
        extracted += result.childNodes[0].nodeValue;
        result = nodes.iterateNext();
    } 
}
return(extracted);
}

function replaceN(s, f, r, n) {
    // From the given string s, replace f with r of nth occurrence
    let result = s.replace(RegExp("^(?:.*?" + f + "){" + n + "}"), x => x.replace(RegExp(f + "$"), r));
    return(result);
};


function basex(db="pokedex", xpath="", subqueries=[], template="", before="", after="", user="admin", password="admin", url="http://localhost:8984") {
    var query = xpath;
    var template = template;
    var connection = url + "/rest/" + db + "?query=" + query + "&method=html"
    var subqueries = subqueries;
    var after = after;
    var finalHtml = before;
    
    $.ajax({
     method: "GET",
     url: connection,
     headers: {
        "Authorization": "Basic " + btoa(user + ":" + password)
     },
     beforeSend : function(){
     $("xpath").before("<p id='loadingxpath'>Loading...</p>");
    },
    dataType: "html",
    success: function (response) {

    //$(document.body).append("<xpath style='visibility:hidden;'></xpath>");
    var xpath = $("xpath");
    xpath.append("<template id='template'>"+ template +"</template>");

    xpath.append("<outputs></outputs>");
    var results = "<results>" + response + "</results>";
    xpath.append(results);
     
    $("results").children().each(function(index) {
        var xml = $(this).prop('outerHTML');
        
        var newEntry = template;
        var i;
        for (i = 0; i < subqueries.length; i++) {
            var xpathResult = xpathQuery(xml, subqueries[i]);

            newEntry = replaceN(newEntry, "<!--xpath-->", xpathResult, 1)
        }
        
        finalHtml += newEntry
        
    });
    
    finalHtml += after;
    xpath.before(finalHtml);
    xpath.remove();
    $("#loadingxpath").hide();

    },
    error: function () {
        alert("Ocorreu um erro inesperado durante o processamento.");
    }
    
    
    })
    
}
