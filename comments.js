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


var $docObj = $(document.body);

$docObj.ready(function (e) {   
    
    
    
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        dataType: "json"
    });
});
