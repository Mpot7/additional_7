const n=9;
const ni=3;
var roots=[];
var c=0, il=0, jl=0, solved, r=[];

module.exports = function solveSudoku(matrix) {
 
/* { var matrix = [
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
*/
  var res=matrix;
  var hidden=[];
  res=solve(res);
  console.log (res);
  var pi=0;
  while ((!solved)&(pi<n)) {
   // console.log("i am here2 pi=",pi);
    hidden=unique(getrootsrow(pi));
    if (hidden.length==1){
        for (j=0; j<n; j++) {
          for (z=0; z<n; z++) {
            if (roots[pi][j][z]==hidden[0]) {
             // console.log("yaystr!",pi," ",j);
             // console.log("hidden",hidden);
             // console.log("getrootsrow",getrootsrow(pi),"1root=",roots[pi][j]);
              res[pi][j]=hidden[0];

            }
          }
        }
      }
///////*
 
///////
    res=solve(res);
    pi++;
  //  console.log("pi=",pi);
  }
 /* console.log ("po strokam");
  console.log (res);

  console.log("roots of 0 stolb");
  console.log(getrootscol(0));
  console.log(unique(getrootscol(0)));*/
  pi=0;
  while ((!solved)&(pi<n)) {
  //  console.log("i am here3");
    hidden=unique(getrootscol(pi));
    console.log(hidden);
    console.log(getrootscol(pi),"col=",pi);
    if (hidden.length==1){
        for (j=0; j<n; j++) {
          for (z=0; z<n; z++) {
            if (roots[j][pi][z]==hidden[0])
              res[j][pi]=hidden[0];
          }
        }
      }
    res=solve(res);
    pi++;
  }
  console.log ("po stolb");
  console.log (res);
  pi=1;
  var pj;
  while ((!solved)&(pi<ni+1)) {
    for (pj=1; pj<ni+1; pj++) {
      hidden=unique(getrootsquare(pi, pj));
 //     console.log("sqh", pi,pj,hidden);
  //    console.log("sq", pi,pj,getrootsquare(pi, pj));
      if (hidden.length==1){
          for (i=ni*pi-ni; i<(ni*pi); i++) {
            for (j=ni*pj-ni; j<(ni*pj); j++) {
              for (let c=0; c<n; c++) {
                if (roots[pi][pj][c]==hidden[0])
                  res[pi][pj]=hidden[0];
              }
            }
          }
      }
    }
    res=solve(res);
    pi++;
  }

  console.log ("po kv");
console.log (res);
return res;


}


    function solve(matrix) {
      var vars1=[], vars2=[], vars3=[];
      const numbers=[1, 2, 3, 4, 5, 6, 7, 8, 9];
      var changed;
      res=matrix;
      solved=1;
      changed=1;
      for (let i=0; i<n; i++) {
        roots[i]= new Array;
        for (let j=0; j<n; j++) {
          roots[i][j]= new Array;
        }
      }
  //    console.log("i am here1");
      while (changed==1) {
   //     console.log("changed1=");
   //     console.log(changed);
        changed=0;
    //    console.log("i am here");
        for (let i=0; i<n; i++) {
          for (let j=0; j<n; j++) {
          // console.log ("res[",i,j,"]",res[i][j]);
            if (res[i][j]==0){
              vars1=diff(numbers, res[i]);
              vars2=diff(vars1, getcolumn(res,j));
              vars3=diff(vars2, getsquare(res,i,j));
             // console.log("var",i,j,vars3);
              if (vars3.length==1) {
                res[i][j]=vars3[0];
                changed=1;
              }
              else {
                roots[i][j]=vars3;
             //   console.log("rrr",i,j,roots[i][j]);
               /*  for (k=0; k<vars3.length; k++) {
                  roots[i][j][k]=vars3[k];
                 }*/
                solved=0;
              }
            }
          }
        }
  //      console.log("changed=");
  //      console.log(changed);
      } 
   //   for (let j=0; j<n; j++){
   //   console.log ("roots[0][",j,"]=", roots[0][j]); 
   //   }
      return res;
    }

function getrootsrow (row) {
 /* var copyarr=[];
  for (let i=0; i<n; i++) {
    copyarr[i]= new Array;
    for (let j=0; j<n; j++) {
      copyarr[i][j]= new Array;
    }
  }
*/
  //copyarr=arr;
  let rootsrow=[];
  for (let j=0; j<n; j++) {
  //  console.log("roots[",row,j,"]=",roots[row] );
    if (roots[row][j].length!=0) {
     // if (roots[row][j]!=[]) {
 //     for (i=0; i<arr[row][j].length; i++) {
        let i=0;
        while (roots[row][j][i]) {
        rootsrow.push(roots[row][j][i]);
        i++;
         }
       }
  }
  return rootsrow;
}  

function getrootscol (col) {
  let rootscol=[];
  for (let j=0; j<n; j++) {
    if (roots[j][col].length!=0) {

      let i=0;
        while (roots[j][col][i]) {
        rootscol.push(roots[j][col][i]);
        i++;
         }
       }
  }

/*      for (let i=0; i<roots[j][col].length; i++) {
        rootscol.push(roots[j][col][i]);
      }
    }
  } */
  return rootscol;
}  

function getrootsquare(si,sj) {
  let rootsquare=[];
  for (let i=ni*si-ni; i<(ni*si); i++) {
    for (let j=ni*sj-ni; j<(ni*sj); j++) {
      for (let z=0; z<roots[i][j].length; z++) {
        rootsquare.push(roots[i][j][z]);
      }  
    }
  }
  return rootsquare;
} 

function unique(arr) {
  let arruniq=[];
  for (let i=0; i<arr.length-1; i++) {
    let uniq=1;
    for (let j=0; j<arr.length; j++) {
      if ((arr[i]==arr[j]) &(i!=j))
        uniq=0;
    }
    if (uniq==1) 
      arruniq.push(arr[i]);
  }
  return arruniq;
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
