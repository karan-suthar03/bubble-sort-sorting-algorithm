var widths;
var heights = 400;
var list = [];
var n;
var barWidth;
var j = 0;
var largest;
var run;

function setup() {
    widths = windowWidth;
    var canvas = createCanvas(widths, heights);
    canvas.parent("canvas-container");
    oscillator = new p5.Oscillator();
    oscillator.setType('sine');
    for (var i = 0; i < 100; i++) {
        list[i] = random();
    }
    largest = 0;
    barWidth = widths / list.length;
    n = list.length;
    for (var i = 0; i < list.length; i++) {
        if (largest < list[i]) {
            largest = list[i];
        }
    }
    j = 0;
    run = 1;
}

function draw() {
    background(255);

    if (j < n) {

        if (list[j] > list[j + 1]) {
            run = 1;
            var temp = list[j];
            list[j] = list[j + 1];
            list[j + 1] = temp;
        } else {
            run = run + 1;
        }
        j++;
    } else {
        n = n - run;
        j = 0;
        //run = 0;
    }
    //stopSound();
    drawTheShit(list);

}

function drawTheShit(list) {
    for (var i = 0; i < list.length; i++) {
        fill(0, 0, 0);
        rect(i * barWidth, heights, barWidth, -(list[i] / largest) * heights);
    }
    if (list[j] > list[j + 1]) {
        fill(255, 0, 0);
    } else {
        fill(0, 0, 255);
    }
    rect(j * barWidth, heights, barWidth, -(list[j] / largest) * heights);
    rect((j + 1) * barWidth, heights, barWidth, -(list[j + 1] / largest) * heights);
    if (j > 0) {
        playSound(map(list[j], 0, largest, 2400, 440));
    } else {
        stopSound();
    }
}

function playSound(frequency) {
    oscillator.freq(frequency);
    oscillator.start();
    oscillator.amp(0.5);
}

function stopSound() {
    oscillator.stop();
}
