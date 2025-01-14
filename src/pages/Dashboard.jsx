import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalAddUser from "../components/ModalAddUser";
import ModalAddProduct from "../components/ModalAddProduct";

const adminTab = ["Users", "Products", "Order History"];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("Users");
  const [userList, setUserList] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalAddProduct, setModalAddProduct] = useState(false);

  const fetchData = async () => {
    try {
      const getResponse = await axios.get(
        `https://json-server-production-d0c3.up.railway.app/user/${localStorage.getItem(
          "id"
        )}`
      );
      const userObj = getResponse.data;
      if (userObj.role === "Admin") {
        fetchDataUser();
        fetchDataProduct();
        fetchDataOrder();
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataUser = async () => {
    try {
      const getResponse = await axios.get(
        "https://json-server-production-d0c3.up.railway.app/user"
      );
      const userObj = getResponse.data;
      setUserList(userObj);
    } catch (error) {
      setError(error);
    }
  };

  const fetchDataProduct = async () => {
    try {
      const getResponse = await axios.get(
        "https://json-server-production-d0c3.up.railway.app/products"
      );
      const productObj = getResponse.data;
      setProducts(productObj);
    } catch (error) {
      setError(error);
    }
  };

  const fetchDataOrder = async () => {
    try {
      const getResponse = await axios.get(
        "https://json-server-production-d0c3.up.railway.app/orders"
      );
      const orderObj = getResponse.data;
      setOrderHistory(orderObj);
    } catch (error) {
      setError(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(
        `https://json-server-production-d0c3.up.railway.app/user/${id}`,
        {
          method: "DELETE",
        }
      );
      setUserList((prevUserList) =>
        prevUserList.filter((user) => user.id !== id)
      );
    } catch (error) {
      setError("Error deleting user, please try again!");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(
        `https://json-server-production-d0c3.up.railway.app/products/${id}`,
        {
          method: "DELETE",
        }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      setError("Error deleting product, please try again!");
    }
  };

  const changeRoleUser = async (id, e) => {
    try {
      const userToUpdate = userList.find((user) => user.id === id);

      if (!userToUpdate) {
        setError("User not found");
        return;
      }

      const updatedUser = { ...userToUpdate, role: e.target.value };

      setUserList((prevUserList) =>
        prevUserList.map((user) =>
          user.id === id ? { ...user, role: e.target.value } : user
        )
      );

      const response = await fetch(
        `https://json-server-production-d0c3.up.railway.app/user/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
    } catch (error) {
      setError("Error updating user role");
    }
  };

  const changeProductStock = async (id, e) => {
    try {
      const productToUpdate = products.find((product) => product.id === id);

      if (!productToUpdate) {
        setError("Product not found");
        return;
      }

      const updatedProduct = { ...productToUpdate, isInStock: e.target.value };

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? { ...product, isInStock: e.target.value }
            : product
        )
      );

      const response = await fetch(
        `https://json-server-production-d0c3.up.railway.app/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
    } catch (error) {
      setError("Error updating product stock");
    }
  };

  const changeOrderStatus = async (id, e) => {
    try {
      const orderToUpdate = orderHistory.find((order) => order.id === id);

      if (!orderToUpdate) {
        setError("Order not found");
        return;
      }

      const updatedOrder = { ...orderToUpdate, orderStatus: e.target.value };

      setOrderHistory((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, orderStatus: e.target.value } : order
        )
      );

      const response = await fetch(
        `https://json-server-production-d0c3.up.railway.app/orders/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        }
      );
    } catch (error) {
      setError("Error updating Order Status");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // if (userList.length === 0) {
  //   return <div className="h-screen"></div>;
  // }

  return (
    <>
      <div className="w-full flex-col justify-center items-center mb-20">
        <p>{error}</p>
        <h2 className="text-3xl font-bold text-center mt-10">Admin Panel</h2>
        <div className="w-full flex justify-center mt-8">
          <div className="w-fit flex bg-stone-200 py-3 px-1 rounded-lg">
            {adminTab.map((tab) => (
              <div key={tab}>
                <input
                  id={tab}
                  name={tab}
                  type="radio"
                  checked={selectedTab === tab}
                  className="absolute appearance-none"
                  onChange={() => setSelectedTab(tab)}
                />
                <label
                  htmlFor={tab}
                  className={`py-2 px-8 cursor-pointer rounded-md ${
                    tab === selectedTab && "bg-stone-600 text-white"
                  }`}
                >
                  {tab}
                </label>
              </div>
            ))}
          </div>
        </div>
        {selectedTab === "Users" && (
          <div className="flex flex-col items-center justify-center w-full mt-20">
            <div className="w-1/2 flex justify-between">
              <h3 className="text-xl font-semibold">User List</h3>
              <button
                onClick={() => setModalAddUser(true)}
                className="bg-green-600 py-2 px-8 text-white rounded-md hover:bg-green-800"
              >
                Add User
              </button>
            </div>
            <table className="w-2/3 table-auto mt-8">
              <thead>
                <tr className="border-b font-bold bg-white">
                  <td className="text-center px-4 py-3">#</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Address</td>
                  <td>Role</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {userList.length > 0 &&
                  userList.map((user, index) => (
                    <tr key={index} className="even:bg-gray-50 odd:bg-white">
                      <td className="text-center py-3">{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.adress}</td>
                      <td>
                        <select
                          name={user.name}
                          id={user.name}
                          value={user.role}
                          onChange={(e) => {
                            changeRoleUser(user.id, e);
                          }}
                          className="border py-1 px-6 rounded-sm"
                        >
                          <option value="Member">Member</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            deleteUser(user.id);
                          }}
                          className="text-white bg-red-500 px-6 py-1 rounded-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedTab === "Products" && (
          <div className="flex flex-col items-center justify-center w-full mt-20">
            <div className="w-1/2 flex justify-between">
              <h3 className="text-xl font-semibold">Products</h3>
              <button
                onClick={() => setModalAddProduct(true)}
                className="bg-green-600 py-2 px-8 text-white rounded-md hover:bg-green-800"
              >
                New Product
              </button>
            </div>
            <table className="w-2/3 table-auto mt-8">
              <thead className="text-center">
                <tr className="border-b font-bold bg-white">
                  <td className="text-center px-4 py-3">#</td>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Price</td>
                  <td>Jumlah Stock</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody className="text-center">
                {products.length > 0 &&
                  products.map((product, index) => (
                    <tr key={index} className="even:bg-gray-50 odd:bg-white">
                      <td className="text-center py-3">{index + 1}</td>
                      <td className="flex justify-center">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-32 h-32 object-cover"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>Rp {product.price.current.value.toLocaleString()}</td>
                      <td>
                        <input className="border rounded-lg px-3 py-3 mt-1 mb-5 text-sm w-fit bg-white" type="number" value={product.isInStock} onChange={(e) => {
                            changeProductStock(product.id, e);
                          }} />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            deleteProduct(product.id);
                          }}
                          className="text-white bg-red-500 px-6 py-1 rounded-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedTab === "Order History" && (
          <div className="flex flex-col items-center justify-center w-full mt-20">
            <h3 className="text-xl font-semibold">Order History</h3>
            <table className="w-2/3 table-auto mt-8">
              <thead>
                <tr className="border-b font-bold bg-white">
                  <td className="text-center px-4 py-3">#</td>
                  <td>User ID</td>
                  <td>Status</td>
                  <td>Item</td>
                  <td>Subtotal</td>
                </tr>
              </thead>
              <tbody>
                {orderHistory.length > 0 &&
                  orderHistory.map((order, index) => (
                    <tr key={index} className="even:bg-gray-50 odd:bg-white">
                      <td className="text-center py-3">{index + 1}</td>
                      <td>{order.userId}</td>
                      <td>
                        <select
                          name={order.id}
                          id={order.id}
                          value={order.orderStatus}
                          onChange={(e) => {
                            changeOrderStatus(order.id, e);
                          }}
                          className="border py-1 px-6 rounded-sm"
                        >
                          <option value="Cancelled">Cancelled</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td>{order.cartItems[0].title}</td>
                      <td>Rp {order.subtotal.toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modalAddUser && (
        <ModalAddUser
          onClose={() => {
            setModalAddUser(false);
          }}
          setUserList={setUserList}
          setModalAddUser={setModalAddUser}
        />
      )}
      {modalAddProduct && (
        <ModalAddProduct
          onClose={() => {
            setModalAddProduct(false);
          }}
          setProducts={setProducts}
          setModalAddProduct={setModalAddProduct}
        />
      )}
    </>
  );
}
