/**
 * Created by Dylan on 27/08/2015.
 */


// Generates row n of pascal's triangle using the binomial expansion equation

function generatePascalTriangleRow(row)
{
    var numbers = [1];

    var n = row;
    var k = 1;

    for(var i = 1; i < row; i++)
    {
        numbers[i] = numbers[i-1] * ((n+1-k)/k);
        k++;
    }
    numbers[numbers.length] = 1;
    console.log(numbers);
    return [numbers];
}