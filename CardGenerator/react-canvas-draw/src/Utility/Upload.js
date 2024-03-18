"use strict";

//2024-03-03: copied from https://stackoverflow.com/a/56607553/2336212
export function UploadFromFilePicker(filetype, callback = (result) => { }) {
    var el =
        // window._protected_reference =
        document.createElement("INPUT");
    el.type = "file";
    el.accept = filetype; //"image/*"; "text/*"
    // el.multiple = "multiple"; // remove to have a single file selection

    // (cancel will not trigger 'change')
    el.addEventListener('change', () => {
        // access el.files[] to do something with it (test its length!)

        // add first image, if available
        if (el.files.length) {
            let file = el.files[0];

            //2024-03-14: copied from RoomLayout
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (progressEvent) => {

                callback(progressEvent.currentTarget.result);
            };
        }


        // // test some async handling
        // new Promise(function (resolve) {
        //     setTimeout(function () { console.log(el.files); resolve(); }, 1000);
        // })
        //     .then(function () {
        //         // clear / free reference
        //         el = window._protected_reference = undefined;
        //     });

    });

    el.click(); // open
}
