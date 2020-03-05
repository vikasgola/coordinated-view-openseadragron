let viewer1 = OpenSeadragon({
    id: "viewer1",
    prefixURL: "openseadrag/images/",
    tileSources:{
        url: "http://www.webpathology.com/slides-13/slides/Thyroid_MTC42_PseudoPapillary.jpg",
        type: 'image',
    },
});

let viewer2 = OpenSeadragon({
    id: "viewer2",
    prefixURL: "openseadrag/images/",
    tileSources:{
        url: "http://www.webpathology.com/slides-13/slides/Thyroid_MTC42_PseudoPapillary.jpg",
        type: 'image',
    },
});


$("#synccheckbox").change(function() {
    if(this.checked) {
        ["zoom", "pan"].forEach((eventname)=>{
            let isZoomHappened = false;
            let isPanHappened = false;
            [viewer1, viewer2].forEach((viewer)=>{
                viewer.addHandler(eventname, (v)=>{
                    let other = viewer == viewer1 ? viewer2: viewer1;
        
                    if(!isZoomHappened){
                        isZoomHappened = !isZoomHappened;
                        other.viewport.zoomTo(viewer.viewport.getZoom());
                        isZoomHappened = false;
                    }
                    if(!isPanHappened){
                        isPanHappened = !isPanHappened;
                        other.viewport.panTo(viewer.viewport.getCenter());
                        isPanHappened = false;
                    }
                });
            })
        });        
    }else{
        [viewer1, viewer2].forEach((viewer)=>{
            viewer.removeAllHandlers();
        });
    }
});
