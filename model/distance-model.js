const flaggedCity = ["delhi"];
export function dist(origin,dest,city) {
    if(flaggedCity.includes(city)) {
        let distance;
        if((origin == 'redfort' && dest == 'qutub minar') || (origin == 'qutub minar' && dest == 'redfort')) {
            distance = 14;
        } else if((origin == 'redfort' && dest == 'taj mahal') || (origin == 'taj mahal' && dest == 'red fort')) {
            distance = 400;
        } else if((origin == 'redfort' && dest == 'lotus temple') || (origin == 'lotus temple' && dest == 'red fort')) {
            distance = 25;
        } else if((origin == 'qutub minar' && dest == 'lotus temple') || (origin == 'lotus temple' && dest == 'qutub minar')) {
            distance = 44;
        } else if((origin == 'new delhi station' && dest == 'noida') || (origin == 'noida' && dest == 'new delhi station')) {
            distance = 36;
        } else if((origin == 'akshardam' && dest == 'lotus temple') || (origin == 'lotus temple' && dest == 'akshardam')) {
            distance = 18;
        } else if((origin == 'noida city centre' && dest == 'counaught place') || (origin == 'counaught place' && dest == 'noida city centre')) {
            distance = 20;
        } else if((origin == 'noida' && dest == 'kalindi kunj') || (origin == 'kalindi kunj' && dest == 'noida')) {
            distance = 16;
        } else if((origin == 'jama masjid' && dest == 'chandni chowk') || (origin == 'chandni chowk' && dest == 'jama masjid')) {
            distance = 5;
        } else if((origin == 'hauz khas' && dest == 'lotus temple') || (origin == 'lotus temple' && dest == 'hauz khas')) {
            distance = 9;
        } else if((origin == 'india gate' && dest == 'pragati maidan') || (origin == 'pragati maidan' && dest == 'india gate')) {
            distance = 7;
        } else if((origin == 'qutub minar' && dest == 'india gate') || (origin == 'india gate' && dest == 'qutub minar')) {
            distance = 19;
        } else {
            distance = false;
        } 
        return distance;
    } else {
        return false;
    }
}