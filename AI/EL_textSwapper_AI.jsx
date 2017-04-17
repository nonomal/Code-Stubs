﻿//#target illustrator/*    First select the layer in Illustrator that has all the text objects with the names of the images to be placed. This is "bases" in my template.    Then input the path to the folder with your images to be placed and click OK.    Your newly imported images will go into the layer called "new images".    */function MJ_textSwapper(thisObj) {   try{    var textSwapper = {};    textSwapper.doc = app.activeDocument;    textSwapper.imagesFolder = null;    textSwapper.files = null;    textSwapper.textObjs = [];    textSwapper.imageSize = 60;    textSwapper.swappedCounter = 0;    textSwapper.targetLayer = textSwapper.doc.layers.getByName("new images");    //textSwapper.oldLayer = textSwapper.doc.layers.getByName("old images");    textSwapper.sourceLayer = textSwapper.doc.layers.getByName("bases");        textSwapper.sourceFolder = Folder.selectDialog("Select the folder with your images.");    if ((textSwapper.sourceFolder !== null) && textSwapper.sourceFolder.exists)    {        textSwapper.imagesFolder = textSwapper.sourceFolder;    } else {return alert("Please select a source folder to use this script.")}    textSwapper.files = textSwapper.imagesFolder.getFiles();        if (textSwapper.sourceLayer.textFrames.length) {        textSwapper.textObjs = textSwapper.sourceLayer.textFrames;    } else { return alert("Please select a layer with text layers.");}        for (var i = 0; i < textSwapper.textObjs.length; i++) {        var t = textSwapper.textObjs[i];        var tc = t.contents.replace(/\s+/g, ''); // removes white space from the text in the text objects        var newImg;        for (var f = 0; f < textSwapper.files.length; f++) {            var filename = textSwapper.files[f].name.toLowerCase();            var n = filename.substr(0,filename.indexOf("_"));            //alert(n+" is "+tc+" ");            if (tc.toLowerCase() === n){                //alert("matched "+n);                var s = textSwapper.imageSize;                var poly = textSwapper.targetLayer.pathItems.rectangle( t.top, t.left, s, s );                poly.fillColor.red = 255;                poly.fillColor.blue = 255;                poly.fillColor.green = 255;                poly.stroked = false;                newImg = textSwapper.targetLayer.placedItems.add();                newImg.file = textSwapper.files[f];                newImg.left = t.left;                newImg.top = t.top;                newImg.height = s;                newImg.width = s;                textSwapper.swappedCounter++;                textSwapper.files.splice(f,1);                break;            }        }    }    return alert("Placed "+textSwapper.swappedCounter+" images.");    } catch(e) {alert(e+"\r"+e.line)}}MJ_textSwapper(this);