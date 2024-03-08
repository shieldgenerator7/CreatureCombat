"use strict";

//2024-03-03: copied from https://stackoverflow.com/a/56607553/2336212
export function UploadFromFilePicker(card, callback) {
    var el =
        // window._protected_reference =
        document.createElement("INPUT");
    el.type = "file";
    el.accept = "image/*";
    // el.multiple = "multiple"; // remove to have a single file selection

    // (cancel will not trigger 'change')
    el.addEventListener('change', () => {
        // access el.files[] to do something with it (test its length!)

        // add first image, if available
        if (el.files.length) {
            card.imageURL = URL.createObjectURL(el.files[0]);
            callback();
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
