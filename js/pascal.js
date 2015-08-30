/**
 * Created by Dylan on 27/08/2015.
 */


// Generates row n of pascal's triangle using the binomial expansion equation

function generatePascalTriangleRow(row)
{

var numbers = [1];

    if(row == 0){
        return numbers;
    }

var n = row;
var k = 1;

for(var i = 1; i < row; i++)
{
    numbers[i] = (numbers[i-1]) * ((n+1-k)/k);
    k++;
}
numbers[numbers.length] = 1;
//console.log(numbers);
return [numbers];
}


// Generate a certain level of Pascal's pyramid.

function generatePascalPyramidLevel(level)
{

    // First we need the row of pascal's triangle at this level.
    var trianglerow = generatePascalTriangleRow(level);
    console.log(trianglerow);

    var pyramidlevel = [];
    for(var i = 0; i <= level; i++) // i is a row in this case.
    {
        var levelrow = [];
        var multiplicationRow = generatePascalTriangleRow(i);
        if(i == 0)
        {
            // Yes this has the first "row" of our triangle as a base...
            // the first one will always be zero.. so
            levelrow = [1];
        }else
            {
        /*    console.log("multiplication row");
            console.log(multiplicationRow[0]);
            console.log(multiplicationRow[0].length);
          */  for(var k = 0; k < multiplicationRow[0].length; k++)
            {
       //         console.log("calculating " + multiplicationRow[0][k] + " mutliplied with " + trianglerow[0][i]);
                levelrow[k] = multiplicationRow[0][k] * trianglerow[0][i];
            }
        }
        pyramidlevel[i] = levelrow;
    }
    /*console.log(levelrow);
    console.log("Pyramid level: ");
    console.log(pyramidlevel);
*/
    // Now for every row of pascal triangle, up to the level, we multiply each number by the trianglerow which gives us the pyramid. In theory.
    return pyramidlevel;

}