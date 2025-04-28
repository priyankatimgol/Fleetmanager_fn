export const getItemsTempCreated = (count, offset = 0) => {
  const Unique = new Date().getTime();
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${Unique}`,
    content: `item ${k + offset}`,
  }));
};

export const getItemsCreated = (data = []) => {
  const Unique = new Date().getTime();
  const sequence = data;
  //const sequence = data?.sort((a, b) => a.sequence - b.sequence)
  return sequence.map((k) => ({
    id: `item-${k.id}-${Unique}`,
    content: k,
  }));
};

export const handleReorderItems = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const handleMoveToAnotherList = (
  source,
  destination,
  droppableSource,
  droppableDestination
) => {
  const sourceClone = source;
  const destClone = destination;
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};
