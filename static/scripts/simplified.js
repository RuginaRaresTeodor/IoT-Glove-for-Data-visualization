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
x = $('#console');
function processData(data) {
    if (data.length !== currentPosition) {

        console.log(data);

        // Pentru ca current position e globala, noi mergm intr-o singura directie pe sirul de date.
        // Nu e nevoie sa mai trecem vreodata pe unde am trecut deja.
        for (; currentPosition < data.length; currentPosition++) {


            if (currentPosition === 0) {
                // oriented graph va fi 1 sau 2, in functie de
                orientedGraph = data[currentPosition];
                if (orientedGraph === '1') {
                    x.append("Ai ales graful neorientat\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");

                } else if (orientedGraph === '2') {
                    x.append("Ai ales graful orientat\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                }
                continue;

            }

            if (state === "WaitingForCommand") {

                // Adaugam un nod nou/
                if (data[currentPosition] === '1') {
                    g.addNode(currentNodeCounter);
                    x.append("   Ai introdus un nou nod:    " + currentNodeCounter +"\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                    console.log("   Added node number     " + currentNodeCounter );
                    currentNodeCounter++;


                }
                //Eroare aici-> se duce pe r, dar ramane pe r-> si imi calculeaza no
                // Adaugam un edge nou
                if (data[currentPosition] === 'r') {

                    //currentPosition++;
                    // Deci incepand de la urmatoarea iteratie, citim nodul 1
                    state = "ParseNode1";
                    x.append("   Se asteapta perechea!   " +"\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                    console.log("Awaiting pair");
                    continue;
                }
                if (data[currentPosition] === '2' || data[currentPosition] === '3' || data[currentPosition] === '4' || data[currentPosition] === '5') {
                    continue;
                }

            }

            if (state === "ParseNode1") {

                // Cand intalnim primul n, am terminat de citit primul nod
                if (data[currentPosition] === 'n') {
                    // Trecem la citit nodul 2

                    //currentPosition++;
                    state = "ParseNode2";
                    continue;
                } else {

                    if (data[currentPosition] === 'r') {
                        //node1Value=0;
                        continue;
                    }
                    if (data[currentPosition] === 'p') {
                        continue;
                    }
                    if (data[currentPosition - 1] === 'p') {
                        if (data[currentPosition] === '5') {
                            node1Value *= 10;
                        } else {
                            node1Value *= 10;
                            node1Value += parseInt(data[currentPosition]) + 5
                            x.append("   Primul nod format din   " + (node1Value + 5) +"\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                            console.log("1st of NodePair--" + node1Value);
                        }
                    } else {
                        // Inmultim cu 10 valoarea curenta si adaugam urmatoarea cifra
                        node1Value *= 10;
                        node1Value += parseInt(data[currentPosition])
                        x.append("   Primul nod format din   " + node1Value +"\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                        console.log("1st of NodePair--" + node1Value);
                        //location.reload(true);
                    }

                }
            }

            if (state === "ParseNode2") {
                if (data[currentPosition] === 'n') {

                    if (data[0] === "1") {
                        g.addEdge(node1Value, node2Value);

                    } else
                        // Daca am ajuns aici inseamna ca am terminat de citit un edge
                    if (data[0] === "2") {
                        g.addEdge(node1Value, node2Value, {directed: true});
                    }
                    x.append("   Noua muchie intre " + node1Value + "     " + node2Value +"\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                    console.log("addedEdge" + node1Value + "    " + node2Value);
                    // Resetam valorile si state-ul pe Waiting for command
                    node1Value = 0;
                    node2Value = 0;
                    state = "WaitingForCommand"

                }
                else if (data[currentPosition - 1] === 'p') {
                        if (data[currentPosition] === '5') {
                            node2Value *= 10;
                        } else {
                            node2Value *= 10;
                            node2Value += parseInt(data[currentPosition]) + 5
                            x.append("   Al doilea nod format din   " + (node2Value + 5) +"\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                            console.log("2st of NodePair--" + node2Value);
                        }
                    }
                else {
                    node2Value *= 10;
                    node2Value += parseInt(data[currentPosition])
                    console.log("2nd of NodePair--" + node2Value);
                    x.append("   Al doilea nod format din   " + node2Value +"\n").animate({
	    		scrollTop: x[0].scrollHeight}, "slow");
                }

            }


            renderFunction();

        }

        $("svg").remove();

        var renderer = new Renderer(document.getElementById('canvas'), g, 1200, 600);
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
