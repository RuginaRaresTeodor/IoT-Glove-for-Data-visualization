var commandString;
var statesArray = [];
var i = 0;
var Graph = Dracula.Graph
var Renderer = Dracula.Renderer.Raphael
var Layout = Dracula.Layout.Spring
var g = new Graph();

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

                    if (statesArray[i].charAt(0)==='1') {
                        $('#console').append("Ai ales graful neorientat");
                        console.log("da")

                    } else if (statesArray[i].charAt(0)==='2') {
                        $('#console').append("Ai ales graful orientat");
                        console.log("nu")
                    }

                    for(let k=1; k<statesArray[i].length; k++){
                        if(statesArray[i].charAt(k)==='1'){
                            g.addNode(nodeNumber);
                            console.log("Added new node "+nodeNumber);
                            nodeNumber++;
                        }
                        if(statesArray[i].charAt(k)==='2'){
                            const check = statesArray[i].match(nodeOne);
                            const result = String(check).substr(parseInt(k+1),);
                        }
                    }

                i++;
            }


        });
}

setInterval(fetchFunction, 1000);


redrawFunction = function () {
    g.addEdge('id34', 'cherry', {directed: true});
    g.addNode('dadadada');

    g.addEdge('strawberry', 'apple');
    g.addEdge("strawberry", "tomato");

    g.addEdge("tomato", "apple");
    g.addEdge("tomato", "kiwi");

    g.addEdge("cherry", "apple");
    g.addEdge("cherry", "kiwi");
    g.addEdge('strawberry', 'cherry', {directed: true})
    var layout = new Layout(g);
    layout.layout();
    var renderer = new Renderer(document.getElementById('canvas'), g, 800, 600);
    renderer.draw();
};

g.addEdge('id34', 'cherry', {directed: true});
g.addNode('',{label: 'T222222'} );

g.addEdge('strawberry', 'apple');
g.addEdge("strawberry", "tomato");

g.addEdge("tomato", "apple");
g.addEdge("tomato", "kiwi");

g.addEdge("cherry", "apple");
g.addEdge("cherry", "kiwi");
g.addEdge('strawberry', 'cherry', {directed: true})
var layout = new Layout(g);
layout.layout();
var renderer = new Renderer(document.getElementById('canvas'), g, 800, 600);
renderer.draw();

