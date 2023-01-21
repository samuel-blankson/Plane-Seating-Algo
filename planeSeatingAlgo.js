// [[3, 2], [4, 3], [2, 3], [3, 4]]
//based on the input from the test case(example in the coding question)
// Rows and Columns are in this format : CxR eg [3,2] implies that there are three colums and two rows




const generateSeating = (input, noOfPassengers) =>{

    const rowSize=Math.max.apply(Math, input.map(e=>e[0]));
    const colSize=Math.max.apply(Math, input.map(e=>e[1]));
    
    console.log(seatArrangementAWC(input))
    
    //Identify seats
    var seats=seatArrangementAWC(input)
    
     //Replace chars with numbers
     var obj={};
     obj=replaceWithNumber("A",1,seats,colSize,rowSize,noOfPassengers);
     obj=replaceWithNumber("W",obj.counter,obj.seats,colSize,rowSize,noOfPassengers);
     obj=replaceWithNumber("M",obj.counter,obj.seats,colSize,rowSize,noOfPassengers);
     seats=obj.seats;
    
     //print the seats
     printValues(seats,colSize,rowSize,input)
    
    }
    
    


const seatArrangementAWC = (input) => {
    const plane_length = input.length
    const plane = []
    for (let section in input) {// 0,1,2,3
        let c = input[section][0] // 3
        let r = input[section][1] // 2
        const plane_section = []
        for (let i = 0; i < r; i++) { // 0,1
            let row_seat = []
            for (let j = 0; j < c; j++) { // 0,1,2, 3
                row_seat.push("M")
                if (section != 0 && section != (plane_length - 1)) {
                    if (j == 0 || j == c - 1) row_seat[j] = "A"
                }
                if (section == 0) {
                    if (j == 0) row_seat[0] = "W"
                    if (j == c - 1) row_seat[c - 1] = "A"
                }


                if (section == (plane_length - 1)) {
                    if (j == c - 1) row_seat[c - 1] = "W"
                    if (j == 0) row_seat[0] = "A"
                }

            }
            plane_section.push(row_seat)
        }
        plane.push(plane_section)
    }


    return plane
}


const replaceWithNumber = (val,counter,seats,colSize,rowSize,noOfPeople) => {
	for(var i=0;i<colSize;i++){
		for(var j=0;j<rowSize;j++){
			if(seats[j]==null||seats[j][i]==null)
				continue;
			for(k=0;k<seats[j][i].length;k++){
			        if(seats[j]!=null&& seats[j][i]!=null && seats[j][i][k]===val){
			 	  seats[j][i][k]=counter;
                   if( counter == noOfPeople){
					return {seats:seats,counter:counter}
				}
				  counter++;
				}
                
			}
            
		}

	}
	return {seats:seats,counter:counter};
}

const printValues = (seats,colSize,rowSize,input) => {
	var stringJ=""
	for(var i=0;i<colSize;i++){
        let dashCount = input.length;
		  for(var j=0;j<rowSize;j++){
			  if(seats[j]==null||seats[j][i]==null){
                dashCount--
				 const dashLength = input[input.length-dashCount - 1][0]
                const dashArr = new Array(dashLength)
                dashArr.fill("- ")
                stringJ+=`${dashArr.reduce((a,b)=> a+" "+b) + ","}`
				  continue;
			  }
			  for(k=0;k<seats[j][i].length;k++){
				  stringJ+=(seats[j][i][k]+" ");
			  }
			  stringJ+=",";
		  }
		  stringJ+="\n"
	  }
	console.log(stringJ)
}








 // test input from example 
 const input = [[3, 2], [4, 3], [2, 3], [3, 4]]
 const numberOfPassengers = 30
 generateSeating(input,numberOfPassengers)
