//get list of alcohol class in dataSet
export function findClasses(dataSet) {
  const classes = [];
  dataSet.forEach((ele) => {
    if (!classes.includes(ele.Alcohol)) classes.push(ele.Alcohol);
  });
  return classes;
}

//get dataSet with add calculated gamma property
export function calculateGamma(data) {
  let temp = data.map((ele) => {
    return {
      ...ele,
      Gamma: Number.parseFloat((ele.Ash * ele.Hue) / ele.Magnesium).toFixed(2),
    };
  });
  return temp;
}

//getMean of given dataSet of given property
export function getMean(dataSet, res = {}, property = "Flavanoids") {
  //filter dataSet classwise
  let temp = dataSet.reduce((acc, ele) => {
    return (acc = {
      mean: {
        ...acc?.mean,
        [ele.Alcohol]: {
          sum:
            (acc?.mean?.[ele.Alcohol]?.sum
              ? acc?.mean?.[ele.Alcohol]?.sum
              : 0) + Number.parseFloat(ele[property]),
          c: (acc?.mean?.[ele.Alcohol]?.c ? acc?.mean?.[ele.Alcohol].c : 0) + 1,
        },
      },
    });
  }, {});

  //final mean operation
  for (let x in temp.mean) {
    temp.mean[x] = (temp.mean[x].sum / temp.mean[x].c).toFixed(3);
  }

  return temp;
}

//sort he dataSet by provided peoperty
export function getSortedAsc(dataSet, sortProperty) {
  let temp = dataSet;

  return temp.sort((a, b) => {
    return a[sortProperty] - b[sortProperty];
  });
}

//getMedian of given dataSet of given property
export function getMedian(dataSet, res = {}, property = "Flavanoids") {
  //filtering dataSet classwise
  let temp = getSortedAsc(dataSet, property).reduce((acc, ele) => {
    return (acc = {
      ...acc,
      [ele.Alcohol]: [
        ...(acc[ele.Alcohol] ? acc[ele.Alcohol] : []),
        Number.parseFloat(ele?.[property]),
      ],
    });
  }, {});

  //final median operation
  for (let x in temp) {
    let mid = Math.trunc(temp[x].length / 2);
    mid = mid === 0 ? 1 : mid;

    let y;
    if (temp[x].length % 2 === 0) {
      y = ((temp[x][mid - 1] + temp[x][mid]) / 2).toFixed(3);
    } else {
      y = temp[x][mid];
    }

    temp[x] = y;
  }
  return temp;
}

//getMode of given dataSet of given property
export function getMode(dataSet, res = {}, property = "Flavanoids") {
  let classes = findClasses(dataSet);
  let temp1 = {};
  let temp2 = {};
  let final = {};

  for (let i = 0; i < classes.length; ++i) {
    temp1 = dataSet.reduce((acc, ele) => {
      if (classes[i] === ele.Alcohol)
        acc = {
          ...acc,
          [ele[property]]: (acc[ele[property]] ? acc[ele[property]] : 0) + 1,
        };

      return acc;
    }, {});
    temp2 = { ...temp2, [classes[i]]: temp1 };
  }

  for (let x in temp2) {
    let max = 0;
    for (let y in temp2[x]) {
      if (temp2[x][y] > max) {
        final[x] = [];
        final[x] = [y];
        max = temp2[x][y];
      } else if (temp2[x][y] === max) {
        final[x] = [...(final[x] ? final[x] : []), y];
      }
    }
  }

  return final;
}
