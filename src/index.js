const n=9;
module.exports = function solveSudoku(matrix) {
  var matrix = [
      [6, 5, 0, 7, 3, 0, 0, 8, 0],
      [0, 0, 0, 4, 8, 0, 5, 3, 0],
      [8, 4, 0, 9, 2, 5, 0, 0, 0],
      [0, 9, 0, 8, 0, 0, 0, 0, 0],
      [5, 3, 0, 2, 0, 9, 6, 0, 0],
      [0, 0, 6, 0, 0, 0, 8, 0, 0],
      [0, 0, 9, 0, 0, 0, 0, 0, 6],
      [0, 0, 7, 0, 0, 0, 0, 5, 0],
      [1, 6, 5, 3, 9, 0, 4, 7, 0]
    ];
      var res=matrix, vars1=[], vars2=[], vars3=[];
      const numbers=[1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let repeat=0; repeat<n*n*n; repeat++) {
      for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
          if (res[i][j]==0){
            vars1=diff(numbers, res[i]);
            vars2=diff(vars1, getcolumn(res,j));
            vars3=diff(vars2, getsquare(res,i,j));
            if (vars3.length==1) {
              res[i][j]=vars3[0];
            }
          }
        }
      }
      }
 // console.log(res);
  return res;
}

function diff(arr1, arr2) {
  let difres=[];
  for (let i=0; i < arr1.length; i++) {
    let j=0;
    while ((j < arr2.length) && (arr1[i]!=arr2[j])) {
      j++;
    }
    if (j==arr2.length) {
      difres.push(arr1[i]);
    }
  }
  return difres;
} 

function getcolumn(matrix, j) {
  let column=[];
  let len=matrix[0].length;
  for (let i=0; i<len; i++) {
    column[i]=matrix[i][j];
  }
  return column;
}

function getsquare(matrix,si,sj) {
  let n=3, square=[];
  let sqi=n*Math.floor(si/n);
  let sqj=n*Math.floor(sj/n);
  for (let i=sqi; i<(sqi+n); i++) {
    for (let j=sqj; j<(sqj+n); j++) {
      square.push(matrix[i][j]);
    }
  }
  return square;
}