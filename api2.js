import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

// not using SharedArray here will mean that the code in the function call (that is what loads and
// parses the json) will be executed per each VU which also means that there will be a complete copy
// per each VU
const data = new SharedArray('some data name', function () {
  return JSON.parse(open('./nodes-for-cmts_response.json'));
});



export default function () {
  const cmtslist = data;
 // console.log(cmtslist);
  //console.log(cmtslist.length);
  var array = [];
    //var elems = $("input[class=email]");

    for (var i = 0; i < 10; i += 1) {
        var Object=cmtslist[i];
        var cmts = Object.cmts;
        var nodeId = Object.nodeId;
        //console.log(cmts);
        //console.log(nodeId);
        var tmp = {
            'cmts': cmts,
            'nodeId': cmts
        };

        array.push(tmp);
    }

    var jsonString = JSON.stringify(array)
   console.log(jsonString);
    //console.log(array);

    var csv=papaparse.unparse(jsonString);
   // csv.stringify
    
    console.log(csv);
}