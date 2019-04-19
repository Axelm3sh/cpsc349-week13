var $docBody = $(document.body);

//*******AJAX stuff*******
function getPosts(callback) {
    console.log("Requesting Posts");

    var params = {
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        //        data: params,
        dataType: "json"
    };

    $.ajax(params).done(function (results) {
        if (callback) {
            //console.log(results);
            callback.call(this, results);
        }
    });

}

function getComments(postId, callback) {
    console.log("Requesting Comments");

    var params = {
        url: "https://jsonplaceholder.typicode.com/comments?postId=" + postId,
        method: "GET",
        //        data: params,
        dataType: "json"
    };

    $.ajax(params).done(function (results) {
        if (callback) {
            //console.log(results);
            callback.call(this, results);
        }
    });

}

//*******On Ready********
$docBody.ready(function (e) {

    getPosts(function (results) {

        results.forEach(function (item) {
            console.log(item);
            CreateNewPost(item.title, item.body, item.id);

        });

    });

});


(function (window) {
    'use strict';

    const BUTTON_SELECTOR = '[data-posts="id"]';

    let buttons = document.querySelectorAll(BUTTON_SELECTOR);

    buttons.forEach(function (button) {
        'use strict';

        let sectionSelector = `#comments-${button.value}`;
        let commentSection = document.querySelector(sectionSelector);

        button.addEventListener('click', function (event) {
            if (commentSection.hidden) {
                commentSection.hidden = false;
                button.textContent = 'Hide comments';
            } else {
                commentSection.hidden = true;
                button.textContent = 'Show comments';
            }

            event.preventDefault();
        });
    });
})(window);


//id is the unique postId
function CreateNewPost(title, body, id) {
    var template = $("#templatePost").text();
    console.log(template);

    //    return template;
    $("body").append(template);

    var $article = $("article:last-of-type");

    $article.find("h2").html(title);

    body = body.replace("\n", "<br>");

    $article.find("p").html(body);

    $article.find("button").attr("value", id);
    $article.find("button").attr("onClick", "ToggleComments(this)");

    //We place our comments in this
    $article.find("section").attr("id", "comments-" + id);

}

//comments belong to a post, postId identifies it.
function CreateNewComment(body, name, email, postId) {
    var template = $("#templateComment").text();

    var $section = $("#comments-" + postId);
    $section.append(template);

    body = body.replace("\n", "<br>");

    //TODO LAST OF TYPE
    $section.find("p").html(body);
    $section.find("a").attr("href", email);
    $section.find("a").html(name);

}


function ToggleComments(elem) {

    //    console.log($(elem).val());
    var postId = $(elem).val();
    var commentSect = $("#comments-" + postId);

    //Comments title only? First time check
    if (commentSect.children().length <= 1) {
        //Load comments
        getComments(postId, function (results) {
            //after results come back, do stuff
            results.forEach(function (item) {
                CreateNewComment(item.body, item.name, item.email, postId);
            });

            //Should only run first time comment load
            commentSect.slideDown("fast");
        });
    } else {
        
        if (commentSect.is(":hidden")) 
        {
            commentSect.slideDown("fast");
        }
        else
        {
            commentSect.slideUp("fast");
        }
    }



}
