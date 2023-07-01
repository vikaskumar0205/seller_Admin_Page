const url =
  "https://crudcrud.com/api/ed6544bff2444c11a202ce166e41b519/demoDataCollection04";

const itemList = document.querySelectorAll(".items");
// convert nodeList to array
const chooseSection = Array.from(document.querySelectorAll(".seller>ul"));

console.log(chooseSection);
document
  .getElementById("submit-button")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    // also save into the API using AXIOS
    // find method will give the first item which satisfies this condition!!
    const chooseSectionItem = chooseSection.find(
      (section) => section.id === itemList[2].value
    );

    if (chooseSectionItem) {
      // we don't take the undefind value.
      const obj = {};
      itemList.forEach(({ name, value }) => {
        obj[name] = value;
      });

      try {
        const response = await axios.post(url, obj);
        createItems(response.data, chooseSectionItem);

        itemList[0].value = "";
        itemList[1].value = "";
        itemList[2].value = "no item";
      } catch (error) {
        console.log(error);
      }
    }

    // chooseSection.forEach((section) => {
    //   if (section.id === itemList[2].value) {
    //     //   console.log(section);
    //     const obj = {};
    //     itemList.forEach(({ name, value }) => {
    //       obj[name] = value;
    //     });
    //     const addProduct = async () => {
    //       return await axios
    //         .post(url, obj)
    //         .then((res) => {
    //           // create an item
    //           createItems(res.data);
    //           // reset the all values
    //           itemList[0].value = "";
    //           itemList[1].value = "";
    //           const categoryItem = itemList[2].querySelector(
    //             'option[value="no item"]'
    //           );
    //           // console.log(categoryItem.textContent);
    //           // categoryItem.textContent = "select an item";
    //           itemList[2].value = categoryItem;
    //         })
    //         .catch((err) => {
    //           console.log(err);
    //         });
    //     };
    //     addProduct();
    //   }
    // });
  });

function createItems(item, ulSection) {
  const li = document.createElement("li");
  li.textContent = `${item.selling_price}-${item.product_name}-${item.category}`;

  li.setAttribute("id", item._id);
  // create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "submit";
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", DeleteButtonClick);

  // create edit button
  const editBtn = document.createElement("button");
  editBtn.type = "submit";
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", EditButtonClick);

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  //   console.log(item);
  //   console.log(section.parentElement);
  ulSection.appendChild(li);
}
//   console.log(itemList);
// const chooseSection = document.querySelectorAll("ul");
// chooseSection.forEach((ul) => {
//   if (ul.id === item.category) {
//     // console.log(item);
// const li = document.createElement("li");
// li.textContent = `${item.selling_price}-${item.product_name}-${item.category}`;

// li.setAttribute("id", item._id);
// // create delete button
// const deleteBtn = document.createElement("button");
// deleteBtn.type = "submit";
// deleteBtn.textContent = "Delete";

// deleteBtn.addEventListener("click", DeleteButtonClick);

// // create edit button
// const editBtn = document.createElement("button");
// editBtn.type = "submit";
// editBtn.textContent = "Edit";

// editBtn.addEventListener("click", EditButtonClick);

// li.appendChild(deleteBtn);
// li.appendChild(editBtn);
// //   console.log(item);
// //   console.log(section.parentElement);
// ul.appendChild(li);
//   }
// });
// }

// click the delete button
async function DeleteButtonClick(e) {
  e.preventDefault();
  const ulItem = e.target.parentElement;

  const itemId = ulItem.getAttribute("id");
  ulItem.remove();
  try {
    await axios.delete(`${url}/${itemId}`);
  } catch (error) {
    console.log(error);
  }
}

async function EditButtonClick(e) {
  e.preventDefault();
  // console.log(e.target);
  const liItem = e.target.parentElement;  // li item
  const itemId = liItem.getAttribute("id");
  // const inputList = document.querySelectorAll(".items");

  liItem.remove();
  try {
    const response = await axios(`${url}/${itemId}`);
    const data = response.data;
    // resetting the value
    itemList[0].value = data.selling_price;
    itemList[1].value = data.product_name;
    itemList[2].value = data.category;

    // deleting item from API
    await axios.delete(`${url}/${response.data._id}`);
  } catch (error) {
    console.log(error);
  }

  // .then((response) => {
  //   // console.log(response.data);
  //   const data = response.data;
  //   inputList[0].value = data.selling_price;
  //   inputList[1].value = data.product_name;
  //   inputList[2].value = data.category;
  //   return data._id;
  // })
  // .then((id) => {
  //   axios.delete(`${url}/${id}`).catch((err) => console.log(err));
  // })
  // .catch((err) => console.log(err));
}

// after refreshing the page save the all datas

window.addEventListener("DOMContentLoaded", async (e) => {
  e.preventDefault();
  try {
    const response = await axios(url);
    const responseData = response.data;
    // console.log(responseData);
    responseData.forEach((data) => {
      const chooseSectionItem = chooseSection.find(
        (section) => section.id === data.category
      );
      if(chooseSectionItem) createItems(data, chooseSectionItem);
    });
    // await axios
    // .get(url)
    // .then((response) => {
    //   return response.data;
    // })
    // .then((datas) => {
    //   // console.log(datas);
    //   datas.forEach((data) => {
    //     createItems(data);
    //   });
    // })
  } catch (err) {
    console.log(err);
  }
});
