var Graph = Dracula.Graph
var Renderer = Dracula.Renderer.Raphael
var Layout = Dracula.Layout.Spring
var g = new Graph();
// Pozitia curenta in sirul de date.
var currentPosition = 0;

var currentNodeCounter = 1;

var orientedGraph;

// State poate fi 'WaitingForCommand', 'ParseNode1', 'ParseNode2'.
var state = "WaitingForCommand"

var node1Value = 0
var node2Value = 0

function renderFunction() {
    $("svg").remove();
    var layout = new Layout(g);
    layout.layout();

}

function saveSvg() {

}

function processData(data) {
    if(data.length!==currentPosition){

    console.log(data);

    // Pentru ca current position e globala, noi mergm intr-o singura directie pe sirul de date.
    // Nu e nevoie sa mai trecem vreodata pe unde am trecut deja.
    for (; currentPosition < data.length; currentPosition++) {


        if (currentPosition === 0) {
            // oriented graph va fi 1 sau 2, in functie de
            orientedGraph = data[currentPosition];

            continue;

        }

        if (state === "WaitingForCommand") {

            // Adaugam un nod nou/
            if (data[currentPosition] === '1') {
                g.addNode(currentNodeCounter);

                console.log("Added node number " + currentNodeCounter);
                currentNodeCounter++;


            }
            //Eroare aici-> se duce pe r, dar ramane pe r-> si imi calculeaza no
            // Adaugam un edge nou
            if (data[currentPosition] === 'r') {

                currentPosition++;
                // Deci incepand de la urmatoarea iteratie, citim nodul 1
                state = "ParseNode1";

                console.log("Awaiting pair");

            }

        }

        if (state === "ParseNode1") {

            // Cand intalnim primul n, am terminat de citit primul nod
            if (data[currentPosition] === 'n') {
                // Trecem la citit nodul 2

                currentPosition++;
                state = "ParseNode2";

            } else {
                // Inmultim cu 10 valoarea curenta si adaugam urmatoarea cifra
                if(data[currentPosition]==='r')
                {
                    node1Value=0;
                }
                node1Value *= 10;
                node1Value += parseInt(data[currentPosition])

                console.log("1st of NodePair--" + node1Value);
            }
        }

        if (state === "ParseNode2") {
            if (data[currentPosition] === 'n') {

                if (data[0] === "1")
                {
                    g.addEdge(node1Value, node2Value);
                }
                else
                    // Daca am ajuns aici inseamna ca am terminat de citit un edge
                if (data[0] === "2")
                {
                    g.addEdge(node1Value, node2Value,  {directed: true});
                }

                console.log("addedEdge"+node1Value +"    "+ node2Value);
                // Resetam valorile si state-ul pe Waiting for command
                node1Value = 0;
                node2Value = 0;
                state = "WaitingForCommand"

            } else {
                node2Value *= 10;
                node2Value += parseInt(data[currentPosition])
                console.log("2nd of NodePair--" + node2Value);

            }
        }

        if (data[currentPosition] === 'lll') {
            saveSvg();
        }
        renderFunction();

     }

    $("svg").remove();

 var renderer = new Renderer(document.getElementById('canvas'), g, 800, 600);
    //var renderer = new Raphael(document.getElementById('canvas'), g, 800, 600)

    renderer.draw();

}
}

function fetchFunction() {

    fetch('http://192.168.100.216/data.txt')
        .then(response => response.text())
        .then(data => processData(data))



}

setInterval(fetchFunction, 1000)
