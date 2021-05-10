
import axios from 'axios'
function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	return (false);
}
var token = getQueryVariable("t_token")
var rToken = getQueryVariable("r_token")

if (token != false) {
	localStorage.setItem("access_token", token)
	localStorage.setItem("refresh_token", rToken)
}
// axios.defaults.headers.common['Authorization'] = "Bearer " + "ed54a497-5f29-4bf7-97af-364240fd6bd2";
axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("access_token");