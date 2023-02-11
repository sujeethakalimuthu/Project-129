song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
leftWristScore = 0;
rightWristScore = 0;
function preload()
{
    song1 = loadSound("the-imperial-march.mp3");
    song2 = loadSound("Harry-Potter-Theme-Song.mp3");
}
var leftWristScore = 0;
function setup()
{
    canvas = createCanvas(400, 300);
    canvas.position(450, 195);
    canvas.show();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, ModelLoaded)
    poseNet.on('pose', gotPoses);
}
function ModelLoaded()
{
    console.log("Model Loaded");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = "+leftWristX+"Left Wrist Y = "+leftWristY+" Right Wrist X = "+ rightWristX+" Right Wrist Y = "+rightWristY);
        leftWristScore = results[0].pose.keypoints[9].score;
    }
}
function draw()
{
    image(video, 0, 0, 400, 300);
    fill(255,0,0);
    stroke(255,0,0);
    song1_status = song1.isPlaying();
    if(leftWristScore > 0.2)
    {
        console.log(song1_status);
        circle(leftWristX, leftWristY, 30);
        song2.stop();
        if(song1_status == false)
        {
            document.getElementById("song_name").innerHTML = "Playing Star Wars Song";
            song1.play();
        }
    }
}  