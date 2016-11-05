function getCourse(sub,code) {
	var apiKey = "495cd8d2ca5f93e44f1171f5b58e59a0";
    return proxy.GetProxy('https://api.uwaterloo.ca/v2/courses/'+{subject}+'/'+code'/schedule.json?key=' + apiKey);
}