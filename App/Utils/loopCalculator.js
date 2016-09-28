var calculateDuration = function(clip, seconds) {

    // Get current duration of sound clip
    let duration = clip.getDuration();

    // duration of request Loop
    let totalTime = seconds;

    // Number of loops
    let loops = 0;
    console.log(duration, 'duration');
    console.log(totalTime, 'time');
    loops = totalTime / duration;

    console.log(loops, 'loops');

    // Number of loops that match the requested donation
    return loops;

};

module.exports = calculateDuration;