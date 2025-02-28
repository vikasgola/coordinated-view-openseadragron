let viewer1, viewer2;

$("#load-url").click(function () {
    let url = $("#image-url").val();
    if (url) {
        if (!viewer1 && !viewer2) {
            viewer1 = OpenSeadragon({
                id: "viewer1",
                prefixURL: "/coordinated-view-code-challenge/",
                tileSources: {
                    url: url,
                    type: 'image',
                },
                zoomInButton: "zoom-in1",
                zoomOutButton: "zoom-out1",
                homeButton: "home1",
            });

            viewer2 = OpenSeadragon({
                id: "viewer2",
                prefixURL: "/coordinated-view-code-challenge/",
                tileSources: {
                    url: url,
                    type: 'image',
                },
                zoomInButton: "zoom-in2",
                zoomOutButton: "zoom-out2",
                homeButton: "home2",
            });
        } else {
            viewer1.open({
                type: 'image',
                url: url
            });
            viewer2.open({
                type: 'image',
                url: url
            });
        }
    }
});

$("#synccheckbox").change(function () {
    if (this.checked) {
        ["zoom", "pan"].forEach((eventname) => {
            let isZoomHappened = false;
            let isPanHappened = false;
            [viewer1, viewer2].forEach((viewer) => {
                viewer.addHandler(eventname, (v) => {
                    let other = viewer == viewer1 ? viewer2 : viewer1;

                    if (!isZoomHappened) {
                        isZoomHappened = !isZoomHappened;
                        other.viewport.zoomTo(viewer.viewport.getZoom());
                        isZoomHappened = false;
                    }
                    if (!isPanHappened) {
                        isPanHappened = !isPanHappened;
                        other.viewport.panTo(viewer.viewport.getCenter());
                        isPanHappened = false;
                    }
                });
            })
        });
    } else {
        [viewer1, viewer2].forEach((viewer) => {
            viewer.removeAllHandlers();
        });
    }
});