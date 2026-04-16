const get = async function (request) {
  const response = await fetch(request);
  if (response.ok) {
    const data = await response.json();
    // console.log("get : ", request, "data : ", data);
    return data;
  }
  else {
    throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
  }
}

const getAllDepartments = async function(){

  const request = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
  const data = await get(request);

  if (data.departments) {
    return data.departments;
  }
}

const getAllObjectIDs = async function() {
  const request = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
  const data = await get(request);

  if (data.objectIDs) {
    return data.objectIDs;
  }
}

const getObjectById = async function(objectID) {
  const request = "https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectID;
  const data = await get(request);

  if (data) {
    return data;
  }
}

const splitArray = (arrayToSplit, nbItemsByArray) => {

  // the number of itemsByArray must be > 0
  if (nbItemsByArray <= 0) {
    return [];
  }

  // constructions of array of slices from begin to end
  const nbSubArrays = arrayToSplit.length/nbItemsByArray;
  const subArrays = [];
  let first = 0;
  let last = nbItemsByArray;

  for (let index = 0; index < nbSubArrays; index++) {
    const subArray = arrayToSplit.slice(first, last);
    subArrays.push(subArray);

    first = last;
    last += nbItemsByArray;
  }

  return subArrays;
}

const getObjectsInGroups = async (objectIDsArray) => {
  const splitObjectIDs = splitArray(objectIDsArray, 10);

  console.log("splitObjectIDs = ", splitObjectIDs);
  const interval = 5000;
  let allResults = [];

  for (const group of splitObjectIDs) {
    console.log(`Récupération d'un groupe de ${group.length} objets`);

    const groupPromises  = group.map((id)=> getObjectById(id));
    const results = await Promise.all(groupPromises);

    allResults.push(...results);

    if (splitObjectIDs.indexOf(group) < splitObjectIDs.length-1) {
      await new Promise(resolve => setTimeout(resolve, interval));
    }

    // console.log("results : ", results);
    // console.log("...results : ",...results);
    console.log("allResults : ", allResults);

  }

  return allResults;

}

const getAllObjectsInfo = async function (page) {
  const allObjectIDs = await getAllObjectIDs();
  // console.log("allObject IDS : ", allObjectIDs);
  const slicedObjectsIDs = splitArray(allObjectIDs, 30);


  // const objectsInfos = await getObjectsInGroups(allObjectIDs.slice(0,50));
  const objectsInfos = await getObjectsInGroups(slicedObjectsIDs[page]);
  console.log("objectsInfos : ", objectsInfos);
  return objectsInfos;
}

export {getAllDepartments, getAllObjectIDs, getObjectById, splitArray, getObjectsInGroups, getAllObjectsInfo};
