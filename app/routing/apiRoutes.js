// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        // console.log(friendsData);
        // var arr = [];
        // for (var i = 0; i < friendsData.length; i++) {
        //     arr[i] = friendsData[i].scores;
        //     console.log(arr[i]);

        // }

        res.json(friendsData);

    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the friendsData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // console.log(friendsData);
        // console.log(req.body);
        // console.log(friendsData);
        for(var i=0; i< req.body.scores.length; i++){
            req.body.scores[i] = parseInt(req.body.scores[i]);
        }
       
        // console.log(res.body);

        friendsData.push(req.body);
           
            var totalDiff = 0;
            var tmp = [];
        for (var i = 0; i < friendsData.length; i++) {
            
            for (var j = 0; j < friendsData[i].scores.length; j++) {
                // if (friendsData.scores[j] ==) {}
                totalDiff += Math.abs(friendsData[i].scores[j] - req.body.scores[j])
            }
            // console.log(totalDiff);
            tmp.push(totalDiff);
            // console.log("--------");
            
            totalDiff = 0;
        }
        tmp.pop();
        console.log(tmp);
        
        var foo = tmp[0];
        var flag = 0 ;
        for (var i = 0; i < tmp.length; i++) {
            if(tmp[i+1] < foo){
                foo = tmp[i+1];
                flag = i+1;
            }
        }
        // return 

         res.json(friendsData[flag]);
        // console.log(foo);

    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function () {
        // Empty out the arrays of data
        friendsData = [];

        console.log(friendsData);
    });
};
