export default function setHistory(item) {
  const history = localStorage.getItem("history");
  if (item) {
    if (history === null)
      localStorage.setItem(
        "history",
        JSON.stringify([{ id: crypto.randomUUID(), name: item }])
      );
    else
      localStorage.setItem(
        "history",
        JSON.stringify([
          { id: crypto.randomUUID(), name: item },
          ...JSON.parse(history),
        ])
      );
  }
}

function getHistory() {
  return JSON.parse(localStorage.getItem("history"));
}

function deleteHistoryById(id) {
  const history = getHistory();
  const afterDelete = history.filter((item) => item.id !== id);
  localStorage.setItem("history", JSON.stringify(afterDelete));
  return afterDelete;
}

export { deleteHistoryById, getHistory };
