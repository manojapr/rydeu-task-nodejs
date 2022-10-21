const flaggedCity=["delhi,bihar"];

async function isemailrequired(price,drop,destination){
	if(price>1000 || flaggedCity.includes(destination)|| flaggedCity.includes(drop)){
		return [true,price];
	}else{
		return [false,price];
	}

} 
exports.isemailrequired=isemailrequired;