function deleteProd(id) {
  let result = confirm("Do you really want to delete this - ");
  if (result === true) {
    fetch("/delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      if (res) {
        location.reload();
      }
    });
  } else {
    return;
  }
}
