import dispatcher from "../dispatcher";

export function createNew() {
  dispatcher.dispatch({
    type: "CREAT_NEW"
  });
}

export function deleteAll() {
  dispatcher.dispatch({
    type: "DELETE_ALL"
  });
}
