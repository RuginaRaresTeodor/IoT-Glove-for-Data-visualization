var commandString;
var statesArray = [];
var i = 0;

var Graph = Dracula.Graph
var Renderer = Dracula.Renderer.Raphael
var Layout = Dracula.Layout.Spring
var g = new Graph();
let x = 1;
let nodeNumber = 1;
const nodeOne = /[^n]*/i;
const nodeTwo = /[^n]*/i;

function fetchFunction() {
    fetch('http://192.168.100.216/data.txt')
        .then(response => response.text())
        .then(data => {
            // Do something with your data
            commandString = data;
            if (statesArray.includes(commandString) === false) {
                statesArray[i] = String(commandString);
                console.log(statesArray[i]);


                if (statesArray[i].charAt(0) === '1') {
                    $('#console').append("Ai ales graful neorientat");
                    console.log("Ai ales graful neorientat")
                    var itsOk = true;
                } else if (statesArray[i].charAt(0) === '2') {
                    $('#console').append("Ai ales graful orientat");
                    console.log("Ai ales graful orientat")
                    itsOk = false;
                }

                if (String((statesArray[i]).match(/[0-9]*n[0-9]*n/i)) != null) {
                    for (let k = 1; k < String(statesArray[i]).length; k++) {


                        $("svg").remove();

                        //var count = ((statesArray[i].substr(0,)).match(/[0-9]*n[0-9]*n/i)).length;

                        if ((statesArray[i].substr(k,)).match(/[0-9]*n[0-9]*n/i) != null) {
                            var count = ((statesArray[i].substr(k,)).match(/[0-9]*n[0-9]*n/i)).length;
                            //var z = (statesArray[i].substr(k,)).match(/[0-9]*n[0-9]*n/i);
                            //var y = String(z).length;
                        }

                        //console.log(y);
                        if ((statesArray[i].charAt(k) === '3' || statesArray[i].charAt(k) === '4' || statesArray[i].charAt(k) === '5') && (((statesArray[i].substr(1, k)).match(/n/g) || []).length % 2 === 0)) {
                            //k++;
                            console.log("dadada" + k);
                        }
                        if (statesArray[i].charAt(k) === '1' && (((statesArray[i].substr(1, k)).match(/n/g) || []).length % 2 === 0)) {
                            g.addNode(nodeNumber);
                            console.log("Added new node xxx" + nodeNumber);
                            nodeNumber++;
                        }
                        if (((statesArray[i].substr(1, k)).match(/n/g) || []).length % 2 === 0) {
                            x = String(statesArray[i].substr(1, k)).length;
                            //console.log(x + "aaaaaaaa")
                        }

                        if (statesArray[i].charAt(k) === '2' && itsOk === true && count > 0) { //daca este neorientat
                            //verificam regex pentru stringul dintre n-uri -> primul nod
                            if (((statesArray[i].substr(1, k)).match(/n/g) || []).length % 2 === 0) {
                                x = String(statesArray[i].substr(1, k)).length;
                                //console.log(x + "aaaaaaaa")
                            }
                            if (statesArray[i].charAt(k - 1) !== '2') {
                                const check = String(statesArray[i].match(nodeOne));
                                const result = String(check).substr(k + 1,);
                                console.log("Primul nod: " + result);
                                //verificam regex pentru stringul dintre n-uri -> al doilea nod
                                const check_2 = statesArray[i].substr(k + 2 + result.length,)     //daca nu merge e de la K - nu are parseInt
                                const result_2 = String(check_2.match(nodeTwo));
                                console.log("Al doilea nod: " + result_2);


                                // if(nodeNumber>0 &&(parseInt(result) === nodeNumber || parseInt(result_2) ===nodeNumber))
                                // {
                                //     nodeNumber++;
                                // }
                                // check daca nodurile e de forma 1...5 / 11 ..... 15 / 21 .... 25 / ....... / 41 ..... 45  -> produs cartezian 5X5
                                if (
                                    ((parseInt(result) > 0 && parseInt(result) <= 5)
                                        || (parseInt(result) > 10 && parseInt(result) <= 15)
                                        || (parseInt(result) > 20 && parseInt(result) <= 25)
                                        || (parseInt(result) > 30 && parseInt(result) <= 35)
                                        || (parseInt(result) > 40 && parseInt(result) <= 45))
                                    && ((parseInt(result_2) > 0 && parseInt(result_2) <= 5)
                                    || (parseInt(result_2) > 10 && parseInt(result_2) <= 15)
                                    || (parseInt(result_2) > 20 && parseInt(result_2) <= 25)
                                    || (parseInt(result_2) > 30 && parseInt(result_2) <= 35)
                                    || (parseInt(result_2) > 40 && parseInt(result_2) <= 45))) {
                                    g.addEdge(result, result_2);
                                    console.log("new edge");
                                }

                                // check daca nodul e de foma 5 - 10
                                if ((parseInt(result) > 50 && parseInt(result) <= 55) &&
                                    (parseInt(result_2) > 50 && parseInt(result_2) <= 55)) {
                                    console.log("5 - 10");
                                    g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)));
                                }
                                //combinatie  5x - xx
                                if ((parseInt(result) > 50 && parseInt(result) <= 55) &&
                                    ((parseInt(result_2) > 0 && parseInt(result_2) <= 5)
                                        || (parseInt(result_2) > 10 && parseInt(result_2) <= 15)
                                        || (parseInt(result_2) > 20 && parseInt(result_2) <= 25)
                                        || (parseInt(result_2) > 30 && parseInt(result_2) <= 35)
                                        || (parseInt(result_2) > 40 && parseInt(result_2) <= 45))) {
                                    console.log("5x - xx");
                                    g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), result_2);
                                }
                                //combinatie  xx - 5x
                                if ((parseInt(result_2) > 50 && parseInt(result_2) <= 55) &&
                                    ((parseInt(result) > 0 && parseInt(result) <= 5)
                                        || (parseInt(result) > 10 && parseInt(result) <= 15)
                                        || (parseInt(result) > 20 && parseInt(result) <= 25)
                                        || (parseInt(result) > 30 && parseInt(result) <= 35)
                                        || (parseInt(result) > 40 && parseInt(result) <= 45))) {
                                    console.log("xx - 5x");
                                    g.addEdge(result, parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)));
                                }
                                // combinatie x5y -- x5y        x ->1....4       y-> 1...5
                                if ((parseInt(result) > 150 && parseInt(result) <= 455) && (parseInt(result_2) > 150 && parseInt(result_2) <= 455)) {
                                    if (parseInt(result.charAt(1)) === 5 && parseInt(result.charAt(1)) === parseInt(result.charAt(2))) {
                                        console.log("x5y -- x5y");
                                        g.addEdge(parseInt(result.charAt(0)) * 10 + 10, parseInt(result_2.charAt(1)) * 10 + 10);
                                    } else {
                                        console.log("else de la x5y -- x5y");
                                        g.addEdge(parseInt(result.charAt(0)) * 10 + parseInt(result.charAt(1)) + parseInt(result.charAt(2)), parseInt(result_2.charAt(0)) * 10 + parseInt(result_2.charAt(1)) + parseInt(result_2.charAt(2)));
                                    }
                                }
                                if ((parseInt(result) > 150 && parseInt(result) <= 455) &&
                                    ((parseInt(result_2) > 0 && parseInt(result_2) <= 5)
                                        || (parseInt(result_2) > 10 && parseInt(result_2) <= 15)
                                        || (parseInt(result_2) > 20 && parseInt(result_2) <= 25)
                                        || (parseInt(result_2) > 30 && parseInt(result_2) <= 35)
                                        || (parseInt(result_2) > 40 && parseInt(result_2) <= 45))) {
                                    if (parseInt(result.charAt(1)) === 5 && parseInt(result.charAt(1)) === parseInt(result.charAt(2))) {
                                        console.log("Alt caz");
                                        g.addEdge(parseInt(result.charAt(0)) * 10 + 10, parseInt(result_2));
                                    } else {
                                        console.log("else de la alt caz");
                                        g.addEdge(parseInt(result.charAt(0)) * 10 + parseInt(result.charAt(1)) + parseInt(result.charAt(2)), parseInt(result_2));
                                    }
                                }

                                if ((parseInt(result) > 150 && parseInt(result) <= 455) &&
                                    (parseInt(result_2) > 50 && parseInt(result_2) <= 55)) {
                                    if (parseInt(result.charAt(1)) === 5 && parseInt(result.charAt(1)) === parseInt(result.charAt(2))) {
                                        console.log("caz 12");
                                        g.addEdge(parseInt(result.charAt(0)) * 10 + 10, parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)));
                                    } else {
                                        console.log("else caz 12");
                                        g.addEdge(parseInt(result.charAt(0)) * 10 + parseInt(result.charAt(1)) + parseInt(result.charAt(2)), parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)));
                                    }
                                }

                                if ((parseInt(result_2) > 150 && parseInt(result_2) <= 455) &&
                                    ((parseInt(result) > 0 && parseInt(result) <= 5)
                                        || (parseInt(result) > 10 && parseInt(result) <= 15)
                                        || (parseInt(result) > 20 && parseInt(result) <= 25)
                                        || (parseInt(result) > 30 && parseInt(result) <= 35)
                                        || (parseInt(result) > 40 && parseInt(result) <= 45))) {
                                    if (parseInt(result_2.charAt(1)) === 5 && parseInt(result_2.charAt(1)) === parseInt(result_2.charAt(2))) {
                                        console.log("caz 123");
                                        g.addEdge(parseInt(result), parseInt(result_2.charAt(0)) * 10 + 10);
                                    } else {
                                        console.log("else de la caz 123");
                                        g.addEdge(parseInt(result), parseInt(result_2.charAt(0)) * 10 + parseInt(result_2.charAt(1)) + parseInt(result_2.charAt(2)));
                                    }
                                }
                                if ((parseInt(result_2) > 150 && parseInt(result_2) <= 455) &&
                                    (parseInt(result) > 50 && parseInt(result) <= 55)) {
                                    if (parseInt(result_2.charAt(1)) === 5 && parseInt(result_2.charAt(1)) === parseInt(result_2.charAt(2))) {
                                        console.log("caz 1234");
                                        g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), parseInt(result_2.charAt(0)) * 10 + 10);
                                    } else {
                                        console.log("else de la caz 1234");
                                        g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), parseInt(result_2.charAt(0)) * 10 + parseInt(result_2.charAt(1)) + parseInt(result_2.charAt(2)));
                                    }
                                }

                            }
                        }


                        if (statesArray[i].charAt(k) === '2' && itsOk === false) { //daca este orientat
                            //verificam regex pentru stringul dintre n-uri -> primul nod
                            const check = String(statesArray[i].match(nodeOne));
                            const result = String(check).substr(k + 1,);
                            //verificam regex pentru stringul dintre n-uri -> al doilea nod
                            const check_2 = statesArray[i].substr(k + 2 + result.length,)     //daca nu merge e de la K - nu are parseInt
                            const result_2 = String(check_2.match(nodeTwo));

                            // check daca nodurile e de forma 1...5 / 11 ..... 15 / 21 .... 25 / ....... / 41 ..... 45  -> produs cartezian 5X5
                            if (
                                ((parseInt(result) > 0 && parseInt(result) <= 5)
                                    || (parseInt(result) > 10 && parseInt(result) <= 15)
                                    || (parseInt(result) > 20 && parseInt(result) <= 25)
                                    || (parseInt(result) > 30 && parseInt(result) <= 35)
                                    || (parseInt(result) > 40 && parseInt(result) <= 45))
                                && ((parseInt(result_2) > 0 && parseInt(result_2) <= 5)
                                || (parseInt(result_2) > 10 && parseInt(result_2) <= 15)
                                || (parseInt(result_2) > 20 && parseInt(result_2) <= 25)
                                || (parseInt(result_2) > 30 && parseInt(result_2) <= 35)
                                || (parseInt(result_2) > 40 && parseInt(result_2) <= 45))) {
                                g.addEdge(result, result_2, {directed: true});
                            }

                            // check daca nodul e de foma 5 - 10
                            if ((parseInt(result) > 50 && parseInt(result) <= 55) &&
                                (parseInt(result_2) > 50 && parseInt(result_2) <= 55)) {
                                g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)), {directed: true});
                            }
                            //combinatie  5x - xx
                            if ((parseInt(result) > 50 && parseInt(result) <= 55) &&
                                ((parseInt(result_2) > 0 && parseInt(result_2) <= 5)
                                    || (parseInt(result_2) > 10 && parseInt(result_2) <= 15)
                                    || (parseInt(result_2) > 20 && parseInt(result_2) <= 25)
                                    || (parseInt(result_2) > 30 && parseInt(result_2) <= 35)
                                    || (parseInt(result_2) > 40 && parseInt(result_2) <= 45))) {
                                g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), result_2, {directed: true});
                            }
                            //combinatie  xx - 5x
                            if ((parseInt(result_2) > 50 && parseInt(result_2) <= 55) &&
                                ((parseInt(result) > 0 && parseInt(result) <= 5)
                                    || (parseInt(result) > 10 && parseInt(result) <= 15)
                                    || (parseInt(result) > 20 && parseInt(result) <= 25)
                                    || (parseInt(result) > 30 && parseInt(result) <= 35)
                                    || (parseInt(result) > 40 && parseInt(result) <= 45))) {
                                g.addEdge(result, parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)), {directed: true});
                            }
                            // combinatie x5y -- x5y        x ->1....4       y-> 1...5
                            if ((parseInt(result) > 150 && parseInt(result) <= 455) && (parseInt(result_2) > 150 && parseInt(result_2) <= 455)) {
                                if (parseInt(result.charAt(1)) === 5 && parseInt(result.charAt(1)) === parseInt(result.charAt(2))) {
                                    g.addEdge(parseInt(result.charAt(0)) * 10 + 10, parseInt(result_2.charAt(1)) * 10 + 10, {directed: true});
                                } else g.addEdge(parseInt(result.charAt(0)) * 10 + parseInt(result.charAt(1)) + parseInt(result.charAt(2)), parseInt(result_2.charAt(0)) * 10 + parseInt(result_2.charAt(1)) + parseInt(result_2.charAt(2)), {directed: true});
                            }
                            if ((parseInt(result) > 150 && parseInt(result) <= 455) &&
                                ((parseInt(result_2) > 0 && parseInt(result_2) <= 5)
                                    || (parseInt(result_2) > 10 && parseInt(result_2) <= 15)
                                    || (parseInt(result_2) > 20 && parseInt(result_2) <= 25)
                                    || (parseInt(result_2) > 30 && parseInt(result_2) <= 35)
                                    || (parseInt(result_2) > 40 && parseInt(result_2) <= 45))) {
                                if (parseInt(result.charAt(1)) === 5 && parseInt(result.charAt(1)) === parseInt(result.charAt(2))) {
                                    g.addEdge(parseInt(result.charAt(0)) * 10 + 10, parseInt(result_2), {directed: true});
                                } else g.addEdge(parseInt(result.charAt(0)) * 10 + parseInt(result.charAt(1)) + parseInt(result.charAt(2)), parseInt(result_2), {directed: true});
                            }

                            if ((parseInt(result) > 150 && parseInt(result) <= 455) &&
                                (parseInt(result_2) > 50 && parseInt(result_2) <= 55)) {
                                if (parseInt(result.charAt(1)) === 5 && parseInt(result.charAt(1)) === parseInt(result.charAt(2))) {
                                    g.addEdge(parseInt(result.charAt(0)) * 10 + 10, parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)), {directed: true});
                                } else g.addEdge(parseInt(result.charAt(0)) * 10 + parseInt(result.charAt(1)) + parseInt(result.charAt(2)), parseInt(result_2.charAt(0)) + parseInt(result_2.charAt(1)), {directed: true});
                            }

                            if ((parseInt(result_2) > 150 && parseInt(result_2) <= 455) &&
                                ((parseInt(result) > 0 && parseInt(result) <= 5)
                                    || (parseInt(result) > 10 && parseInt(result) <= 15)
                                    || (parseInt(result) > 20 && parseInt(result) <= 25)
                                    || (parseInt(result) > 30 && parseInt(result) <= 35)
                                    || (parseInt(result) > 40 && parseInt(result) <= 45))) {
                                if (parseInt(result_2.charAt(1)) === 5 && parseInt(result_2.charAt(1)) === parseInt(result_2.charAt(2))) {
                                    g.addEdge(parseInt(result), parseInt(result_2.charAt(0)) * 10 + 10, {directed: true});
                                } else g.addEdge(parseInt(result), parseInt(result_2.charAt(0)) * 10 + parseInt(result_2.charAt(1)) + parseInt(result_2.charAt(2)), {directed: true});
                            }
                            if ((parseInt(result_2) > 150 && parseInt(result_2) <= 455) &&
                                (parseInt(result) > 50 && parseInt(result) <= 55)) {
                                if (parseInt(result_2.charAt(1)) === 5 && parseInt(result_2.charAt(1)) === parseInt(result_2.charAt(2))) {
                                    g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), parseInt(result_2.charAt(0)) * 10 + 10, {directed: true});
                                } else g.addEdge(parseInt(result.charAt(0)) + parseInt(result.charAt(1)), parseInt(result_2.charAt(0)) * 10 + parseInt(result_2.charAt(1)) + parseInt(result_2.charAt(2)), {directed: true});
                            }


                        }
                    }
                } else if ((statesArray[i].charAt(k) === '3' || statesArray[i].charAt(k) === '4' || statesArray[i].charAt(k) === '5') && (((statesArray[i].substr(1, k)).match(/n/g) || []).length % 2 === 0)) {
                    k++;
                } else if (statesArray[i].charAt(k) === '1' && (((statesArray[i].substr(1, k)).match(/n/g) || []).length % 2 === 0)) {
                    g.addNode(nodeNumber);
                    console.log("Added new node " + nodeNumber);
                    nodeNumber++;

                    var layout = new Layout(g);
                    layout.layout();
                    var renderer = new Renderer(document.getElementById('canvas'), g, 800, 600);
                    //var renderer = new Raphael(document.getElementById('canvas'), g, 800, 600)

                    renderer.draw();
                    i++;

                }

            }
        });
}

setInterval(fetchFunction, 1000);

//
// redrawFunction = function () {
//     g.addEdge('id34', 'cherry', {directed: true});
//
//     var layout = new Layout(g);
//     layout.layout();
//     var renderer = new Renderer(document.getElementById('canvas'), g, 800, 600);
//     renderer.draw();
// };


// var layout = new Layout(g);
// layout.layout();
// var renderer = new Renderer(document.getElementById('canvas'), g, 800, 600);
// renderer.draw();

